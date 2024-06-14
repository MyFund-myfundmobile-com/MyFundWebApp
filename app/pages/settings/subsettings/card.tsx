import React from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import { IonIcon } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';

const CardSettings: React.FC = () => {
  const cards: string[] = []; // Replace with actual card data if available

  return (
    <div className="p-4">
      <Title style={{ marginTop: -25 }}>My Cards</Title>
      <div className="bg-purple-100 mt-4  p-4 rounded flex items-center">
        <IonIcon icon={addCircleOutline} className="text-purple-700 text-2xl mr-2" style={{ fontSize: '32px' }}/>
        <Subtitle>Set up your cards so you can perform faster transactions including AutoSave, AutoInvest, Buy Property, etc.</Subtitle>
      </div>
      <Section>LIST OF CARDS</Section>

      <div className="mt-4">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index} className="p-4 border rounded mb-2">
              {/* Display each card information */}
              <p>{card}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No cards added yet</p>
        )}
      </div>

      {/* Add New Card Button */}
      <div className="flex justify-center mt-4">
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
      </div>
    </div>
  );
};

export default CardSettings;
