import React, { useState } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { IonIcon } from '@ionic/react';
import { chatbubbleEllipsesOutline, sendOutline, happyOutline } from 'ionicons/icons';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';

const MessageAdmin: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendClick = () => {
    // Handle sending the message
    console.log("Message sent: ", message);
  };

  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white' }}>
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Message Admin</Title>
          <Subtitle style={{ marginTop: -5 }}>Send a message to the administrator.</Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon icon={chatbubbleEllipsesOutline} className="text-purple1" style={{ fontSize: '32px' }} />
        </div>
      </div>

      <div className="rounded-lg p-4 mt-4 sm:p-6 grid grid-cols-[auto,1fr] items-start overflow-hidden" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14, marginBottom: '16px' }}>
        <IonIcon icon={chatbubbleEllipsesOutline} className="text-purple1 mr-4 self-center" style={{ fontSize: '48px' }} />
        <p className="overflow-auto" style={{ wordWrap: 'break-word' }}>
          <span className="font-bold text-purple1">Message Admin:</span> Contact our support team for any assistance or inquiries.
        </p>
      </div>

      <TextField
        label="Message"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          style: { backgroundColor: '#F7F5FF' },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <IonIcon icon={happyOutline} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box className="flex justify-center mt-4">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={handleSendClick}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          startIcon={<IonIcon icon={sendOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
          style={{ width: '95%', letterSpacing: 0.5, marginTop: 5 }}
        >
          SEND MESSAGE
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default MessageAdmin;
