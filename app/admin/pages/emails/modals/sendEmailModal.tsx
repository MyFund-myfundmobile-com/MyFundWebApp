"use client";

import React, { useState, useEffect } from 'react';
import { Chip, TextField, IconButton, MenuItem, Select, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import Modal from '@/app/components/modal';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (subject: string, recipients: string[]) => void;
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({ isOpen, onClose, onSend }) => {
  const [category, setCategory] = useState('RECIPIENTS');
  const [subject, setSubject] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [recipientInput, setRecipientInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const totalUsers = 825; // Example number of total users

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData('text');
      if (pastedText) {
        const emails = pastedText
          .split(/[\s,;]+/)
          .map(email => email.trim().toLowerCase())
          .filter(email => email && !recipients.includes(email));
        if (emails.length > 0) {
          setRecipients(prevRecipients => [...prevRecipients, ...emails]);
          setRecipientInput('');
        }
      }
    };

    const inputElement = document.getElementById('recipient-input');
    if (inputElement) {
      inputElement.addEventListener('paste', handlePaste);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('paste', handlePaste);
      }
    };
  }, [recipients]);

  const handleRecipientInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientInput(event.target.value);
  };

  const handleRecipientInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ',', ';', ' '].includes(event.key)) {
      event.preventDefault();
      addRecipient();
    }
  };

  const handleRecipientInputBlur = () => {
    if (recipientInput) {
      addRecipient();
    }
  };

  const addRecipient = () => {
    const emails = recipientInput
      .split(/[\s,;]+/)
      .map(email => email.trim().toLowerCase())
      .filter(email => email && !recipients.includes(email));
    if (emails.length > 0) {
      setRecipients([...recipients, ...emails]);
      setRecipientInput('');
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(recipient => recipient !== email));
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      onSend(subject, recipients);
      setIsSending(false);
    }, 2000); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Send To..."
      body={
        <div>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            fullWidth
            variant="outlined"
            className="mb-4 font-proxima"
          >
            <MenuItem className="font-proxima" value="RECIPIENTS">RECIPIENTS</MenuItem>
            <MenuItem className="font-proxima" value="ALL USERS">ALL USERS</MenuItem>
            <MenuItem className="font-proxima" value="CREATE NEW CATEGORY">CREATE NEW CATEGORY...</MenuItem>
          </Select>
          <TextField
            label="Subject"
            fullWidth
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mb-4"
          />
          {category === 'ALL USERS' ? (
            <div style={{alignContent: 'center', alignItems: 'center', marginTop: 15}}>
              <Subtitle style={{alignSelf: 'center'}}>Total number of users selected:</Subtitle>
              <Title style={{fontSize: 115, alignSelf: 'center', marginTop: -5, color: '#BB9CE8'}}>825</Title>
            </div>
          ) : (
            <div className="mt-5">
              <TextField
                id="recipient-input"
                label="To"
                fullWidth
                variant="outlined"
                value={recipientInput}
                onChange={handleRecipientInputChange}
                onKeyDown={handleRecipientInputKeyDown}
                onBlur={handleRecipientInputBlur}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={addRecipient}>
                      <Add />
                    </IconButton>
                  ),
                }}
              />
              <div className="flex flex-wrap mt-2">
                {recipients.map((email, index) => (
                  <Chip
                    key={index}
                    label={email}
                    onDelete={() => removeRecipient(email)}
                    className="m-1"
                  />
                ))}
              </div>
              <div className="text-gray-500 italic mt-2" style={{ fontFamily: 'Karla' }}>
                Separate multiple emails with space, comma, colon or enter.
              </div>
            </div>
          )}
        </div>
      }
      buttonText={
        isSending ? (
          <div className="flex items-center">
            <CircularProgress size={24} className="mr-2" />
            Sending...
          </div>
        ) : (
          "Send Now"
        )
      }
      onButtonClick={handleSend}
      modalIcon=""
      iconColor=""
      zIndex={200}
      buttonDisabled={category !== 'ALL USERS' && recipients.length === 0}
    />
  );
};

export default SendEmailModal;
