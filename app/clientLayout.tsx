"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation"; // Import useSearchParams
import { Provider } from "react-redux";
import store from "./Redux store/store";
import NavBar from "./ui/landing/navbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Get the current path
  const searchParams = useSearchParams(); // Use search params to get query parameters

  const showNavBar = [
    "/",
    "/login",
    "/register",
    "/admin",
    "/requestPasswordReset",
    "/faq",
    "/unsubscribe",
  ].includes(pathname);

  useEffect(() => {
    if (pathname.includes("@")) {
      const email = pathname.split("/")[1];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(email)) {
        // Check if already on the register page
        if (pathname !== "/register") {
          // Redirecting with search parameters directly
          window.location.href = `/register?referral=${encodeURIComponent(
            email
          )}`;
        }
      } else {
        console.error("Invalid email address in URL");
      }
    }
  }, [pathname]);

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
