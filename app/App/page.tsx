// App.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import store from "../store/store";
import Layout from "../components/Layout";
import HomePage from "../pages/home/page";
import SavePage from "../pages/save/page";
import InvestPage from "../pages/invest/page";
import WithdrawPage from "../pages/withdraw/page";
import LoginPage from "../login/page";
import NotFound from "../not-found";
import BuyPropertiesPage from "../pages/buyProperties/page";
import SettingsPage from "../pages/settings/page";
import RegisterPage from "../register/page";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* Root path redirects to login */}
          <Route path="/login" element={<LoginPage />} />{" "}
          {/* Login Page Route */}
          <Route path="/App" element={<Navigate to="/App/home" />} />{" "}
          {/* Redirect /App to /App/home */}
          <Route path="/App/*" element={<Layout />}>
            <Route path="home" element={<HomePage />} /> {/* Home Page Route */}
            <Route path="save" element={<SavePage />} /> {/* Save Page Route */}
            <Route path="invest" element={<InvestPage />} />{" "}
            {/* Invest Page Route */}
            <Route path="withdraw" element={<WithdrawPage />} />{" "}
            {/* Withdraw Page Route */}
            <Route path="buyProperties" element={<BuyPropertiesPage />} />{" "}
            {/* Buy Properties Page Route */}
            <Route path="settings" element={<SettingsPage />} />{" "}
            {/* Settings Page Route */}
            <Route path="register" element={<RegisterPage />} />{" "}
            {/* Register Page Route */}
          </Route>
          <Route path="*" element={<NotFound />} /> {/* Not Found Route */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
