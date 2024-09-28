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
export const DELETE_BANK_ACCOUNT = "DELETE_BANK_ACCOUNT";
export const ADD_CARD = "ADD_CARD";
export const GET_CARDS = "GET_CARDS";
export const DELETE_CARD = "DELETE_CARD";
export const SET_KYC_STATUS = "SET_KYC_STATUS";
export const SET_USER_TRANSACTIONS = "SET_USER_TRANSACTIONS";
export const SET_TOP_SAVERS_DATA = "SET_TOP_SAVERS_DATA";
export const SET_SELECTED_TOP_SAVER = "SET_SELECTED_TOP_SAVER";
export const SET_USER_PERCENTAGE = "SET_USER_PERCENTAGE";
export const SET_AUTO_SAVE_SETTINGS = "SET_AUTO_SAVE_SETTINGS";
export const SET_AUTO_SAVE_OFF = "SET_AUTO_SAVE_OFF";
export const SET_AUTO_INVEST_SETTINGS = "SET_AUTO_INVEST_SETTINGS";
export const SET_AUTO_INVEST_OFF = "SET_AUTO_INVEST_OFF";
export const SET_ALL_USERS = "SET_ALL_USERS";
export const SET_USERS_BY_DATE_RANGE = "SET_USERS_BY_DATE_RANGE";

export const SET_EMAIL_TEMPLATES = "SET_EMAIL_TEMPLATES";

export interface EmailTemplate {
  id: number;
  title: string;
  design_body: string;
  design_html: string;
  last_update: string;
}

interface SetEmailTemplatesAction {
  type: typeof SET_EMAIL_TEMPLATES;
  payload: EmailTemplate[];
}

export interface User {
  is_first_time_signup?: boolean;
  id: string | number | null;
  firstName: string;
  first_name: string;
  last_name: string;
  lastName: string;
  mobileNumber: string;
  phone_number: string;
  email: string;
  token: string;
  referralValue: string;
  preferred_asset: string;
  savings_goal_amount: string;
  time_period: string;
  bankRecords: any[];
  cards: Card[];
  top_saver_percentage: number;
  profile_picture?: string;
  date_joined: string;
}

export interface UserTransaction {
  id: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  description: string;
  time: string;
  transaction_id: string;
  status: "pending" | "confirmed"; // Updated to a union type
}

export interface AuthState {
  token: string | null;
  bankAccounts: BankAccount[];
  cards: Card[];
  allUsers?: User[];
  emailTemplates: EmailTemplate[];
  userInfo: User;
  KYCStatus: KYCStatus;
  userTransactions: UserTransaction[];
  accountBalances: {
    savings: number;
    investment: number;
    properties: number;
    wallet: number;
  };
  error: string | null;
  currentWealthStage: WealthStage;
  isLoading: boolean;
  topSaversData?: TopSaversData;
  selectedTopSaver?: TopSaver;
  userPercentage?: number;
  autoSaveSettings?: AutoSaveSettings;
  autoInvestSettings?: AutoInvestSettings;
}

export interface WealthStage {
  stage: number;
  text: string;
  description: string;
}

export interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  is_default: boolean;
  bankColor?: string;
  bank_code: string;
}

export interface Card {
  id: string;
  bank_name: string;
  expiry_date: string;
  card_number: string;
  bankColor?: string;
  bank_code: string;
  cardHolderName: string;
}

export interface KYCStatus {
  kycStatus?: string;
  updated_at?: string;
  message?: string;
}

export interface TopSaver {
  id: number;
  email: string;
  first_name: string;
  profile_picture: string;
  individual_percentage: number;
}

export interface TopSaversData {
  top_savers: TopSaver[];
  current_user: {
    individual_percentage: number;
  };
}

export interface AutoSaveSettings {
  active: boolean;
  amount: number; // No longer optional
  frequency: string; // No longer optional
  autosave_enabled?: boolean; // Optional
}
export interface AutoInvestSettings {
  active: boolean;
  amount: number; // No longer optional
  frequency: string; // No longer optional
  autoinvest_enabled?: boolean; // Optional
}

interface Saver {
  id: number;
  firstName: string;
  profilePicture: string;
}

interface SetTopSaversDataAction {
  type: typeof SET_TOP_SAVERS_DATA;
  payload: TopSaversData;
}

interface SetSelectedTopSaverAction {
  type: typeof SET_SELECTED_TOP_SAVER;
  payload: TopSaver;
}

interface SetUserPercentageAction {
  type: typeof SET_USER_PERCENTAGE;
  payload: number;
}

interface SetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  payload: string;
}

interface AddBankAccountAction {
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

interface UpdateUserProfileAction {
  type: typeof UPDATE_USER_PROFILE;
  payload: Partial<User>;
}

interface DeleteBankAccountAction {
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

interface AddCardAction {
  type: typeof ADD_CARD;
  payload: Card;
}

interface SetKYCStatusAction {
  type: typeof SET_KYC_STATUS;
  payload: Partial<KYCStatus>;
}

interface GetCardsAction {
  type: typeof GET_CARDS;
  payload: Card[];
}

interface DeleteCardAction {
  type: typeof DELETE_CARD;
  payload: string;
}

interface SetUserTransactionsAction {
  type: typeof SET_USER_TRANSACTIONS;
  payload: UserTransaction[];
}

interface SetAutoSaveSettingsAction {
  type: typeof SET_AUTO_SAVE_SETTINGS;
  payload: AutoSaveSettings;
}

interface SetAutoSaveOffAction {
  type: typeof SET_AUTO_SAVE_OFF;
}
interface SetAutoInvestSettingsAction {
  type: typeof SET_AUTO_INVEST_SETTINGS;
  payload: AutoInvestSettings;
}

interface SetAutoInvestOffAction {
  type: typeof SET_AUTO_INVEST_OFF;
}

interface SetAllUsersAction {
  type: typeof SET_ALL_USERS;
  payload: User[];
}

interface SetUsersByDateRangeAction {
  type: typeof SET_USERS_BY_DATE_RANGE;
  payload: User[];
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
  | SetBankAccountsAction
  | AddCardAction
  | GetCardsAction
  | DeleteCardAction
  | SetUserTransactionsAction
  | SetKYCStatusAction
  | SetTopSaversDataAction
  | SetSelectedTopSaverAction
  | SetUserPercentageAction
  | SetAutoSaveSettingsAction
  | SetAutoSaveOffAction
  | SetAutoInvestSettingsAction
  | SetAutoInvestOffAction
  | SetAllUsersAction
  | SetEmailTemplatesAction
  | SetUsersByDateRangeAction;
