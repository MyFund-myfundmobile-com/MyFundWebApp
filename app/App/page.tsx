"use client";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/home/page";
import SavePage from "../pages/save/page";
import InvestPage from "../pages/invest/page";
import WithdrawPage from "../pages/withdraw/page";
import NotFound from "../not-found";
import BuyPropertiesPage from "../pages/buyProperties/page";
import SettingsPage from "../pages/settings/page";
import RegisterPage from "../register/page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/App" element={<Navigate to="/App/home" />} />
        <Route path="/App/*" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="save" element={<SavePage />} />
          <Route path="invest" element={<InvestPage />} />
          <Route path="withdraw" element={<WithdrawPage />} />
          <Route path="buyProperties" element={<BuyPropertiesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
