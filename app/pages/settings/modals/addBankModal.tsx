"use client";
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { TextField, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import Modal from '@/app/components/modal';
import BankOptions from '@/app/components/bankOptions';
import { briefcaseOutline } from 'ionicons/icons';

interface AddBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bankAccount: any) => void;
}

const AddBankModal: React.FC<AddBankModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [bank, setBank] = useState<any>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBank(null);
      setAccountNumber('');
    }
  }, [isOpen]);

  const handleProceed = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onClose();
      onSuccess({
        name: "NAME SURNAME",
        bankName: bank?.name || "Default Bank",
        accountNumber,
        bankColor: bank?.color || "#4C28BC", 
      });
    }, 1000); // Simulated processing time
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Add Bank Account"
      body={
        <>
          <BankOptions value={bank} onChange={(value) => setBank(value)}/>
          <TextField
            label="Bank Account Number"
            fullWidth
            className='bg-white'
            variant="outlined"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IonIcon icon={briefcaseOutline} />
                </InputAdornment>
              ),
            }}
            placeholder="1234567890"
            style={{ marginTop: '16px' }}
          />
          <TextField
            label="Account Name"
            fullWidth
            className='bg-white'
            variant="outlined"
            value={accountNumber ? "NAME SURNAME" : ""}
            disabled
            InputProps={{
              style: { color: 'green' }
            }}
            style={{ marginTop: '16px' }}
          />
          <p className="font-karla text-gray-500 mt-2">This bank account can only be used by you to receive money.</p>
        </>
      }
      buttonText={processing ? "Processing..." : "Add Bank Account"}
      onButtonClick={handleProceed}
      startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <IonIcon icon={briefcaseOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
      zIndex={100}
    />
  );
};

export default AddBankModal;
