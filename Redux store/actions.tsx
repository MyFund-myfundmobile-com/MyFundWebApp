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
  SET_USER_TRANSACTIONS,
  SET_TOP_SAVERS_DATA,
  SET_AUTO_SAVE_SETTINGS,
  SET_AUTO_SAVE_OFF,
  SET_AUTO_INVEST_SETTINGS,
  SET_AUTO_INVEST_OFF,
  AutoInvestSettings
  AutoSaveSettings,
  TopSaversData,
  UserTransaction,
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
  return async (dispatch: Dispatch<AuthActionTypes>, getState: any) => {
    const userInfo = getState().auth.userInfo;

    // Check if userInfo is defined and contains the token property
    if (!userInfo || !userInfo.token) {
      console.error("Authentication Error: User is not authenticated.");
      return;
    }

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

        console.log("Fetched Profile Data:", profileData);
        console.log("Profile ID:", profileData.id);

        const topSaverPercentage = profileData.top_saver_percentage * 100; // Convert to percentage if applicable

        dispatch({
          type: SET_USER_INFO,
          payload: {
            ...profileData,
            id: profileData.id,
            profileImageUrl: profileData.profile_picture
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${profileData.profile_picture}`
              : null,
            top_saver_percentage: topSaverPercentage, // Ensure this transformation is consistent if needed
          },
        });

        // Dispatch other actions as needed
        dispatch(fetchAccountBalances(token) as any);
        // Add more actions if necessary, like in the mobile app
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

export const fetchUserTransactions = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await axios.get<UserTransaction[]>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-transactions/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: SET_USER_TRANSACTIONS,
          payload: response.data,
        });
      } else {
        console.error(
          "Failed to fetch user transactions, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching user transactions:", error);
    }
  };
};

export const fetchTopSaversData = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const response = await axios.get<TopSaversData>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top-savers/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: SET_TOP_SAVERS_DATA,
          payload: response.data,
        });
      }
    } catch (error) {
      console.error("Fetch Top Savers Data Error:", error);
    }
  };
};

export const fetchAutoSaveSettings = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    if (!token) {
      console.error("Authentication Error: User is not authenticated.");
      return;
    }

    try {
      const response = await axios.get<{ autoSaveSettings: AutoSaveSettings }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-autosave-settings/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const { autoSaveSettings } = response.data;
        // Dispatch the autoSaveSettings directly without nesting
        dispatch(updateAutoSaveSettings(autoSaveSettings));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
};

export const updateAutoSaveSettings = (
  autoSaveSettings: AutoSaveSettings
): AuthActionTypes => {
  return {
    type: SET_AUTO_SAVE_SETTINGS,
    payload: autoSaveSettings, // Directly store the flat object
  };
};

export const setAutoSaveOff = (): AuthActionTypes => ({
  type: SET_AUTO_SAVE_OFF,
});

export const fetchAutoInvestSettings = (token: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    if (!token) {
      console.error("Authentication Error: User is not authenticated.");
      return;
    }

    try {
      const response = await axios.get<{ autoInvestSettings: AutoInvestSettings }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-autoinvest-settings/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const { autoInvestSettings } = response.data;
        // Dispatch the autoSaveSettings directly without nesting
        dispatch(updateAutoInvestSettings(autoInvestSettings));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
};

export const updateAutoInvestSettings = (
  autoInvestSettings: AutoInvestSettings
): AuthActionTypes => {
  return {
    type: SET_AUTO_INVEST_SETTINGS,
    payload: autoInvestSettings, // Directly store the flat object
  };
};

export const setAutoInvestOff = (): AuthActionTypes => ({
  type: SET_AUTO_INVEST_OFF,
});

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
