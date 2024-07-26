import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./store"; // Adjust the import path as needed
import {
  AuthActionTypes,
  SET_USER_TOKEN,
  SET_USER_INFO,
  SET_USER_INFO_ERROR,
  UPDATE_USER_PROFILE,
  UPDATE_SAVINGS_GOAL,
  UPDATE_ACCOUNT_BALANCES,
  UPDATE_WEALTH_STAGE, // Add this
  WealthStage,
  SET_BANK_ACCOUNTS,
  ADD_BANK_ACCOUNT,
  DELETE_BANK_ACCOUNT,
  BankAccount,
  SET_KYC_STATUS,
  GET_CARDS,
  DELETE_CARD,
  KYCStatus,
  Card,
  User,
} from "./types";

export const setUserToken = (token: string): AuthActionTypes => {
  return {
    type: SET_USER_TOKEN,
    payload: token,
  };
};

export const addBankAccount = (bankAccount: BankAccount): AuthActionTypes => ({
  type: ADD_BANK_ACCOUNT,
  payload: bankAccount,
});

export const fetchUserInfo = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
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

export const fetchUserBankAccounts = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await axios.get<BankAccount[]>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bank-accounts/get-bank-accounts/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: SET_BANK_ACCOUNTS,
          payload: response.data,
        });
      } else {
        console.error(
          "Failed to fetch bank accounts, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
    }
  };
};

export const deleteBankAccount = (accountNumber: string) => {
  return async (
    dispatch: Dispatch<AuthActionTypes>,
    getState: () => RootState
  ) => {
    const token = getState().auth.token;

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete-bank-account/${accountNumber}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        dispatch({
          type: DELETE_BANK_ACCOUNT,
          payload: accountNumber,
        });
      } else {
        console.error(
          "Failed to delete bank account, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting bank account:", error);
    }
  };
};

export const addCard = (card: Card) => ({
  type: "ADD_CARD",
  payload: card,
});

export const getCards = (token: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-cards/`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use token here
        },
      }
    );

    if (response.status === 200) {
      dispatch({
        type: GET_CARDS,
        payload: response.data,
      });
    } else {
      console.error("Failed to fetch cards, status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
};

export const deleteCard =
  (cardId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    const token = getState().auth.token; // Get token from state
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cards/${cardId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token here
          },
        }
      );
      dispatch({
        type: DELETE_CARD,
        payload: cardId,
      });
    } catch (error) {
      console.error("Failed to delete card", error);
    }
  };

export const setKYCStatus = (kycStatus: KYCStatus): AuthActionTypes => ({
  type: SET_KYC_STATUS,
  payload: kycStatus,
});

export const fetchKYCStatus = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await axios.get<KYCStatus>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-kyc-status/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setKYCStatus(response.data));
      } else {
        console.error("Failed to fetch KYC status, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching KYC status:", error);
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

export const updateWealthStage = (
  wealthStage: WealthStage
): AuthActionTypes => ({
  type: UPDATE_WEALTH_STAGE,
  payload: wealthStage,
});
