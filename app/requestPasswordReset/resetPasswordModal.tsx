"use client";
import React, { useState } from 'react';
import { TextField, CircularProgress } from '@mui/material';
import Modal from '@/app/components/modal'; // Ensure the import path is correct
import { IonIcon } from '@ionic/react';
import { lockClosedOutline, mailOutline, checkmarkCircleOutline } from 'ionicons/icons';
import Subtitle from '../components/subtitle';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetPassword: (data: any) => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, onResetPassword }) => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetting, setResetting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleResetPassword = () => {
    setResetting(true);
    // Simulate API call or any asynchronous operation
    setTimeout(() => {
      // Replace with actual reset password logic
      onResetPassword({
        otp,
        password,
        confirmPassword,
      });
      setResetting(false);
      setShowSuccessModal(true);
    }, 1000); // Simulated reset time
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
        header="Reset Password"
        body={
          <>
          <Subtitle style={{ marginBottom: 10}}>Enter the OTP we just sent to your email to complete your password reset.</Subtitle>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
              InputProps={{
                startAdornment: (
                  <IonIcon icon={mailOutline} style={{ fontSize: '20px', marginRight: 10 }} />
                ),
              }}
            />
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
              InputProps={{
                startAdornment: (
                  <IonIcon icon={lockClosedOutline} style={{ fontSize: '20px', marginRight: 10 }} />
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
              InputProps={{
                startAdornment: (
                  <IonIcon icon={lockClosedOutline} style={{ fontSize: '20px', marginRight: 10 }} />
                ),
              }}
            />
          </>
        }
        buttonText={resetting ? "Resetting Password..." : "Reset Password"}
        onButtonClick={handleResetPassword}
        startIcon={resetting ? <CircularProgress size={20} color="inherit" /> : null}
        zIndex={100}
        buttonDisabled={resetting} // Disable button when resetting
      />
      <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        header="Password Reset Successful"
        body={<p>Your password has been successfully reset!</p>}
        buttonText="Close"
        onButtonClick={handleCloseSuccessModal}
        modalIcon={checkmarkCircleOutline} // Add success icon
        iconColor="#4CAF50" // Green color for success
        zIndex={100}
        confettiAnimation={true} // Add confetti animation on success
      />
    </>
  );
};

export default ResetPasswordModal;
