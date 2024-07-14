"use client";
import React from "react";
import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "./store/store";

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
