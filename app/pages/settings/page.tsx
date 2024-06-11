import React, { useState } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import { IoIosCreate } from 'react-icons/io';
import { Divider } from '@mui/material';
import SettingsButtonsSection from './settingsButtons';
import SettingsExtension from './settingsExtension';
import Modal from '@/app/components/modal';
import { logOutOutline } from 'ionicons/icons'; // Import the logout icon

const SettingsPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("SELECT A SETTING");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loggingOutButtonText, setLoggingOutButtonText] = useState("Yes, Logout");

  const handleMenuSelect = (menu: string) => {
    if (menu === "Log Out") {
      setIsLoggingOut(true); // Trigger the logout modal
    } else {
      setSelectedMenu(menu);
    }
  };

  const handleLogoutConfirm = () => {
    setIsLoggingOut(true);
    setLoggingOutButtonText("Logging out...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="px-6 max-w-full animate-floatIn">
      {/* PROFILE SECTION */}
      <Section>PROFILE</Section>
      <div className="flex items-start mb-4 mt-5">
        {/* Profile Image */}
        <div className="relative">
          <img src="/images/DrTsquare.png" alt="Profile" className="w-36 h-36 rounded-full border-2 border-purple-400" />
          <div className="absolute bottom-0 right-0 bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
            <IoIosCreate className="text-white" />
          </div>
        </div>
        {/* Name and Email */}
        <div className="ml-4">
          <Title>Tolulope</Title>
          <Subtitle>tolulopeahmed@gmail.com</Subtitle>
        </div>
        {/* Update Profile Button and Details */}
        <div className="ml-auto flex flex-col items-end">
          <button className="bg-purple-500 text-white rounded-md px-4 py-2 flex items-center mb-2">
            <IoIosCreate className="mr-2" />
            UPDATE PROFILE
          </button>
          <div>
            <p className="font-semibold text-gray-600">Full Name: Tolulope Ahmed</p>
            <p className="font-semibold text-gray-600">Mobile Number: +2348033924595</p>
            <p className="font-semibold text-gray-600">Email/Username: tolulopeahmed@gmail.com</p>
            <p className="font-semibold text-gray-600">Financial Level: Level 3: SURPLUS</p>
          </div>
        </div>
      </div>
      <Divider className="my-4 bg-gray-100" />

      {/* SETTINGS SECTION */}
      <Section>SETTINGS</Section>
      <div className="flex">
        <div className="w-1/4">
          <SettingsButtonsSection onMenuSelect={handleMenuSelect} />
        </div>
        <div className="flex-1 ml-4">
          {selectedMenu !== "Log Out" && <SettingsExtension selectedMenu={selectedMenu} />}
        </div>
      </div>

      {/* Logout Modal */}
      <Modal
        isOpen={isLoggingOut}
        onClose={() => setIsLoggingOut(false)}
        header="Logout Confirmation"
        body="Are you sure you want to logout?"
        buttonText={loggingOutButtonText}
        onButtonClick={handleLogoutConfirm}
        modalIcon={logOutOutline} // Pass the logout icon as modalIcon prop
        iconColor="#8B4513" // Change the icon color to brown
      />
    </div>
  );
};

export default SettingsPage;
