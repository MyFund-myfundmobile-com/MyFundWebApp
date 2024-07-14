"use client"; // This file is a Client Component

import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Facts from "./ui/landing/facts";
import Footer from "./ui/landing/footer";
import Header from "./ui/landing/header";
import NavBar from "./ui/landing/navbar";
import HowItWorks from "./ui/landing/steps";
import Layout from "./components/Layout";
import AdminLayout from "./admin/Layout";
import LoginPage from "./login/page";
import RegisterPage from "./register/page";

const Home = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <AdminLayout />
      <Layout />
      <Header />
      <HowItWorks />
      <Facts />
      <Footer />
      <LoginPage />
      <RegisterPage />
    </Provider>
  );
};

export default Home;
