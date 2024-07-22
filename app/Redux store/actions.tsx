import axios from "axios";
import { Dispatch } from "redux";
import {
  AuthActionTypes,
  SET_USER_TOKEN,
  SET_USER_INFO,
  SET_USER_INFO_ERROR,
  UPDATE_USER_PROFILE,
  UPDATE_SAVINGS_GOAL,
  UPDATE_ACCOUNT_BALANCES,
  User,
} from "./types";

export const setUserToken = (token: string): AuthActionTypes => {
  console.log("Action: SET_USER_TOKEN", token);
  return {
    type: SET_USER_TOKEN,
    payload: token,
  };
};

export const fetchUserInfo = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    console.log("Fetching user info with token:", token);
    try {
      const response = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user-profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const profileData = response.data;
        console.log("User info fetched successfully:", profileData);

        dispatch({
          type: SET_USER_INFO,
          payload: {
            ...profileData,
            id: profileData.id,
            profileImageUrl: profileData.profile_picture
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${profileData.profile_picture}`
              : null,
          },
        });

        // Fetch account balances after user info is fetched
        dispatch(fetchAccountBalances(token) as any); // Type assertion to any to avoid type error
      } else {
        console.error("Failed to fetch user info, status:", response.status);
        dispatch({
          type: SET_USER_INFO_ERROR,
          payload: "Failed to fetch user info",
        });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      dispatch({
        type: SET_USER_INFO_ERROR,
        payload: "Failed to fetch user info",
      });
    }
  };
};

// Action to fetch account balances
export const fetchAccountBalances = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-account-balances/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: UPDATE_ACCOUNT_BALANCES,
          payload: response.data,
        });
      } else {
        console.error(
          "Failed to fetch account balances, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching account balances:", error);
    }
  };
};

export const updateUserProfile = (updatedProfile: any) => ({
  type: UPDATE_USER_PROFILE,
  payload: updatedProfile,
});

export const updateSavingsGoal = (updatedGoal: {
  preferred_asset?: string;
  savings_goal_amount?: string;
  time_period?: string;
}): AuthActionTypes => ({
  type: UPDATE_SAVINGS_GOAL,
  payload: updatedGoal,
});
