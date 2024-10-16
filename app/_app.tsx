"use client";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "./Redux store/store";
import "./global.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
