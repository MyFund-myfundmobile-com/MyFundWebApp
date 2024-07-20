import axios from "axios";
import { Dispatch } from "redux";
import {
  AuthActionTypes,
  SET_USER_TOKEN,
  SET_USER_INFO,
  SET_USER_INFO_ERROR,
  UPDATE_USER_PROFILE,
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
        console.log("User info fetched successfully:", response.data);
        dispatch({
          type: SET_USER_INFO,
          payload: response.data,
        });
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

export const updateUserProfile = (updatedProfile: any) => ({
  type: UPDATE_USER_PROFILE,
  payload: updatedProfile,
});
