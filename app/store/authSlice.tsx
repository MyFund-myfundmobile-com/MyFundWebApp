import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/app/store/store";

// Define the structure of the user profile data
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

// Define the initial state for authentication
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

// Async thunk to fetch user profile data
export const fetchUserProfile = createAsyncThunk<UserProfile, string>(
  "auth/fetchUserProfile",
  async (token: string) => {
    console.log("Token inside fetchUserProfile thunk:", token);
    try {
      const response = await axios.get<UserProfile>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user-profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched user profile data:", response.data);
      return response.data; // This will trigger the fulfilled action
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error; // This will trigger the rejected action
    }
  }
);

// Create the auth slice with initial state and reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action for successful login
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; userId: string }>
    ) {
      state.isAuthenticated = true;
      state.userToken = action.payload.token;
      state.userId = action.payload.userId;
      console.log("Token set in loginSuccess:", action.payload.token);
    },
    // Action to set user profile
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
      console.log(
        "User profile set in setUserProfile reducer:",
        action.payload
      );
    },
    // Action for logging out
    logout(state) {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userId = null;
      state.userProfile = null;
      console.log("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled case for fetchUserProfile
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      console.log("User profile set in extraReducer:", action.payload);
    });
  },
});

export const { loginSuccess, setUserProfile, logout } = authSlice.actions;
export default authSlice.reducer;
