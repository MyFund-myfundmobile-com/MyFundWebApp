"use client";
import React from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { IonIcon } from '@ionic/react';
import { documentTextOutline } from 'ionicons/icons';
import { Box } from '@mui/material';

const PrivacyAndPolicy: React.FC = () => {
  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white' }}>
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Privacy and Policy</Title>
          <Subtitle style={{ marginTop: -5 }}>Read about our privacy policies.</Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon icon={documentTextOutline} className="text-purple1" style={{ fontSize: '32px' }} />
        </div>
      </div>

      <div className="rounded-lg p-4 mt-4 sm:p-6" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14 }}>
        <p>
          <span className="font-bold text-purple1">Privacy Policy:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel neque non arcu luctus pellentesque...
        </p>
      </div>
    </Box>
  );
};

export default PrivacyAndPolicy;
