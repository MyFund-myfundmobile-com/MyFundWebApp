"use client";
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
  async (token: string) => {
    console.log("token inside authSlice......:", token);
    try {
      const response = await axios.get<UserProfile>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user-profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User profile response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
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
      console.log("Token set in loginSuccess:", action.payload.token);
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
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      console.log("User profile set in extraReducer:", action.payload);
    });
  },
});

export const { loginSuccess, setUserProfile, logout } = authSlice.actions;
export default authSlice.reducer;
