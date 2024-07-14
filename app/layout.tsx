import { Metadata } from "next";
import "./globals.css";
import { karla, nexa, productSans, proxima } from "./ui/font";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "react-redux";
import store from "./store/store";
import ClientLayout from "./clientLayout";

config.autoAddCss = false;

let metadata: Metadata | undefined;

if (typeof window !== "undefined") {
  metadata = {
    title: "The TRUE Way to Save and Invest — MyFund",
    description:
      "MyFund helps working-class people save towards properties. Unlike the currently available solutions. MyFund offers lifetime rental income for users via its national hostel project.",
  };
}

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${karla.variable} ${nexa.variable} ${productSans.variable} ${proxima.variable} ${nexa.className} px-6 lg:px-10 xl:px-20 h-auto`}
      >
        <Provider store={store}>
          <ClientLayout>{children}</ClientLayout>
        </Provider>
      </body>
    </html>
  );
}
