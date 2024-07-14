import type { Metadata } from "next";
import "./globals.css";
import { karla, nexa, productSans, proxima } from "./ui/font";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import ClientLayout from "./clientLayout";
import { Providers } from "./providers"; // Import the Providers component

config.autoAddCss = false; // Prevent Font Awesome from adding CSS automatically

export const metadata: Metadata = {
  title: "The TRUE Way to Save and Invest — MyFund",
  description:
    "MyFund helps working-class people save towards properties. Unlike the currently available solutions, MyFund offers lifetime rental income for users via its national hostel project.",
};

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
        <Providers>
          {" "}
          {/* Use the Providers component */}
          <ClientLayout>{children}</ClientLayout>{" "}
          {/* Use the ClientLayout component */}
        </Providers>
      </body>
    </html>
  );
}
