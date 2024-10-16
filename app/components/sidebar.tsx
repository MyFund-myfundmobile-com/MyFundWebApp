"use client";
import React, { useState, useEffect, useRef } from "react";
import { Divider, Tooltip, CircularProgress } from "@mui/material";
import { IonIcon } from "@ionic/react";
import {
  menuOutline,
  personCircleOutline,
  walletOutline,
  trendingUpOutline,
  businessOutline,
  settingsOutline,
  chatbubbleOutline,
  logOutOutline,
  chevronForwardOutline,
  chevronBackOutline,
} from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../pages/settings/modals/logoutModals";
import { Img } from "react-image";

interface SidebarProps {
  onToggle: () => void;
  isRetracted: boolean;
  onMenuItemClick: (item: string) => void;
  activeItem: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  onToggle,
  isRetracted: initialRetracted,
  onMenuItemClick,
  activeItem,
}) => {
  // Destructure the new prop
  const [isRetracted, setIsRetracted] = useState<boolean>(initialRetracted);
  // const [setActiveItem] = useState<string>("");
  const [lastSelectedItem, setLastSelectedItem] = useState<string>("MYFUND");
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isRetracted &&
        window.innerWidth < 900
      ) {
        setIsRetracted(true);
        onToggle(); // This uses the onToggle function
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRetracted, onToggle]); // Added onToggle as a dependency

  useEffect(() => {
    setIsRetracted(initialRetracted);
  }, [initialRetracted]);

  const handleToggleSidebar = () => {
    setIsRetracted(!isRetracted);
    onToggle();
  };

  const handleMenuItemClickInternal = (item: string) => {
    setLastSelectedItem(item);
    onMenuItemClick(item);
    window.scrollTo(0, 0);

    if (window.innerWidth < 900) {
      setIsRetracted(true);
      onToggle();
    }

    // Navigate after setting the active item
    switch (item) {
      case "Log Out":
        setIsLoggingOut(true);
        break;
      case "MYFUND":
        navigate("/App/home");
        break;
      case "SAVE":
        navigate("/App/save");
        break;
      case "INVEST":
        navigate("/App/invest");
        break;
      case "WITHDRAW":
        navigate("/App/withdraw");
        break;
      case "BUY PROPERTIES":
        navigate("/App/buyProperties");
        break;
      case "Settings":
        navigate("/App/settings");
        break;
      case "Message Admin":
        navigate("/App/settings", { state: { triggerMessageAdmin: true } });
        break;
      default:
        navigate("/App/home");
        break;
    }
  };

  return (
    <div
      ref={sidebarRef} // Attach ref here
      className={`bg-purple1 h-full p-4 flex flex-col justify-between fixed top-0 bottom-0 transition-all duration-300 ${
        isRetracted ? "w-64 -left-full" : "w-64 left-0"
      } z-50`}
    >
      <div>
        <div className="flex items-center justify-between mt-5 mb-10">
          <IonIcon
            icon={menuOutline}
            className="text-white text-2xl cursor-pointer"
            onClick={handleToggleSidebar}
          />
          {!isRetracted && (
            <Tooltip title="Go to the home page" placement="right">
              <Img
                src="/images/myfund.png"
                width="104"
                height="32"
                alt="MyFund Logo"
                className="w-26 h-8 mx-auto cursor-pointer"
                onClick={() => (window.location.href = "/")}
              />
            </Tooltip>
          )}
        </div>

        <div className="text-white px-2 space-y-6 font-nexa">
          {[
            { icon: personCircleOutline, label: "MYFUND" },
            { icon: walletOutline, label: "SAVE" },
            { icon: trendingUpOutline, label: "INVEST" },
            { icon: businessOutline, label: "BUY PROPERTIES" },
            { icon: walletOutline, label: "WITHDRAW" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${
                activeItem === item.label
                  ? "bg-[#F7F5FF] text-[#9C1CB0] transform scale-110 font-black"
                  : "hover:bg-opacity-10 hover:bg-gray-300"
              }`}
              onClick={() => handleMenuItemClickInternal(item.label)}
            >
              <IonIcon icon={item.icon} className="text-2xl mr-4" />
              {!isRetracted && (
                <span className="tracking-wide" style={{ fontSize: 14 }}>
                  {item.label}
                </span>
              )}
              {isRetracted && <span className="hidden">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-100 px-2">
        {!isRetracted && (
          <Divider
            className="my-4 bg-gray-400 mb-80"
            style={{ marginBottom: 30 }}
          />
        )}

        {[
          { icon: settingsOutline, label: "Settings" },
          { icon: chatbubbleOutline, label: "Message Admin" },
          { icon: logOutOutline, label: "Log Out", class: "text-red-500" },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${
              activeItem === item.label
                ? "bg-[#F7F5FF] text-[#BF73FA] transform scale-105 font-bold"
                : "hover:bg-opacity-10 hover:bg-gray-300"
            }`}
            onClick={() => handleMenuItemClickInternal(item.label)}
          >
            {isLoggingOut && item.label === "Log Out" ? (
              <>
                <CircularProgress size={20} className="mr-4" />
                <span className="tracking-wide" style={{ fontSize: 12 }}>
                  Logging Out...
                </span>
              </>
            ) : (
              <>
                <IonIcon
                  icon={item.icon}
                  className={`text-xl mr-4 ${item.class || ""}`}
                />
                {!isRetracted && (
                  <span className="tracking-wide" style={{ fontSize: 12 }}>
                    {item.label}
                  </span>
                )}
                {isRetracted && <span className="hidden">{item.label}</span>}
              </>
            )}
          </div>
        ))}
      </div>

      <div
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-purple1 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 hover:bg-customPurple hover:scale-110"
        onClick={handleToggleSidebar}
      >
        <IonIcon
          icon={isRetracted ? chevronForwardOutline : chevronBackOutline}
          className="text-white text-2xl"
        />
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLoggingOut}
        onClose={() => setIsLoggingOut(false)}
      />
    </div>
  );
};

export default Sidebar;
