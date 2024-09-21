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
  fetchAutoInvestSettings,
  fetchAllUsers,
  fetchEmailTemplates,
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
//   store.dispatch(fetchUserInfo(token));
//   store.dispatch(setUserToken(token));
//   store.dispatch(updateUserProfile({ token }));
//   store.dispatch(fetchUserBankAccounts(token));
//   store.dispatch(getCards(token));
//   store.dispatch(fetchKYCStatus(token));
//   store.dispatch(fetchUserTransactions(token));
//   store.dispatch(fetchTopSaversData(token) as any);
//   store.dispatch(fetchAutoSaveSettings(token) as any);
//   store.dispatch(fetchAllUsers(token));
//   store.dispatch(fetchEmailTemplates(token)); // Add this to fetch templates
// }

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
