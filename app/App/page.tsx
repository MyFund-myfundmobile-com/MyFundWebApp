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
import store from "../Redux store/store";
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
          <Route path="/login" element={<LoginPage />} />{" "}
          <Route path="/App" element={<Navigate to="/App/home" />} />{" "}
          <Route path="/App/*" element={<Layout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="save" element={<SavePage />} />
            <Route path="invest" element={<InvestPage />} />{" "}
            <Route path="withdraw" element={<WithdrawPage />} />{" "}
            <Route path="buyProperties" element={<BuyPropertiesPage />} />{" "}
            <Route path="settings" element={<SettingsPage />} />{" "}
            <Route path="register" element={<RegisterPage />} />{" "}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
