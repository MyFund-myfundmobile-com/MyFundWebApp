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
  bankRecords: any[];
  cards: any[];
  top_saver_percentage: number;
  profile_picture?: string;
}

export interface AuthState {
  token: string | null;
  userInfo: User;
  accountBalances: {
    savings: number;
    investment: number;
    properties: number;
    wallet: number;
  };
  error: string | null;
  currentWealthStage: WealthStage; 
}

export interface WealthStage {
  stage: number;
  text: string;
  description: string;
}

// Action types
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_INFO_ERROR = "SET_USER_INFO_ERROR";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_SAVINGS_GOAL = "UPDATE_SAVINGS_GOAL";
export const UPDATE_ACCOUNT_BALANCES = "UPDATE_ACCOUNT_BALANCES";
export const UPDATE_WEALTH_STAGE = "UPDATE_WEALTH_STAGE";

interface SetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  payload: string;
}

interface UpdateWealthStageAction {
  type: typeof UPDATE_WEALTH_STAGE;
  payload: WealthStage;
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

interface UpdateAccountBalancesAction {
  type: typeof UPDATE_ACCOUNT_BALANCES;
  payload: {
    savings: number;
    investment: number;
    properties: number;
    wallet: number;
  };
}

export type AuthActionTypes =
  | SetUserTokenAction
  | SetUserInfoAction
  | SetUserInfoErrorAction
  | UpdateUserProfileAction
  | UpdateSavingsGoalAction
  | UpdateAccountBalancesAction
  | UpdateWealthStageAction;
