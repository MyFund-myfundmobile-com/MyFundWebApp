"use client";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Provider, useSelector } from "react-redux"; // Import useSelector
import store from "../Redux store/store";
import Sidebar from "./sidebar";
import Header from "./header";
import { RootState } from "../Redux store/store"; // Import RootState

const Layout = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState(
    window.innerWidth < 768
  );
  const [activeItem, setActiveItem] = useState("DASHBOARD");

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const handleSidebarToggle = () => {
    setIsSidebarRetracted(!isSidebarRetracted);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsSidebarRetracted(true);
      } else {
        setIsSidebarRetracted(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <Provider store={store}>
      {" "}
      <div className="flex h-screen w-full">
        <Sidebar
          onToggle={handleSidebarToggle}
          isRetracted={isSidebarRetracted}
          onMenuItemClick={handleMenuItemClick}
        />
        <div
          className={`flex-grow flex flex-col transition-all duration-300 ${
            isSidebarRetracted ? "ml-16" : "ml-80"
          } w-full`}
        >
          <Header
            isSidebarRetracted={isSidebarRetracted}
            activeItem={activeItem}
            userInfo={userInfo}
            handleToggleSidebar={handleSidebarToggle} // Pass handleSidebarToggle to Header
          />
          <main
            className="flex-grow pt-16 overflow-y-auto w-full"
            style={{ backgroundColor: "#F7F5FF", marginLeft: -40 }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default Layout;
