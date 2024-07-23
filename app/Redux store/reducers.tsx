import {
  AuthState,
  AuthActionTypes,
  SET_USER_TOKEN,
  SET_USER_INFO,
  SET_USER_INFO_ERROR,
  UPDATE_USER_PROFILE,
  UPDATE_SAVINGS_GOAL,
  UPDATE_ACCOUNT_BALANCES,
  UPDATE_WEALTH_STAGE, // Add this
} from "./types";

const initialState: AuthState = {
  token: null,

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
    default:
      return state;
  }
};

export default authReducer;
