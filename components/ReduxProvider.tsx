"use client";

import { Provider } from "react-redux";
import store from "@/Redux store/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    if (pathname.includes("@")) {
      const email = pathname.split("/")[1];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(email)) {
        // Check if already on the register page
        if (pathname !== "/register") {
          // Redirecting with search parameters directly
          push(`/register?referral=${encodeURIComponent(email)}`);
        }
      } else {
        console.error("Invalid email address in URL");
      }
    }
  }, [pathname]);
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
