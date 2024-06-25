"use client";
import React, { useState } from 'react';
import { TextField, CircularProgress } from '@mui/material';
import Modal from '@/app/components/modal'; // Make sure the import path is correct
import { IonIcon } from '@ionic/react';
import { arrowUpOutline } from 'ionicons/icons';

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ isOpen, onClose, onUpdate }) => {
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [updating, setUpdating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUpdateProfile = () => {
    setUpdating(true);
    // Simulate API call or any asynchronous operation
    setTimeout(() => {
      // Replace with actual update logic
      onUpdate({
        fullName,
        lastName,
        phoneNumber,
      });
      setUpdating(false);
      setShowSuccessModal(true);
    }, 1000); // Simulated update time
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Edit Profile"
        body={
          <>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value="tolulopeahmed@gmail.com" // Assuming this is displayed and not editable
              disabled
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
            />
          </>
        }
        buttonText={updating ? "Updating Profile..." : "Update"}
        onButtonClick={handleUpdateProfile}
        startIcon={updating ? <CircularProgress size={20} color="inherit" /> : <IonIcon icon={arrowUpOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
        zIndex={100}
        confettiAnimation={true} // Optional: Add confetti animation on success
      />
      <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        header="Profile Updated"
        body={<p>Your profile has been successfully updated!</p>}
        buttonText="Close"
        onButtonClick={handleCloseSuccessModal}
        zIndex={100}
      />
    </>
  );
};

export default UpdateProfileModal;
