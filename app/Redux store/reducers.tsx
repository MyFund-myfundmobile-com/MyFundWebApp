import {
  AuthState,
  AuthActionTypes,
  SET_USER_TOKEN,
  SET_USER_INFO,
  SET_USER_INFO_ERROR,
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
    profile_picture: "", // Add this line
  },
  error: null,
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case SET_USER_TOKEN:
      console.log("Reducer: SET_USER_TOKEN", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    case SET_USER_INFO:
      console.log("Reducer: SET_USER_INFO", action.payload);
      return {
        ...state,
        userInfo: action.payload,
        error: null,
      };
    case SET_USER_INFO_ERROR:
      console.log("Reducer: SET_USER_INFO_ERROR", action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
