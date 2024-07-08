"use client";
import React from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { IonIcon } from '@ionic/react';
import { trophyOutline } from 'ionicons/icons';
import { Box } from '@mui/material';
import TopSaversSection from '../../home/topSavers';

const topSaversData = [
  { name: 'John Doe', amount: '$5000' },
  { name: 'Jane Smith', amount: '$4500' },
  { name: 'Alice Johnson', amount: '$4000' },
];

const TopSavers: React.FC = () => {
  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white' }}>
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Top Savers</Title>
          <Subtitle style={{ marginTop: -5 }}>See who is saving the most and are close you are to the top!</Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon icon={trophyOutline} className="text-purple1" style={{ fontSize: '32px' }} />
        </div>
      </div>

      <div className="md:col-span-3">
          <TopSaversSection />
        </div>
    </Box>
  );
};

export default TopSavers;
