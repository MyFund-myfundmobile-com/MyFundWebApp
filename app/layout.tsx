import type { Metadata } from "next";
import { karla, nexa, productSans, proxima } from "../lib/font";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import StyledComponentsRegistry from "@/lib/registry";
import ReduxProvider from "@/components/ReduxProvider";

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
      <body
        className={`${karla.variable} ${nexa.variable} ${productSans.variable} ${proxima.variable} ${nexa.className} h-auto`}
      >
        <StyledComponentsRegistry>
          <ReduxProvider>{children}</ReduxProvider>
          <Analytics />
          <SpeedInsights />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
