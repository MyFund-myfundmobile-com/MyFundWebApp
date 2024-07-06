import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userToken: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userToken: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; userId: string }>) {
      state.isAuthenticated = true;
      state.userToken = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userId = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
