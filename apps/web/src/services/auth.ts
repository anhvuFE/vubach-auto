import type { ApiResponse, AuthResponse, AuthUser } from '@vubach/shared';

import { api } from '@/lib/api';
import { clearTokens, getRefreshToken, setTokens } from '@/lib/tokenStore';

/** Log in with email/password; persists the returned token pair on success. */
export const login = async (
  email: string,
  password: string,
): Promise<AuthUser> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', {
    email,
    password,
  });
  setTokens(data.data.accessToken, data.data.refreshToken);
  return data.data.user;
};

/** Register a new account; persists the returned token pair on success. */
export const register = async (
  email: string,
  password: string,
  name: string,
): Promise<AuthUser> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', {
    email,
    password,
    name,
  });
  setTokens(data.data.accessToken, data.data.refreshToken);
  return data.data.user;
};

/** Fetch the currently authenticated user (drives session bootstrap). */
export const fetchMe = async (): Promise<AuthUser> => {
  const { data } = await api.get<ApiResponse<AuthUser>>('/auth/me');
  return data.data;
};

/** Revoke the refresh token server-side and clear local tokens. */
export const logout = async (): Promise<void> => {
  const refreshToken = getRefreshToken();
  try {
    if (refreshToken) await api.post('/auth/logout', { refreshToken });
  } finally {
    clearTokens();
  }
};
