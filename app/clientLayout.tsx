"use client"; // This file is a Client Component

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import NavBar from "./ui/landing/navbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Initialize usePathname
  const showNavBar = [
    "/",
    "/login",
    "/register",
    "/admin",
    "/requestPasswordReset",
  ].includes(pathname); // Define the routes where NavBar should be shown

  return (
    <>
      {showNavBar && <NavBar />} {/* Conditionally render NavBar */}
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
