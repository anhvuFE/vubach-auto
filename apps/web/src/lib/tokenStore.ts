/**
 * Single source of truth for auth tokens, kept outside React so the axios
 * interceptor can read them synchronously.
 *
 * - Access token lives in memory only: it is short-lived and re-minted from the
 *   refresh token on demand, so losing it on reload is harmless.
 * - Refresh token is persisted to localStorage so a session survives a reload.
 */

const REFRESH_KEY = 'vba:refresh-token';

let accessToken: string | null = null;

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
};

export const setRefreshToken = (token: string | null): void => {
  if (typeof window === 'undefined') return;
  try {
    if (token) window.localStorage.setItem(REFRESH_KEY, token);
    else window.localStorage.removeItem(REFRESH_KEY);
  } catch {
    /* storage unavailable (private mode / quota) — ignore */
  }
};

/** Store a fresh access/refresh pair after login, register, or refresh. */
export const setTokens = (access: string, refresh: string): void => {
  setAccessToken(access);
  setRefreshToken(refresh);
};

/** Wipe both tokens on logout or an unrecoverable auth failure. */
export const clearTokens = (): void => {
  setAccessToken(null);
  setRefreshToken(null);
};
