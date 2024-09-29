"use client";

import React, { useState } from "react";
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
  personCircleSharp,
  mailOutline,
  statsChartOutline,
  documentTextOutline,
} from "ionicons/icons";
import { usePathname } from "next/navigation";
import LogoutModal from "@/components/app/modals/logoutModals";
import Image from "next/image";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [isRetracted, setIsRetracted] = useState(window.innerWidth < 768);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const activeItem = usePathname().split("/")[2];

  return (
    <div
      className={`bg-customPurple h-full p-4 flex flex-col justify-between left-0 top-0 bottom-0 transition-all duration-300 relative ${
        isRetracted ? "w-12" : "w-64"
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
            { icon: personCircleSharp, label: "dashboard" },
            { icon: personCircleOutline, label: "users" },
            { icon: mailOutline, label: "admins" },
            { icon: mailOutline, label: "emails" },
            { icon: trendingUpOutline, label: "transactions" },
          ].map((item, index) => (
            <Link
              href={item.label}
              key={index}
              className={`uppercase flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 w-full ${
                activeItem === item.label
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
                  className="tracking-wide"
                  style={{ fontSize: 14 }}
                >
                  {item.label}
                </span>
              )}
              {isRetracted && <span className="hidden">{item.label}</span>}
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
          { icon: settingsOutline, label: "settings" },
          {
            icon: logOutOutline,
            label: "Log Out",
            class: "text-red-500",
            onClick: () => setIsLoggingOut(true),
          },
        ].map((item, index) => (
          <Link
            href={item.label === "Log Out" ? "#" : item.label}
            key={index}
            className={`capitalize flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${
              activeItem === item.label
                ? "bg-[#F7F5FF] text-[#BF73FA] transform scale-105 font-bold"
                : "hover:bg-opacity-10 hover:bg-gray-300"
            }`}
            onClick={item.onClick}
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
          </Link>
        ))}
      </div>

      <div
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-purple1 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 hover:bg-customPurple hover:scale-110"
        onClick={() => setIsRetracted((state) => !state)}
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
