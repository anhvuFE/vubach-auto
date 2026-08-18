import type { AuthUser } from '@vubach/shared';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clearTokens, getRefreshToken } from '@/lib/tokenStore';
import * as authApi from '@/services/auth';

type AuthStatus =
  | 'idle' // before bootstrap has run
  | 'loading' // a login or bootstrap request is in flight
  | 'authenticated'
  | 'unauthenticated';

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;
  /** True once the initial session bootstrap has settled (success or failure). */
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  initialized: false,
};

/** Log in and return the authenticated user. */
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    return authApi.login(credentials.email, credentials.password);
  },
);

/** Revoke the session server-side and clear local state. */
export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
});

/**
 * Restore a session on app start: if a refresh token is present, load the
 * current user (the axios interceptor mints a fresh access token as needed).
 */
export const bootstrapAuth = createAsyncThunk(
  'auth/bootstrap',
  async (_, { rejectWithValue }) => {
    if (!getRefreshToken()) return rejectWithValue('no-token');
    try {
      return await authApi.fetchMe();
    } catch {
      clearTokens();
      return rejectWithValue('invalid');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'authenticated';
      })
      .addCase(loginThunk.rejected, (state) => {
        state.user = null;
        state.status = 'unauthenticated';
      })
      .addCase(bootstrapAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'authenticated';
        state.initialized = true;
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.user = null;
        state.status = 'unauthenticated';
        state.initialized = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.status = 'unauthenticated';
      });
  },
});

export default authSlice.reducer;
