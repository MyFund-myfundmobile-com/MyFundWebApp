"use client";

import { Provider } from "react-redux";
import store from "@/Redux store/store";

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
