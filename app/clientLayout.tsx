"use client"; // This file is a Client Component

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { Provider } from "react-redux";
import store from "./store/store";
import NavBar from "./ui/landing/navbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Initialize usePathname
  const showNavBar = [
    "/",
    "/login",
    "/register",
    "/admin",
    "/requestPasswordReset",
    "/faq",
  ].includes(pathname); // Define the routes where NavBar should be shown

  return (
    <Provider store={store}>
      <>
        {showNavBar && <NavBar />} {/* Conditionally render NavBar */}
        <main>{children}</main>
      </>
    </Provider>
  );
};

export default ClientLayout;
