// Action types
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_INFO_ERROR = "SET_USER_INFO_ERROR";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_SAVINGS_GOAL = "UPDATE_SAVINGS_GOAL";
export const UPDATE_ACCOUNT_BALANCES = "UPDATE_ACCOUNT_BALANCES";
export const UPDATE_WEALTH_STAGE = "UPDATE_WEALTH_STAGE";
export const ADD_BANK_ACCOUNT = "ADD_BANK_ACCOUNT";
export const SET_BANK_ACCOUNTS = "SET_BANK_ACCOUNTS";
export const FETCH_USER_BANK_ACCOUNTS = "FETCH_USER_BANK_ACCOUNTS";
export const DELETE_BANK_ACCOUNT = "DELETE_BANK_ACCOUNT";

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
  bankAccounts: BankAccount[];
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

export interface BankAccount {
  id: string;
  bank_name: string; // Update to match your API response keys
  account_number: string;
  account_name: string;
  is_default: boolean;
  bankColor?: string; // Add this line
  bank_code: string; // Add this line to include bank_code
}

interface SetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  payload: string;
}

export interface AddBankAccountAction {
  type: typeof ADD_BANK_ACCOUNT;
  payload: BankAccount;
}

interface SetBankAccountsAction {
  type: typeof SET_BANK_ACCOUNTS;
  payload: BankAccount[];
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

export interface DeleteBankAccountAction {
  type: typeof DELETE_BANK_ACCOUNT;
  payload: string;
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
  | AddBankAccountAction
  | UpdateAccountBalancesAction
  | UpdateWealthStageAction
  | DeleteBankAccountAction
  | SetBankAccountsAction;
