"use client";
import React, { useState, useEffect } from "react";
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
import LogoutModal from "@/components/app/modals/logoutModals";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [isRetracted, setIsRetracted] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const activeItem = usePathname().split("/")[2];

  return (
    <div
      className={`bg-purple1 h-full p-4 flex flex-col justify-between relative transition-all duration-300 ${
        isRetracted ? "w-14" : "w-72"
      } z-50`}
    >
      <div>
        <div className="flex items-center justify-between mt-5 mb-10">
          <IonIcon
            icon={menuOutline}
            className="text-white text-2xl cursor-pointer"
            onClick={() => setIsRetracted((state) => !state)}
          />
          {!isRetracted && (
            <Link href="/">
              <Tooltip
                title="Go to the home page"
                placement="right"
              >
                <Image
                  src="/images/myfund.png"
                  width="104"
                  height="32"
                  alt="MyFund Logo"
                  className="w-26 h-8 mx-auto cursor-pointer"
                />
              </Tooltip>
            </Link>
          )}
        </div>

        <div
          className={`text-white px-2 space-y-6 font-nexa ${
            isRetracted ? "hidden" : "block"
          }`}
        >
          {[
            { icon: personCircleOutline, label: "DASHBOARD", href: "" },
            { icon: walletOutline, label: "SAVE", href: "save" },
            { icon: trendingUpOutline, label: "INVEST", href: "invest" },
            {
              icon: businessOutline,
              label: "BUY PROPERTIES",
              href: "buyProperties",
            },
            { icon: walletOutline, label: "WITHDRAW", href: "withdraw" },
          ].map((item, index) => (
            <Link
              href={`/app/${item.href}`}
              key={index}
            >
              <div
                className={`flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${
                  activeItem === item.href ||
                  (!activeItem && item.label === "DASHBOARD")
                    ? "bg-[#F7F5FF] text-[#9C1CB0] transform scale-110 font-black"
                    : "hover:bg-opacity-10 hover:bg-gray-300"
                }`}
              >
                <IonIcon
                  icon={item.icon}
                  className="text-2xl mr-4"
                />
                {!isRetracted && (
                  <span
                    className="tracking-wide uppercase"
                    style={{ fontSize: 14 }}
                  >
                    {item.label}
                  </span>
                )}
                {isRetracted && <span className="hidden">{item.label}</span>}
              </div>
            </Link>
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
          { icon: settingsOutline, label: "Settings", href: "settings" },
          { icon: logOutOutline, label: "Log Out", class: "text-red-500" },
        ].map((item, index) => (
          <Link
            href={`/app/${item.href}`}
            key={index}
          >
            <div
              className={`flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${
                activeItem === item.href
                  ? "bg-[#F7F5FF] text-[#BF73FA] transform scale-105 font-bold"
                  : "hover:bg-opacity-10 hover:bg-gray-300"
              }`}
            >
              {isLoggingOut && item.label === "Log Out" ? (
                <>
                  <CircularProgress
                    size={20}
                    className="mr-4"
                  />
                  <span
                    className="tracking-wide"
                    style={{ fontSize: 12 }}
                  >
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
                    <span
                      className="tracking-wide"
                      style={{ fontSize: 12 }}
                    >
                      {item.label}
                    </span>
                  )}
                  {isRetracted && <span className="hidden">{item.label}</span>}
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div
        onClick={() => setIsRetracted((state) => !state)}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-purple1 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 hover:bg-customPurple hover:scale-110"
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
