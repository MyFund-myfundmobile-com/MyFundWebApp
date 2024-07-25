import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./reducers"; // Make sure this path is correct
import { fetchUserInfo } from "./actions"; // Import fetchUserInfo action
import {
  updateUserProfile,
  fetchUserBankAccounts,
  setUserToken,
} from "./actions";

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers if any
});

const store = configureStore({
  reducer: rootReducer,
  // Add other store configurations if any
});

const token = localStorage.getItem("userToken"); // Use "userToken" to match the login
if (token) {
  store.dispatch(fetchUserInfo(token)); // Dispatch fetchUserInfo action
  store.dispatch(setUserToken(token)); // Updated to setUserToken
  store.dispatch(updateUserProfile(token)); // Dispatch fetchUserInfo action
  store.dispatch(fetchUserBankAccounts(token)); // Dispatch fetchUserBankAccounts action
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
