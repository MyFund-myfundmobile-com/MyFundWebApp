"use client";
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { TextField, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { cardOutline, informationCircleOutline } from 'ionicons/icons';
import Modal from '@/app/components/modal';
import BankOptions from '@/app/components/bankOptions';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (card: any) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [bank, setBank] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [pin, setPin] = useState('');
  const [processing, setProcessing] = useState(false);
  const [cvvInfoVisible, setCvvInfoVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBank(null);
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setPin('');
      setCvvInfoVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (cvvInfoVisible) {
      const timer = setTimeout(() => {
        setCvvInfoVisible(false);
      }, 15000); // Hide CVV info after 15 seconds
      return () => clearTimeout(timer);
    }
  }, [cvvInfoVisible]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
      setExpiry(value.slice(0, 2) + '/' + value.slice(2, 4));
    } else {
      setExpiry(value);
    }
  };

  const handleProceed = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onClose(); // Close the AddCardModal
      onSuccess({ 
        bankName: bank?.name || "Default Bank", 
        cardNumber: cardNumber.replace(/\s/g, '').slice(-4),
        expiry,
        bankColor: bank?.color || "#4C28BC" 
      });
    }, 1000); // Simulated processing time
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Add New Card"
      body={
        <>
          <BankOptions value={bank} onChange={(value) => setBank(value)} />
          <TextField
            label="Card Number"
            fullWidth
            className='bg-white'
            variant="outlined"
            value={cardNumber}
            onChange={handleCardNumberChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IonIcon icon={cardOutline} />
                </InputAdornment>
              ),
            }}
            placeholder="1234 5678 9101 1121"
            style={{ marginTop: '16px' }}
          />
          <TextField
            label="Expiry"
            fullWidth
            className='bg-white'
            variant="outlined"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            style={{ marginTop: '16px' }}
          />
          <TextField
            label="CVV"
            fullWidth
            className='bg-white'
            variant="outlined"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setCvvInfoVisible(true)}>
                    <IonIcon icon={informationCircleOutline} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="123"
            style={{ marginTop: '16px' }}
          />
          {cvvInfoVisible && (
            <p style={{ color: 'gray', fontSize: '12px', marginTop: '8px' }}>
              CVV is the 3 or 4-digit number at the back of your debit card. It is NOT your PIN.
            </p>
          )}
          <TextField
            label="PIN"
            fullWidth
            className='bg-white'
            variant="outlined"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            InputProps={{
              type: "password",
            }}
            placeholder="****"
            style={{ marginTop: '16px' }}
          />
        </>
      }
      buttonText={processing ? "Processing..." : "Proceed"}
      onButtonClick={handleProceed}
      startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <IonIcon icon={cardOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
      zIndex={100}
    />
  );
};

export default AddCardModal;
