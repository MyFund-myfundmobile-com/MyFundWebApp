"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Divider } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { IonIcon } from "@ionic/react";
import {
  personOutline,
  callOutline,
  mailOutline,
  arrowUpOutline,
  cashOutline,
} from "ionicons/icons";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import Section from "@/app/components/section";
import SettingsButtonsSection from "./settingsButtons";
import LogoutModal from "./modals/logoutModals";
import CardSettings from "./subsettings/card";
import BankSettings from "./subsettings/bank";
import KYCSettings from "./subsettings/kyc";
import TransactionPIN from "./subsettings/transactonPIN";
import TopSaversSettings from "./subsettings/topSavers";
import FAQs from "./subsettings/FAQs";
import ReferAndEarnSettings from "./subsettings/referAndEarn";
import MessageAdminSettings from "./subsettings/messageAdmin";
import RateMyFundSettings from "./subsettings/rateMyFund";
import PrivacyAndPolicySettings from "./subsettings/privacyAndPolicy";
import SavingsGoal from "./subsettings/savingsGoal";
import SettingsExtension from "./settingsExtension"; // Ensure this import is added
import UpdateProfileModal from "./modals/updateProfileModal";
import Image from "next/image";
import Cropper from "react-cropper"; // Import react-cropper
import "cropperjs/dist/cropper.css"; // Import cropper CSS
import { fetchUserProfile } from "../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";

const SettingsPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(
    "Savings Goal"
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUpdateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/DrTsquare.png"); // Add state for profile image
  const [cropImage, setCropImage] = useState<string | null>(null); // Add state for crop image
  const [cropper, setCropper] = useState<any>(); // Add state for cropper instance
  const settingsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Add ref for file input

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.userToken);
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);

  useEffect(() => {
    console.log("Token inside useEffect:", token);
    if (token) {
      console.log("Dispatching fetchUserProfile with token:", token);
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  console.log("Token inside settings:", token);
  console.log("User profile inside settings:", userProfile);

  const handleMenuSelect = (menu: string) => {
    if (menu === "Log Out") {
      setIsLoggingOut(true);
    } else {
      setSelectedMenu(menu);
      if (settingsRef.current && window.innerWidth <= 768) {
        // Assuming 768px is the mobile breakpoint
        settingsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleUpdateProfileClick = () => {
    setUpdateProfileModalOpen(true);
  };

  const handleUpdateProfile = (data: any) => {
    // Replace with actual update logic
    console.log("Updating profile with:", data);
    // Show success modal or toast message here
  };

  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setCropImage(e.target.result); // Set the crop image
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropper) {
      setProfileImage(cropper.getCroppedCanvas().toDataURL()); // Update profile image state with cropped image
      setCropImage(null); // Clear the crop image
    }
  };

  const getSelectedComponent = () => {
    switch (selectedMenu) {
      case "Savings Goal":
        return <SavingsGoal />;
      case "Card and Bank Settings":
        return <CardSettings onNavigate={handleMenuSelect} />;
      case "Bank Settings":
        return <BankSettings onNavigate={handleMenuSelect} />;
      case "Update KYC":
        return <KYCSettings />;
      case "Update Transaction PIN":
        return <TransactionPIN />;
      case "Top Savers":
        return <TopSaversSettings />;
      case "FAQs":
        return <FAQs />;
      case "Refer and Earn: N1000 EACH":
        return <ReferAndEarnSettings />;
      case "Message Admin":
        return <MessageAdminSettings />;
      case "Rate MyFund":
        return <RateMyFundSettings />;
      case "Privacy and Policy":
        return <PrivacyAndPolicySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="px-6 max-w-full animate-floatIn">
      {/* PROFILE SECTION */}
      <Section>PROFILE</Section>
      <div className="flex flex-col lg:flex-row mb-4 mt-5">
        <div className="flex flex-col lg:flex-row lg:w-1/3 items-start">
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={profileImage}
              width={120}
              height={120}
              alt="Profile"
              className="w-36 h-36 rounded-full border-2 border-purple-400"
            />
            <div className="absolute bottom-0 right-0 bg-purple1 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Edit
                className="text-white active cursor-pointer"
                onClick={handleProfileImageClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>
          </div>
          {/* Name and Email */}
          <div className="ml-4 mt-4 lg:mt-0">
            <Title>{userProfile?.firstName}</Title>
            <Subtitle>{userProfile?.email}</Subtitle>
          </div>
        </div>

        <div className="hidden lg:block h-auto mx-6 border-l border-gray-200"></div>

        {/* User Details */}
        <div className="flex flex-col lg:w-2/3 ml-0 lg:ml-6 mt-4 lg:mt-0">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={personOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">
                  Full Name
                </p>
                <p className="font-semibold font-proxima text-purple1">
                  Tolulope Ahmed
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={callOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">
                  Mobile Number
                </p>
                <p className="font-semibold font-proxima text-purple1">
                  +2348033924595
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={mailOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">
                  Email/Username
                </p>
                <p className="font-semibold font-proxima text-purple1">
                  tolulopeahmed@gmail.com
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={cashOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">
                  Financial Level
                </p>
                <p className="font-semibold font-proxima text-purple1">
                  Level 3: SURPLUS
                </p>
              </div>
            </div>
          </div>
          {/* Update Profile Button */}
          <div className="flex justify-center mt-4">
            <PrimaryButton
              onClick={handleUpdateProfileClick}
              startIcon={
                <IonIcon
                  icon={arrowUpOutline}
                  style={{ fontSize: "20px", marginRight: 5 }}
                />
              }
              background="#fff"
              hoverBackgroundColor="#DCD1FF"
              color="#4C28BC"
              hoverColor="#4C28BC"
              style={{ width: "95%", letterSpacing: 0.5 }}
            >
              UPDATE PROFILE
            </PrimaryButton>
          </div>
        </div>
      </div>

      <Divider className="my-4 bg-gray-100" />

      {/* SETTINGS SECTION */}
      <Section>SETTINGS</Section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="md:col-span-1">
          <SettingsButtonsSection onMenuSelect={handleMenuSelect} />
        </div>
        <div className="md:col-span-2" ref={settingsRef}>
          {selectedMenu !== "Log Out" && selectedMenu !== null && (
            <SettingsExtension selectedMenu={selectedMenu}>
              {getSelectedComponent()}
            </SettingsExtension>
          )}
        </div>
      </div>

      {/* Crop Image Modal */}
      {cropImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded">
            <Cropper
              src={cropImage}
              style={{ height: 400, width: "100%" }}
              aspectRatio={1}
              guides={false}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => setCropper(instance)}
            />
            <div className="flex justify-end mt-4">
              <button onClick={() => setCropImage(null)} className="mr-4">
                Cancel
              </button>
              <button onClick={handleCrop}>Crop</button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLoggingOut}
        onClose={() => setIsLoggingOut(false)}
      />

      {/* Update Profile Modal */}
      <UpdateProfileModal
        isOpen={isUpdateProfileModalOpen}
        onClose={() => setUpdateProfileModalOpen(false)}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
};

export default SettingsPage;
