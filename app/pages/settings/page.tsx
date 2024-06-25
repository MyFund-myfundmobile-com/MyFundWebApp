"use client";
import React, { useState, useRef } from 'react';
import { Box, Divider } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { IonIcon } from '@ionic/react';
import { personOutline, callOutline, mailOutline, arrowUpOutline, cashOutline } from 'ionicons/icons';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import SettingsButtonsSection from './settingsButtons';
import LogoutModal from './modals/logoutModals';
import CardSettings from './subsettings/card';
import BankSettings from './subsettings/bank';
import KYCSettings from './subsettings/kyc';
import TransactionPIN from './subsettings/transactonPIN';
import TopSaversSettings from './subsettings/topSavers';
import FAQs from './subsettings/FAQs';
import ReferAndEarnSettings from './subsettings/referAndEarn';
import MessageAdminSettings from './subsettings/messageAdmin';
import RateMyFundSettings from './subsettings/rateMyFund';
import PrivacyAndPolicySettings from './subsettings/privacyAndPolicy';
import SavingsGoal from './subsettings/savingsGoal';
import SettingsExtension from './settingsExtension'; // Ensure this import is added
import UpdateProfileModal from './modals/updateProfileModal';
import Image from 'next/image';


const SettingsPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>("Savings Goal");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUpdateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const handleMenuSelect = (menu: string) => {
    if (menu === "Log Out") {
      setIsLoggingOut(true);
    } else {
      setSelectedMenu(menu);
      if (settingsRef.current && window.innerWidth <= 768) { // Assuming 768px is the mobile breakpoint
        settingsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleUpdateProfileClick = () => {
    setUpdateProfileModalOpen(true);
  };

  const handleUpdateProfile = (data: any) => {
    // Replace with actual update logic
    console.log('Updating profile with:', data);
    // Show success modal or toast message here
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
            <Image src="/images/DrTsquare.png" width={120} height={120} alt="Profile" className="w-36 h-36 rounded-full border-2 border-purple-400" />
            <div className="absolute bottom-0 right-0 bg-purple1 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Edit className="text-white active cursor-pointer" />
            </div>
          </div>
          {/* Name and Email */}
          <div className="ml-4 mt-4 lg:mt-0">
            <Title>Tolulope</Title>
            <Subtitle>tolulopeahmed@gmail.com</Subtitle>
          </div>
        </div>
        
        {/* Vertical Divider */}
        <div className="hidden lg:block h-auto mx-6 border-l border-gray-200"></div>

        {/* User Details */}
        <div className="flex flex-col lg:w-2/3 ml-0 lg:ml-6 mt-4 lg:mt-0">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={personOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">Full Name</p>
                <p className="font-semibold font-proxima text-purple1">Tolulope Ahmed</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={callOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">Mobile Number</p>
                <p className="font-semibold font-proxima text-purple1">+2348033924595</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={mailOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">Email/Username</p>
                <p className="font-semibold font-proxima text-purple1">tolulopeahmed@gmail.com</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={cashOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">Financial Level</p>
                <p className="font-semibold font-proxima text-purple1">Level 3: SURPLUS</p>
              </div>
            </div>
          </div>
          {/* Update Profile Button */}
          <div className="flex justify-center mt-4">
            <PrimaryButton
              onClick={handleUpdateProfileClick}
              startIcon={<IonIcon icon={arrowUpOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
              background="#fff"
              hoverBackgroundColor="#DCD1FF"
              color="#4C28BC"
              hoverColor="#4C28BC"
              style={{ width: '95%', letterSpacing: 0.5 }}
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
