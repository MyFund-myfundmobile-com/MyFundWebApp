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
import { PrimaryButton } from "@/components/Buttons/MainButtons";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Section from "@/components/section";
import SettingsButtonsSection from "@/components/app/settingsButtons";
import LogoutModal from "@/components/app/modals/logoutModals";
import CardSettings from "@/components/app/subsettings/card";
import BankSettings from "@/components/app/subsettings/bank";
import KYCSettings from "@/components/app/subsettings/kyc";
import TransactionPIN from "@/components/app/subsettings/transactonPIN";
import TopSaversSettings from "@/components/app/subsettings/topSavers";
import FAQs from "@/components/app/subsettings/FAQs";
import ReferAndEarnSettings from "@/components/app/subsettings/referAndEarn";
import MessageAdminSettings from "@/components/app/subsettings/messageAdmin";
import RateMyFundSettings from "@/components/app/subsettings/rateMyFund";
import PrivacyAndPolicySettings from "@/components/app/subsettings/privacyAndPolicy";
import SavingsGoal from "@/components/app/subsettings/savingsGoal";
import SettingsExtension from "@/components/app/settingsExtension"; // Ensure this import is added
import UpdateProfileModal from "@/components/app/modals/updateProfileModal";
import Image from "next/image";
import "cropperjs/dist/cropper.css"; // Import cropper CSS
import Cropper, { ReactCropperElement } from "react-cropper"; // Ensure this import

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Redux store/store";
import { fetchUserInfo, updateWealthStage } from "@/Redux store/actions";

import axios from "axios";
import CustomSnackbar from "@/components/snackbar";
import { useSearchParams } from "next/navigation";

const SettingsPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(
    "Savings Goal"
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUpdateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [profileImage, setProfileImage] = useState(
    userInfo?.profile_picture || "/images/Profile1.png"
  );
  const [cropImage, setCropImage] = useState<string | null>(null); // Add state for crop image
  const settingsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Add ref for file input
  const [uploading, setUploading] = useState(false); // Add state for uploading
  const [loading, setLoading] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false); // State to control file input visibility
  const searchParams = useSearchParams();
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  useEffect(() => {
    const triggerCardAndBankSettings = searchParams.get(
      "triggerCardAndBankSettings"
    );
    const triggerAddCard = searchParams.get("triggerAddCard");

    console.log(triggerCardAndBankSettings, triggerAddCard, "here!!!");
    if (triggerCardAndBankSettings) {
      handleMenuSelect("Card and Bank Settings"); // Adjust according to your menu structure
    }
    if (triggerAddCard) {
      setIsAddCardModalOpen(true);
    }
  }, [searchParams]);

  const [cropper, setCropper] = useState<Cropper | null>(null);

  const handleCropperRef = (c: ReactCropperElement | null) => {
    if (c) {
      setCropper(c.cropper); // Set the Cropper instance
    } else {
      setCropper(null);
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token || "");
  const currentWealthStage = useSelector(
    (state: RootState) => state.auth.currentWealthStage
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }

    if (userInfo?.profile_picture) {
      setProfileImage(userInfo.profile_picture);
    }
  }, [token, dispatch, userInfo]);

  // Fetch the current wealth stage and dispatch it only once when the component mounts
  useEffect(() => {
    if (currentWealthStage) {
      dispatch(updateWealthStage(currentWealthStage));
    }
  }, [dispatch, currentWealthStage]);

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

  useEffect(() => {
    const triggerKYC = searchParams.get("triggerKYC");
    if (triggerKYC) {
      handleMenuSelect("Update KYC");
    }
  }, [searchParams]);

  // Handler to trigger file input click
  const handleProfileImageClick = () => {
    setLoading(true); // Set loading to true when edit icon is clicked

    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
      setShowFileInput(true); // Show file input after loading
    }, 3000); // 3 seconds delay

    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  const handleUpdateProfileClick = () => {
    setUpdateProfileModalOpen(true);
  };

  // Update profile image URL upon successful upload
  const handleCrop = async () => {
    if (cropper) {
      try {
        const canvas = cropper.getCroppedCanvas();
        const croppedImage = canvas.toDataURL();

        const dataURLtoBlob = (dataurl: string) => {
          const arr = dataurl.split(",");
          const mimeMatch = arr[0].match(/:(.*?);/);
          const mime = mimeMatch ? mimeMatch[1] : "";
          const bstr = atob(arr[1]);
          const n = bstr.length;
          const u8arr = new Uint8Array(n);
          for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
          }
          return new Blob([u8arr], { type: mime });
        };

        const formData = new FormData();
        formData.append(
          "profile_picture",
          dataURLtoBlob(croppedImage),
          "profile_picture.jpg"
        );

        setUploading(true);

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile-picture-update/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setProfileImage(response.data.updatedProfileImageUrl); // Ensure your API returns the updated image URL
          dispatch(fetchUserInfo(token));
          setSnackbarMessage("Profile picture updated successfully!");
          setSnackbarSeverity("success");
        } else {
          setSnackbarMessage(
            response.data.message || "Error updating profile picture."
          );
          setSnackbarSeverity("error");
        }
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage("An error occurred while updating profile picture.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setCropImage(null);
        setUploading(false);
      }
    } else {
      console.error("Cropper instance not available");
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
      case "Refer and Earn: N500 EACH":
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
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <div className="relative">
              <div className="w-36 h-36 relative aspect-w-1 aspect-h-1">
                <Image
                  src={`/images/Profile1.png`}
                  alt="Profile"
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "2px solid #6b46c1",
                  }}
                  className="w-full h-full"
                  width={100}
                  height={100}
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-purple1 text-white rounded-full w-10 h-10 flex items-center justify-center">
                {loading ? (
                  <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                ) : (
                  <Edit
                    className="text-white active cursor-pointer"
                    onClick={handleProfileImageClick}
                  />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(event) => {
                    handleProfileImageChange(event);
                  }}
                />
              </div>
            </div>

            <div className="mt-4 lg:mt-0 lg:ml-4 flex flex-col items-center lg:items-start">
              <Title
                className="text-center lg:text-left"
                style={{ marginRight: 10 }}
              >
                {userInfo?.firstName}
              </Title>
              <Subtitle
                className="text-center lg:text-left text-xs"
                style={{ fontSize: 12, marginRight: 10 }}
              >
                {userInfo?.email}
              </Subtitle>
            </div>
          </div>
        </div>

        <div className="hidden lg:block h-auto mx-6 border-l border-gray-200"></div>

        {/* User Details */}
        <div className="flex flex-col lg:w-2/3 ml-0 lg:ml-6 mt-4 lg:mt-0">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-left">
              <IonIcon
                icon={personOutline}
                className="mr-2 text-gray-600"
              />
              <div>
                <p
                  className="text-sm italic font-karla text-gray-600"
                  style={{ fontSize: 12 }}
                >
                  Full Name
                </p>
                <p className="font-semibold font-proxima text-purple1">
                  {userInfo?.firstName} {userInfo?.lastName}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-left">
              <IonIcon
                icon={callOutline}
                className="mr-2 text-gray-600"
              />
              <div>
                <p
                  className="text-sm italic font-karla text-gray-600"
                  style={{ fontSize: 12 }}
                >
                  Mobile Number
                </p>
                <p className="font-semibold font-proxima text-purple1">
                  {userInfo?.mobileNumber}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-left">
              <IonIcon
                icon={mailOutline}
                className="mr-2 text-gray-600"
              />
              <div>
                <p
                  className="text-sm italic font-karla text-gray-600"
                  style={{ fontSize: 12 }}
                >
                  Email/Username
                </p>
                <p className="font-semibold font-proxima text-purple1">
                  {userInfo?.email}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-left">
              <IonIcon
                icon={cashOutline}
                className="mr-2 text-gray-600"
              />
              <div>
                <p
                  className="text-sm italic font-karla text-gray-600"
                  style={{ fontSize: 12 }}
                >
                  Financial Level
                </p>
                <p
                  className={`font-semibold font-proxima ${
                    currentWealthStage?.stage === 1
                      ? "text-[#BF0000]"
                      : currentWealthStage?.stage === 2
                      ? "text-[#BF3F00]"
                      : currentWealthStage?.stage === 3
                      ? "text-[#BF7F00]"
                      : currentWealthStage?.stage === 4
                      ? "text-[#BF9F00]"
                      : currentWealthStage?.stage === 5
                      ? "text-[#BFBF00]"
                      : currentWealthStage?.stage === 6
                      ? "text-[#9FBF00]"
                      : currentWealthStage?.stage === 7
                      ? "text-[#6FBF00]"
                      : currentWealthStage?.stage === 8
                      ? "text-[#3FBF00]"
                      : currentWealthStage?.stage === 9
                      ? "text-[#005F00]"
                      : "text-black" // Default color if stage is unknown
                  }`}
                >
                  Level {currentWealthStage?.stage}:{" "}
                  {currentWealthStage?.text.toUpperCase() || "UNKNOWN"}
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
          <SettingsButtonsSection
            onMenuSelect={handleMenuSelect}
            selectedButton={selectedMenu}
          />
        </div>
        <div
          className="md:col-span-2"
          ref={settingsRef}
        >
          {selectedMenu !== "Log Out" && selectedMenu !== null && (
            <SettingsExtension selectedMenu={selectedMenu}>
              {getSelectedComponent()}
            </SettingsExtension>
          )}
        </div>
      </div>

      {/* Crop Image Modal */}
      {cropImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <Cropper
              src={cropImage || `/images/Profile1.png`}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              guides={false}
              ref={handleCropperRef} // Updated ref
            />

            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                onClick={handleCrop}
                disabled={uploading} // Disable button during upload
              >
                {uploading ? (
                  <>
                    <span>Uploading Image</span>
                    <div className="ml-2 border-t-2 border-white border-solid w-4 h-4 rounded-full animate-spin"></div>
                  </>
                ) : (
                  "Crop & Save"
                )}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setCropImage(null)}
              >
                Cancel
              </button>
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
      />

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default SettingsPage;
