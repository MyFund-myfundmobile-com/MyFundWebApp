import React from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { IonIcon } from '@ionic/react';
import { starOutline } from 'ionicons/icons';
import { Box, Rating } from '@mui/material';

const RateMyFund: React.FC = () => {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white' }}>
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Rate MyFund</Title>
          <Subtitle style={{ marginTop: -5 }}>We value your feedback!</Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon icon={starOutline} className="text-purple1" style={{ fontSize: '32px' }} />
        </div>
      </div>

      <div className="rounded-lg p-4 mt-4 sm:p-6" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14 }}>
        <p className="mb-4">
          <span className="font-bold text-purple1">Rate Us:</span> Your feedback helps us improve.
        </p>
        <Rating
          name="rate-my-fund"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
    </Box>
  );
};

export default RateMyFund;
