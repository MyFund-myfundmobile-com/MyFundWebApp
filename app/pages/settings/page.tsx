import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import { Divider } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { IonIcon } from '@ionic/react';
import { personOutline, callOutline, mailOutline, cashOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import SettingsButtonsSection from './settingsButtons';
import SettingsExtension from './settingsExtension';
import LogoutModal from './modals/logoutModals';
import UpdateSavingsGoalModal from './modals/updateSavingsGoalModal';
import CardSettings from './subsettings/card';
import BankSettings from './subsettings/bank';
import KYCSettings from './subsettings/kyc';

const SettingsPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUpdateSavingsGoalModalOpen, setIsUpdateSavingsGoalModalOpen] = useState(false);
  const [updatedSavingsGoal, setUpdatedSavingsGoal] = useState<string | undefined>(undefined);
  const [tabIndex, setTabIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMenuSelect = (menu: string) => {
    if (menu === "Log Out") {
      setIsLoggingOut(true);
    } else if (menu === "Update Savings Goal") {
      setIsUpdateSavingsGoalModalOpen(true);
    } else {
      setSelectedMenu(menu);
    }
  };

  const handleUpdateSavingsGoal = (preferredAsset: string, amount: number, duration: number) => {
    setIsUpdateSavingsGoalModalOpen(false);
    setUpdatedSavingsGoal(`${(amount / (duration * 12)).toFixed(2)}`);
  };

  const getSelectedComponent = () => {
    switch (selectedMenu) {
      case "Card and Bank Settings":
        return (
          <Box className="border border-gray-300 bg-white rounded-lg p-4 mt-4">
            <Tabs
              value={tabIndex}
              onChange={(e, newIndex) => setTabIndex(newIndex)}
              aria-label="Card and Bank Settings Tabs"
              textColor="primary"
              indicatorColor="primary"
              variant="fullWidth"
              classes={{
                root: 'rounded-full border border-gray-300 bg-gray-100',
                indicator: 'hidden',
              }}
              TabIndicatorProps={{
                children: <span className="MuiTabs-indicatorSpan" />,
              }}
            >
              <Tab
                label="My Cards"
                className={`rounded-full ${
                  tabIndex === 0 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                classes={{
                  root: 'w-1/2',
                }}
              />
              <Tab
                label="My Bank Accounts"
                className={`rounded-full ${
                  tabIndex === 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                classes={{
                  root: 'w-1/2',
                }}
              />
            </Tabs>
            <Box p={3}>
              {tabIndex === 0 && <CardSettings />}
              {tabIndex === 1 && <BankSettings />}
            </Box>
          </Box>
        );
      case "Update KYC":
        return <KYCSettings />;
      default:
        return <SettingsExtension selectedMenu={selectedMenu} updatedSavingsGoal={updatedSavingsGoal} />;
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
            <img src="/images/DrTsquare.png" alt="Profile" className="w-36 h-36 rounded-full border-2 border-purple-400" />
            <div className="absolute bottom-0 right-0 bg-purple1 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Edit className="text-white" />
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
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
              onClick={() => console.log("Update Profile Clicked")}
              background="#4C28BC"
              hoverBackgroundColor="#351265"
              color="#fff"
              hoverColor="#fff"
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
        <div className="md:col-span-2">
          {selectedMenu !== "Log Out" && getSelectedComponent()}
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLoggingOut}
        onClose={() => setIsLoggingOut(false)}
      />

      {/* Update Savings Goal Modal */}
      <UpdateSavingsGoalModal
        isOpen={isUpdateSavingsGoalModalOpen}
        onClose={() => setIsUpdateSavingsGoalModalOpen(false)}
        onUpdate={handleUpdateSavingsGoal}
        firstname="Tolulope"
        setUpdatedSavingsGoal={setUpdatedSavingsGoal}
      />
    </div>
  );
};

export default SettingsPage;
