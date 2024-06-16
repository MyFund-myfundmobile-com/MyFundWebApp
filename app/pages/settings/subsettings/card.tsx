import React from 'react';
import { Box } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { addCircleOutline, cardOutline } from 'ionicons/icons';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';

const CardSettings: React.FC<{ onNavigate: (menu: string) => void }> = ({ onNavigate }) => {
  const cards: string[] = []; // Replace with actual card data if available

  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white', position: 'relative' }}>
      <Box className="flex justify-between items-center mb-4">
        <Box>
          <Title style={{ marginTop: -25 }}>My Cards</Title>
          <Subtitle style={{ marginTop: 1, paddingRight: 90 }}>
            For faster transactions
          </Subtitle>
        </Box>
        <Box
          className="bg-gray-300 rounded-lg px-4 py-2 font-product-sans uppercase font-bold text-sm cursor-pointer"
          onClick={() => onNavigate("Bank Settings")}
          style={{ letterSpacing: 0.5 }}
        >
          My Bank Accounts
        </Box>
      </Box>
      <div className="rounded-lg p-4 mt-4 sm:p-6 grid grid-cols-[auto,1fr] items-start overflow-hidden" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14, marginBottom: '16px' }}>
        <IonIcon icon={cardOutline} className="text-green-500 text-purple1 mr-4 self-center" style={{ fontSize: '48px' }} />
        <p className="overflow-auto" style={{ wordWrap: 'break-word' }}>
          Set up your cards so you can perform faster transactions including AutoSave, AutoInvest, Buy Property, etc.
        </p>
      </div>
      <Section>LIST OF CARDS</Section>
      <Box className="mt-4">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Box key={index} className="p-4 border rounded mb-2">
              {/* Display each card information */}
              <p>{card}</p>
            </Box>
          ))
        ) : (
          <p className="text-gray-500 font-karla" style={{ marginTop: 65, marginBottom: 65, alignSelf: 'center', alignContent: 'center' }}>No cards added yet</p>
        )}
      </Box>
      <Box className="flex justify-center mt-4">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={() => console.log("Add New Card Clicked")}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          startIcon={<IonIcon icon={addCircleOutline} style={{ fontSize: '31px', marginRight: 5 }} />}
          style={{ width: '95%', letterSpacing: 0.5 }}
        >
          Add New Card
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default CardSettings;
