"use client";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./reducers"; // Make sure this path is correct
import {
  fetchUserInfo,
  fetchUserBankAccounts,
  setUserToken,
  updateUserProfile,
  fetchUserTransactions,
  fetchKYCStatus,
  getCards,
  fetchTopSaversData,
  fetchAutoSaveSettings,
} from "./actions";

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers if any
});

const store = configureStore({
  reducer: rootReducer,
  // Add other store configurations if any
});

// const token = localStorage.getItem("userToken"); // Use "userToken" to match the login

// if (token) {
//   store.dispatch(fetchUserInfo(token)); // Dispatch fetchUserInfo action
//   store.dispatch(setUserToken(token)); // Updated to setUserToken
//   store.dispatch(updateUserProfile({ token })); // Updated to pass profile data if needed
//   store.dispatch(fetchUserBankAccounts(token)); // Dispatch fetchUserBankAccounts action
//   store.dispatch(getCards(token)); // Pass token to getCards
//   store.dispatch(fetchKYCStatus(token)); // Dispatch fetchKYCStatus action
//   store.dispatch(fetchUserTransactions(token)); // Dispatch the action to fetch user transactions
//   store.dispatch(fetchTopSaversData(token) as any);
//   store.dispatch(fetchAutoSaveSettings(token) as any); // Dispatch fetchAutoSaveSettings action
// }

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
