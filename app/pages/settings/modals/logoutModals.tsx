import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import Modal from '@/app/components/modal';
import { logOutOutline } from 'ionicons/icons'; // Import the logout icon

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const [loggingOutButtonText, setLoggingOutButtonText] = useState<React.ReactNode>("Yes, Logout");

  const handleLogoutConfirm = () => {
    setLoggingOutButtonText(
      <div className="flex items-center justify-center">
        <CircularProgress size={20} color="inherit" className="mr-2" />
        LOGGING OUT...
      </div>
    ); // Change button text to "LOGGING OUT..."
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Log Out Confirmation"
      body="Are you sure you want to logout of MyFund?"
      buttonText={loggingOutButtonText}
      onButtonClick={handleLogoutConfirm}
      modalIcon={logOutOutline} // Pass the logout icon as modalIcon prop
      iconColor="#8B4513" // Change the icon color to brown
      zIndex={200}

    />
  );
};

export default LogoutModal;
