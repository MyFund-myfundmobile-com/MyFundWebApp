import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { CircularProgress } from '@mui/material';
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";

interface ModalProps {
  title: string;
  body: string;
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, body, buttonText, isOpen, onClose, onConfirm }) => {

  const handleConfirm = async () => {
    onConfirm();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white rounded-lg p-8 w-full max-w-md z-50">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <IonIcon icon={closeOutline} className="w-6 h-6" />
        </button>
        <h2 className="md:text-2xl text-xl tracking-tight text-purple1 font-proxima font-bold mb-2 text-left">{title}</h2>
        <hr className="border-gray-300 mb-4" />
        <p className="font-karla tracking-tight text-black mb-6">
          {body}
        </p>
        <div className="flex justify-center">
          <PrimaryButton
            className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
            onClick={handleConfirm}
            background="#351265"
            hoverBackgroundColor="#4C28BC"
            borderColor="#351265"
            hoverBorderColor="#4C28BC"
            color="#fff"
            hoverColor="#fff"
            style={{ width: '95%' }}
          >
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
