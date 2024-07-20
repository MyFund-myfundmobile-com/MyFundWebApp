export interface User {
  is_first_time_signup?: boolean;
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  token: string;
  referralValue: string;
  preferred_asset: string;
  savings_goal_amount: string;
  time_period: string;
  bankRecords: any[]; // Adjust type as needed
  cards: any[]; // Adjust type as needed
  top_saver_percentage: number;
  profile_picture?: string; // Add this line
}

export interface AuthState {
  token: string | null;
  userInfo: User;
  error: string | null;
}

// Actions types
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_INFO_ERROR = "SET_USER_INFO_ERROR";

interface SetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  payload: string;
}

interface SetUserInfoAction {
  type: typeof SET_USER_INFO;
  payload: User;
}

interface SetUserInfoErrorAction {
  type: typeof SET_USER_INFO_ERROR;
  payload: string;
}

export type AuthActionTypes =
  | SetUserTokenAction
  | SetUserInfoAction
  | SetUserInfoErrorAction;
