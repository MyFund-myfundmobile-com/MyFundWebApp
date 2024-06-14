import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import Title from '@/app/components/title';
import CardSettings from './subsettings/card';
import BankSettings from './subsettings/bank';

const SettingsExtension: React.FC<{ selectedMenu: string; updatedSavingsGoal: string | undefined }> = ({
  selectedMenu,
  updatedSavingsGoal,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box className="border border-gray-300 bg-white rounded-lg p-4 mt-4">
      <Title>{selectedMenu}</Title>
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        aria-label="Settings Tabs"
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
      <Box className="flex justify-center mt-4">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={() => console.log("Action Button Clicked")}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          style={{ width: '95%', letterSpacing: 0.5 }}
        >
          ACTION BUTTON
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default SettingsExtension;
