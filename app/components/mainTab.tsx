import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { home, save, trendingUp, wallet, menu } from "ionicons/icons";
import { useNavigate } from "react-router-dom";

const MainTab = ({
  onMenuItemClick,
}: {
  onMenuItemClick: (label: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState("MyFund");
  const navigate = useNavigate();

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    onMenuItemClick(tab); // Call the prop function to update the header
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full shadow-lg flex justify-around py-4 bg-customPurple text-white">
      <TabItem
        label="MyFund"
        icon={home}
        active={activeTab === "MyFund"}
        onClick={() => handleTabClick("MyFund", "/App/home")}
      />
      <TabItem
        label="Save"
        icon={save}
        active={activeTab === "Save"}
        onClick={() => handleTabClick("Save", "/App/save")}
      />
      <TabItem
        label="Invest"
        icon={trendingUp}
        active={activeTab === "Invest"}
        onClick={() => handleTabClick("Invest", "/App/invest")}
      />
      <TabItem
        label="Withdraw"
        icon={wallet}
        active={activeTab === "Withdraw"}
        onClick={() => handleTabClick("Withdraw", "/App/withdraw")}
      />
      <TabItem
        label="More..."
        icon={menu}
        active={activeTab === "More"}
        onClick={() => handleTabClick("More", "/App/settings")}
      />
    </div>
  );
};

const TabItem = ({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) => (
  <div onClick={onClick} className="flex flex-col items-center cursor-pointer">
    <IonIcon
      icon={icon}
      className={`h-8 w-8 ${active ? "text-[#BF73FA]" : "text-gray-300"}`}
      style={{ marginBottom: 5 }}
    />
    <span className={`text-xs ${active ? "text-[#BF73FA]" : "text-gray-300"}`}>
      {label}
    </span>
    {active && (
      <div
        className={`w-2 h-2 mt-1 rounded-full ${
          active ? "bg-[#BF73FA]" : "bg-gray-300"
        }`}
      ></div>
    )}
  </div>
);

export default MainTab;
