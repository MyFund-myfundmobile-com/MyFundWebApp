// _app.tsx
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "./Redux store/store";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
