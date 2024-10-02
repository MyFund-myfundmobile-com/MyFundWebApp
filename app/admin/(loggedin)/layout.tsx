"use client";

import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/header";
import useWindowWidth from "@/lib/useWindowWidth";
import { useState } from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const windowWidth = useWindowWidth();
  const [isRetracted, setIsRetracted] = useState(windowWidth < 768);

  return (
    <div className="flex h-screen w-full">
      <Sidebar
        isRetracted={isRetracted}
        setIsRetracted={setIsRetracted}
      />
      <div
        className={`flex-grow flex flex-col transition-all duration-300 w-full`}
      >
        <Header setIsRetracted={setIsRetracted} />
        <main className="flex-grow pt-16 px-16 bg-gray-100 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
