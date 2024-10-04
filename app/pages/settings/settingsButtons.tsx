"use client";
import React from "react";
import { IonIcon } from "@ionic/react";
import {
  settingsOutline,
  cardOutline,
  personOutline,
  arrowDownOutline,
  keyOutline,
  starOutline,
  helpCircleOutline,
  giftOutline,
  mailOutline,
  thumbsUpOutline,
  logOutOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";

interface SettingsButtonsSectionProps {
  onMenuSelect: (menu: string) => void;
  selectedButton: string | null;
}

const SettingsButtonsSection: React.FC<SettingsButtonsSectionProps> = ({
  onMenuSelect,
  selectedButton,
}) => {
  const settings = [
    { label: "Savings Goal", icon: settingsOutline },
    { label: "Card and Bank Settings", icon: cardOutline },
    { label: "Update KYC", icon: shieldCheckmarkOutline },
    { label: "Update Transaction PIN", icon: keyOutline },
    { label: "Top Savers", icon: starOutline },
    { label: "FAQs", icon: helpCircleOutline },
    { label: "Refer and Earn: N500 EACH", icon: giftOutline },
    { label: "Message Admin", icon: mailOutline },
    { label: "Submit Withdrawal Request", icon: arrowDownOutline },
    { label: "Rate MyFund", icon: thumbsUpOutline },
    { label: "Log Out", icon: logOutOutline, color: "brown" },
  ];

  const handleButtonClick = (label: string) => {
    onMenuSelect(label);
  };

  return (
    <section className="flex flex-col gap-2 mt-2 font-karla">
      {settings.map((setting, index) => (
        <button
          key={index}
          className={`relative flex items-center p-2 border rounded-lg transition-all duration-300 transform ${
            selectedButton === setting.label
              ? "bg-purple-500 text-white scale-105 after:absolute after:top-1/2 after:right-[-7px] after:transform after:translate-y-[-50%] after:border-t-[12px] after:border-t-transparent after:border-r-[10px] after:border-r-purple-500 after:border-b-[10px] after:border-b-transparent after:rotate-180"
              : "bg-white hover:scale-105 hover:bg-[#DCD1FF]"
          }`}
          onClick={() => handleButtonClick(setting.label)}
        >
          <IonIcon
            icon={setting.icon}
            className={`text-xl ${
              selectedButton === setting.label ? "text-white" : "text-black"
            }`}
            style={{ color: setting.color }}
          />
          <span className="ml-3 flex-1 text-left text-sm">
            {setting.label.includes("Refer and Earn:") ? (
              <>
                Refer and Earn:{" "}
                <span style={{ color: "green" }}>N500 EACH</span>
              </>
            ) : (
              setting.label
            )}
          </span>
        </button>
      ))}
    </section>
  );
};

export default SettingsButtonsSection;
