import React from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import { Box } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';

const BankSettings: React.FC<{ onNavigate: (menu: string) => void }> = ({ onNavigate }) => {
  const bankAccounts: string[] = []; // Replace with actual bank account data if available

  return (
    <div className="p-4 animate-floatIn ">
      <Box className="flex justify-between items-center mb-4">
        <Box>
          <Title>My Bank Accounts</Title>
          <Subtitle style={{ marginTop: 1, paddingRight: 90 }}>
            For faster withdrawals
          </Subtitle>
        </Box>
        <Box
          className="bg-gray-300 rounded-lg px-4 py-2 font-product-sans uppercase font-bold text-sm cursor-pointer"
          onClick={() => onNavigate("Card and Bank Settings")}
          style={{ letterSpacing: 0.5 }}
        >
          My Cards
        </Box>
      </Box>
      <div className="bg-purple-100 p-4 rounded flex items-center">
        <IonIcon icon={addCircleOutline} className="text-purple-700 text-2xl mr-2" />
        <Subtitle>Set up your bank accounts so you can perform faster withdrawals.</Subtitle>
      </div>
      <Section>LIST OF BANK ACCOUNTS</Section>

      <div className="mt-4">
        {bankAccounts.length > 0 ? (
          bankAccounts.map((account, index) => (
            <div key={index} className="p-4 border rounded mb-2">
              {/* Display each bank account information */}
              <p>{account}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No bank accounts added yet</p>
        )}
      </div>

      {/* Add New Bank Account Button */}
      <div className="flex justify-center mt-4">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={() => console.log("Add New Account Clicked")}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          startIcon={<IonIcon icon={addCircleOutline} style={{ fontSize: '31px', marginRight: 5 }} />}
          style={{ width: '95%', letterSpacing: 0.5 }}
        >
          Add New Account
        </PrimaryButton>
      </div>
    </div>
  );
};

export default BankSettings;
