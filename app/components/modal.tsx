import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { CircularProgress } from '@mui/material';
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  body: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  modalIcon: string; // New prop for the modal icon
  iconColor: string; // New prop for the icon color
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, header, body, buttonText, onButtonClick, modalIcon, iconColor }) => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogoutConfirm = () => {
    setIsLoggingOut(true);
    onButtonClick();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white rounded-lg p-8 w-full max-w-md z-50">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <IonIcon icon={closeOutline} className="w-6 h-6" />
        </button>
        <h2 className="md:text-2xl text-xl tracking-tight text-purple1 font-proxima font-bold mb-2 text-left">{header}</h2>
        <hr className="border-gray-300 mb-4" />
        <div className="font-karla tracking-tight text-black mb-6">{body}</div>
        <div className="flex justify-center items-center mb-4">
          <IonIcon icon={modalIcon} className="text-gray-500 w-12 h-12" style={{ transform: 'scale(1.5)', fontSize: 40, color: iconColor }} />
        </div>
        <div className="flex justify-center">
          {isLoggingOut ? (
            <div className="flex items-center">
              <span className="mr-2">LOGGING OUT...</span>
              <CircularProgress size={20} color="inherit" />
            </div>
          ) : (
            <PrimaryButton
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
              onClick={handleLogoutConfirm}
              background="#4C28BC"
              hoverBackgroundColor="#351265"
              color="#fff"
              hoverColor="#fff"
              style={{ width: '95%', letterSpacing: 0.5 }}
            >
              {buttonText}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
