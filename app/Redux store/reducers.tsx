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
  SET_AUTO_INVEST_SETTINGS,
  SET_ALL_USERS,
  SET_USERS_BY_DATE_RANGE,
  SET_EMAIL_TEMPLATES,
} from "./types";

const initialState: AuthState = {
  token: null,
  bankAccounts: [],
  userTransactions: [],
  emailTemplates: [],
  isLoading: false,
  autoSaveSettings: {
    active: false,
    amount: 0,
    frequency: "",
    autosave_enabled: false,
  },

  cards: [],

  KYCStatus: {
    kycStatus: "",
    updated_at: "",
  },
  autoInvestSettings: {
    active: false,
    amount: 0,
    frequency: "",
    autoinvest_enabled: false,
  },

  userInfo: {
    is_first_time_signup: false,
    id: "", // Make sure it's an empty string or null, not undefined
    firstName: "",
    first_name: "",
    last_name: "",
    lastName: "",
    phone_number: "",
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
    date_joined: "",
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
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
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
          (account: any) => account.account_number !== action.payload
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
        autoSaveSettings: action.payload, // No extra wrapping, store directly
      };
    case SET_AUTO_INVEST_SETTINGS:
      return {
        ...state,
        autoInvestSettings: {
          ...action.payload,
        },
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case SET_USERS_BY_DATE_RANGE:
      return {
        ...state,
        allUsers: action.payload,
      };
    case SET_EMAIL_TEMPLATES:
      return {
        ...state,
        emailTemplates: action.payload, // Set fetched templates
      };

    default:
      return state;
  }
};

export default authReducer;
