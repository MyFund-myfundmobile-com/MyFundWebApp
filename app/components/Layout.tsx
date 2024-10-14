"use client";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Provider, useSelector } from "react-redux"; // Import useSelector
import store from "../Redux store/store";
import Sidebar from "./sidebar";
import Header from "./header";
import MainTab from "./mainTab";
import { RootState } from "../Redux store/store"; // Import RootState

const Layout = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState(
    window.innerWidth < 900
  );
  const [activeItem, setActiveItem] = useState("MyFund");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track if it's mobile view

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const handleSidebarToggle = () => {
    setIsSidebarRetracted(!isSidebarRetracted);
  };

  useEffect(() => {
    if (window.innerWidth < 900) {
      window.scrollTo(0, 0); // Scroll to top
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsSidebarRetracted(true); // Retract sidebar if window is less than 900px
      } else {
        setIsSidebarRetracted(false); // Expand sidebar if window is more than 900px
      }
      setIsMobile(window.innerWidth < 768); // Update mobile view state
    };
    window.addEventListener("resize", handleResize);

    // Ensure sidebar retracts on initial render based on window width
    handleResize();

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
          activeItem={activeItem} // Pass activeItem as a prop
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
            className="flex-grow pt-16 pb-10 overflow-y-auto w-full"
            style={{ backgroundColor: "#F5F1FF", marginLeft: -40 }}
          >
            <Outlet />
          </main>
          {isMobile && <MainTab onMenuItemClick={handleMenuItemClick} />}
        </div>
      </div>
    </Provider>
  );
};

export default Layout;
