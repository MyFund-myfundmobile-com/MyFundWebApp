"use client";
import React from "react";
import Section from "@/components/section";
import { IonIcon } from "@ionic/react";
import {
  carOutline,
  carSportOutline,
  personAddOutline,
  checkmarkCircle,
  checkmarkCircleOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux store/store";
import { RootState } from "@/Redux store/store";

const QuickActionsSection = () => {
  const { push: navigate } = useRouter(); // Initialize useNavigate

  const handleActiveAutoSaveButton = () => {
    if (isAutoSaveActive) {
      navigate("/app/save"); // Navigate to SavePage without state
    } else {
      navigate("/app/save"); // Navigate to SavePage with state
    }
  };

  const handleActivateAutoInvest = () => {
    navigate("/app/invest"); // Navigate to SavePage with state
  };

  const handleKYCUpdate = () => {
    navigate("/app/settings");
  };

  const handleReferAndEarn = () => {
    navigate("/app/withdraw?shareModal=true");
  };

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const kycStatus = useSelector((state: RootState) => state.auth.KYCStatus);
  const autoSaveSettings = useSelector(
    (state: RootState) => state.auth.autoSaveSettings
  );
  // Use autoSaveSettings.active instead of autosave_enabled
  const isAutoSaveActive = autoSaveSettings?.active ?? false;

  // 2. Update the `isAutoSaveActive` condition to check if autoSaveSettings is defined and active
  console.log("Fetched autoSaveSettings from Redux:", autoSaveSettings?.active);
  console.log("Is AutoSave Active:", autoSaveSettings);

  const autoInvestSettings = { active: false }; // Update this based on your state

  let statusColor = "text-gray-500"; // Default to gray
  let statusText = "Not yet started"; // Default text

  if (kycStatus?.kycStatus === "Pending...") {
    statusColor = "text-green-600";
    statusText = "In progress...";
  } else if (kycStatus?.kycStatus === "Updated!") {
    statusColor = "text-green-600";
    statusText = "Updated!";
  }

  return (
    <section>
      <Section style={{ marginBottom: -3, marginTop: -3 }}>
        QUICK ACTIONS
      </Section>
      <div className="flex flex-col gap-2 mt-2 font-karla">
        <button
          className={`flex items-center p-2 border rounded-lg ${
            isAutoSaveActive ? "bg-gray-200" : "bg-white"
          } transition-all duration-300 transform ${
            isAutoSaveActive ? "" : "hover:scale-105 hover:bg-[#DCD1FF]"
          }`}
          onClick={handleActiveAutoSaveButton} // Ensure click handler is always invoked
        >
          <IonIcon
            icon={carOutline}
            className={`text-xl ${
              isAutoSaveActive ? "text-green-600 font-bold" : "text-black"
            }`}
          />
          <span
            className={`ml-3 flex-1 text-left text-sm ${
              isAutoSaveActive ? "text-green-600 font-bold" : "text-black"
            }`}
            style={{ letterSpacing: -0.5 }}
          >
            {isAutoSaveActive
              ? `AutoSave is ON: ₦${autoSaveSettings?.amount} ${autoSaveSettings?.frequency}`
              : "Turn ON AutoSave"}
          </span>
          {isAutoSaveActive && (
            <IonIcon
              icon={checkmarkCircle}
              className="text-xl text-green-600 font-bold"
            />
          )}
        </button>

        <button
          className={`flex items-center p-2 border rounded-lg ${
            autoInvestSettings.active ? "bg-gray-200" : "bg-white"
          } transition-all duration-300 transform hover:scale-105 hover:bg-[#DCD1FF]`}
          onClick={handleActivateAutoInvest}
          disabled={autoInvestSettings.active}
        >
          <IonIcon
            icon={carSportOutline}
            className={`text-xl ${
              autoInvestSettings.active ? "text-green-500" : "text-black"
            }`}
          />
          <span className="ml-3 flex-1 text-left text-sm">
            {autoInvestSettings.active
              ? `AutoInvest is ON:`
              : "Turn ON AutoInvest"}
          </span>
          {autoInvestSettings.active && (
            <IonIcon
              icon={checkmarkCircleOutline}
              className="text-xl text-green-500"
            />
          )}
        </button>

        <button
          className="flex items-center p-2 border rounded-lg bg-white transition-all duration-300 transform hover:scale-105 hover:bg-[#DCD1FF]"
          onClick={handleReferAndEarn} // Update the onClick handler
        >
          <IonIcon
            icon={personAddOutline}
            className="text-xl text-black"
          />
          <span className="ml-3 flex-1 text-left text-sm">Refer and Earn</span>
          <span className="text-xs text-green-600">₦500 EACH</span>
        </button>

        <button
          className={`flex items-center p-2 border rounded-lg ${
            kycStatus?.kycStatus === "Pending..." ||
            kycStatus?.kycStatus === "Updated!"
              ? "bg-gray-200"
              : "bg-white"
          } transition-all duration-300 transform ${
            kycStatus?.kycStatus !== "Pending..." &&
            kycStatus?.kycStatus !== "Updated!"
              ? "hover:scale-105 hover:bg-[#DCD1FF]"
              : ""
          }`}
          onClick={handleKYCUpdate}
          // disabled={
          //   kycStatus?.kycStatus === "Pending..." ||
          //   kycStatus?.kycStatus === "Updated!"
          // }
        >
          <IonIcon
            icon={shieldCheckmarkOutline}
            className="text-xl text-black"
          />
          <span className="ml-3 flex-1 text-left text-sm">Update KYC:</span>
          <span className={`text-sm ${statusColor}`}>{statusText}</span>
          {kycStatus?.kycStatus === "Updated!" && (
            <IonIcon
              icon={checkmarkCircle}
              className="text-xl text-green-600 ml-1"
              style={{ marginBottom: -2 }}
            />
          )}
        </button>

        {/* Add more buttons as needed */}
      </div>
    </section>
  );
};

export default QuickActionsSection;
