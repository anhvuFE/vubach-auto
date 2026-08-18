import type { ApiResponse, AuthResponse } from '@vubach/shared';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from './tokenStore';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

/** Shared axios instance for the NestJS API. */
export const api = axios.create({ baseURL: BASE_URL });

// Endpoints that must never trigger the refresh-and-retry flow (they either
// mint tokens themselves or a 401 from them is a genuine credential failure).
const NO_REFRESH_PATHS = ['/auth/login', '/auth/register', '/auth/refresh'];

// Attach the current access token to every outgoing request.
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Single-flight guard so N concurrent 401s trigger only one refresh call.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');

  // Bare axios (not `api`) so this call skips the interceptors and can't recurse.
  const { data } = await axios.post<ApiResponse<AuthResponse>>(
    `${BASE_URL}/auth/refresh`,
    { refreshToken },
  );
  setTokens(data.data.accessToken, data.data.refreshToken);
  return data.data.accessToken;
};

// On a 401, transparently refresh the access token once and replay the request.
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const skipRefresh = NO_REFRESH_PATHS.some((p) => original?.url?.includes(p));

    if (error.response?.status === 401 && original && !original._retry && !skipRefresh) {
      original._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }
        const newToken = await refreshPromise;
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshError) {
        // Refresh failed → the session is dead; drop tokens so the UI logs out.
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
