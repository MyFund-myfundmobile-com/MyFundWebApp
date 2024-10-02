"use client";

import Sidebar from "@/components/app/sidebar";
import Header from "@/components/header";
import useWindowWidth from "@/lib/useWindowWidth";
import { useState } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const windowWidth = useWindowWidth();
  const [isRetracted, setIsRetracted] = useState(windowWidth < 768);
  return (
    <div className="flex h-screen w-full ">
      <Sidebar
        isRetracted={isRetracted}
        setIsRetracted={setIsRetracted}
      />
      <div className="flex-grow flex flex-col transition-all duration-300 w-full overflow-x-scroll">
        <Header setIsRetracted={setIsRetracted} />
        <main
          className="flex-1 md:pt-3 pt-5 overflow-y-auto w-full md:px-14 px-1"
          style={{ backgroundColor: "#F7F5FF" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
