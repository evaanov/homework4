import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@entities/user/types';
import { api } from '@features/auth/api/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
      }
    );
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;