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

// Action types
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_INFO_ERROR = "SET_USER_INFO_ERROR";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_SAVINGS_GOAL = "UPDATE_SAVINGS_GOAL"; // Add this line

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

export interface UpdateUserProfileAction {
  type: typeof UPDATE_USER_PROFILE;
  payload: Partial<User>;
}

interface UpdateSavingsGoalAction {
  type: typeof UPDATE_SAVINGS_GOAL;
  payload: Partial<User>;
}

export type AuthActionTypes =
  | SetUserTokenAction
  | SetUserInfoAction
  | SetUserInfoErrorAction
  | UpdateUserProfileAction
  | UpdateSavingsGoalAction;
