import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserProfile {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  profile_picture?: string;
  preferred_asset: string;
  savings_goal_amount: number;
  time_period: number;
}

interface AuthState {
  isAuthenticated: boolean;
  userToken: string | null;
  userId: string | null;
  userProfile: UserProfile | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userToken: null,
  userId: null,
  userProfile: null,
};

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token: string, { dispatch }) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user-profile/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setUserProfile(response.data));
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; userId: string }>
    ) {
      state.isAuthenticated = true;
      state.userToken = action.payload.token;
      state.userId = action.payload.userId;
    },
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userId = null;
      state.userProfile = null;
    },
  },
});

export const { loginSuccess, setUserProfile, logout } = authSlice.actions;
export default authSlice.reducer;
