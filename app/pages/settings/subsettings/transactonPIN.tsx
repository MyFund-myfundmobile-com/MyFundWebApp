"use client";
import React, { useState, useRef, useEffect } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { IonIcon } from '@ionic/react';
import { lockClosedOutline, backspaceOutline } from 'ionicons/icons';
import { Box, TextField, Grid, IconButton } from '@mui/material';

const TransactionPIN: React.FC = () => {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Focus on the first input field initially
  }, []);

  const handlePinChange = (index: number, value: string) => {
    if (value.match(/^\d*$/)) { // Only allow digits
      const newPin = [...pin];
      newPin[index] = value.slice(-1); // Allow only one digit per space
      setPin(newPin);

      // Move cursor to the previous input field if backspace is pressed
      if (value === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (index < 3 && value.length === 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number) => {
    if (index >= 0) {
      const newPin = [...pin];
      newPin[index] = '';
      setPin(newPin);
      inputRefs.current[index]?.focus();
    } else {
      // Clear all fields when backspace is pressed on empty input
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleDelete = () => {
    // Clear all fields starting from the last one
    setPin(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>, index: number) => {
    if (event.key === 'Backspace') {
      event.preventDefault(); // Prevent default behavior (e.g., navigation)
      handleBackspace(index - 1); // Handle backspace for the previous input
    } else if (event.key === 'Delete') {
      event.preventDefault(); // Prevent default behavior (e.g., navigation)
      handleDelete(); // Handle delete button press
    }
  };

  return (
    <Box className="px-6 animate-floatIn max-w-full" style={{ padding: '36px', borderRadius: '8px', backgroundColor: '#fff' }}>
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>My PIN</Title>
          <Subtitle style={{ marginTop: -5 }}>Create your PIN to perform faster and secure transactions on MyFund</Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon icon={lockClosedOutline} className="text-purple1" style={{ fontSize: '32px' }} />
        </div>
      </div>
      
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '19px' }}>
        {pin.map((digit, index) => (
          <Grid item key={index}>
            <TextField
              inputRef={el => inputRefs.current[index] = el}
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              variant="outlined"
              type="password"
              inputProps={{ maxLength: 1 }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                width: '100px',
                height: '200%', // Adjust height as needed
                fontSize: '90px', // Increase font size for larger '*'
                textAlign: 'center',
                borderRadius: '10px',
                backgroundColor: '#F7F5FF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            />
          </Grid>
        ))}
        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleBackspace(pin.findIndex(d => d !== '') - 1)} style={{ fontSize: '34px', marginLeft: '10px' }}>
            <IonIcon icon={backspaceOutline} style={{ fontSize: 33 }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionPIN;


