import {
  AuthState,
  AuthActionTypes,
  SET_USER_TOKEN,
  SET_USER_INFO,
  SET_USER_INFO_ERROR,
  UPDATE_USER_PROFILE,
  UPDATE_SAVINGS_GOAL,
  UPDATE_ACCOUNT_BALANCES,
  UPDATE_WEALTH_STAGE,
  ADD_BANK_ACCOUNT,
  DELETE_BANK_ACCOUNT,
  SET_BANK_ACCOUNTS,
  ADD_CARD,
  SET_KYC_STATUS,
  GET_CARDS,
  DELETE_CARD,
  SET_USER_TRANSACTIONS,
  SET_TOP_SAVERS_DATA,
  SET_SELECTED_TOP_SAVER,
  SET_USER_PERCENTAGE,
  SET_AUTO_SAVE_SETTINGS,
  SET_AUTO_SAVE_OFF,
  AutoSaveSettings,
  TopSaversData,
  TopSaver,
  KYCStatus,
  Card,
} from "./types";

const initialState: AuthState = {
  token: null,
  bankAccounts: [],
  userTransactions: [],
  isLoading: false,

  autoSaveSettings: {
    active: false,
    amount: 0,
    frequency: "",
  },

  cards: [],

  KYCStatus: {
    kycStatus: "",
    updated_at: "",
  },

  userInfo: {
    is_first_time_signup: false,
    id: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    token: "",
    referralValue: "",
    preferred_asset: "",
    savings_goal_amount: "",
    time_period: "",
    bankRecords: [],
    cards: [],
    top_saver_percentage: 0,
    profile_picture: "",
  },
  accountBalances: {
    savings: 0,
    investment: 0,
    properties: 0,
    wallet: 0,
  },
  error: null,
  currentWealthStage: {
    stage: 0,
    text: "Unknown",
    description: "Unknown",
  },
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_USER_INFO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      };
    case UPDATE_SAVINGS_GOAL:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      };
    case UPDATE_ACCOUNT_BALANCES:
      return {
        ...state,
        accountBalances: action.payload,
      };
    case UPDATE_WEALTH_STAGE:
      return {
        ...state,
        currentWealthStage: action.payload,
      };
    case ADD_BANK_ACCOUNT:
      return {
        ...state,
        bankAccounts: [...state.bankAccounts, action.payload],
      };
    case DELETE_BANK_ACCOUNT:
      return {
        ...state,
        bankAccounts: state.bankAccounts.filter(
          (account) => account.account_number !== action.payload
        ),
      };
    case SET_BANK_ACCOUNTS:
      return {
        ...state,
        bankAccounts: action.payload,
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    case SET_KYC_STATUS:
      return {
        ...state,
        KYCStatus: action.payload,
      };
    case SET_USER_TRANSACTIONS:
      return {
        ...state,
        userTransactions: action.payload,
      };
    case SET_TOP_SAVERS_DATA:
      return {
        ...state,
        topSaversData: action.payload,
      };
    case SET_SELECTED_TOP_SAVER:
      return {
        ...state,
        selectedTopSaver: action.payload,
      };
    case SET_USER_PERCENTAGE:
      return {
        ...state,
        userPercentage: action.payload,
      };

    case SET_AUTO_SAVE_SETTINGS:
      return {
        ...state,
        autoSaveSettings: action.payload,
      };
    case SET_AUTO_SAVE_OFF:
      return {
        ...state,
        autoSaveSettings: {
          ...state.autoSaveSettings,
          active: false,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
