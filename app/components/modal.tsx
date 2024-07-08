"use client";
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import Confetti from 'react-confetti';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  body: React.ReactNode;
  buttonText: React.ReactNode;
  onButtonClick: () => void;
  modalIcon?: string; // Optional modal icon
  iconColor?: string; // Optional icon color
  zIndex: number;
  buttonDisabled?: boolean;
  confettiAnimation?: boolean; // Optional confetti animation prop
  children?: React.ReactNode;
  startIcon?: React.ReactNode; // Add startIcon prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  body,
  buttonText,
  onButtonClick,
  modalIcon = '',
  iconColor = '#4C28BC',
  zIndex,
  buttonDisabled = false,
  confettiAnimation = false,
  children,
  startIcon, // Add startIcon prop to the destructuring
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (confettiAnimation) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [confettiAnimation]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`} aria-describedby="modal-body" aria-busy={isOpen} style={{ zIndex }}>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div className="relative bg-[#F7F5FF] rounded-lg p-8 w-full max-w-md z-50">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
            <IonIcon icon={closeOutline} className="w-6 h-6" />
          </button>
          <h2 className="md:text-2xl text-xl tracking-tight text-purple1 font-proxima font-bold mb-2 text-left">{header}</h2>
          <hr className="border-gray-300 mb-4" />
          <div id="modal-body" className="font-karla tracking-tight text-black mb-6">{body}</div>
          {modalIcon && (
            <div className="flex justify-center items-center mb-10 mt-10">
              <IonIcon icon={modalIcon} className="text-gray-500 w-20 h-20" style={{ transform: 'scale(1.5)', fontSize: 80, color: iconColor }} />
            </div>
          )}
          <div className="flex justify-center">
            <PrimaryButton
              className={`text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm ${buttonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
              onClick={onButtonClick}
              background={buttonDisabled ? '#d1d5db' : '#4C28BC'}
              hoverBackgroundColor={buttonDisabled ? '#d1d5db' : '#351265'}
              color="#fff"
              hoverColor="#fff"
              style={{ width: '95%', letterSpacing: 0.5 }}
              disabled={buttonDisabled}
              startIcon={startIcon} // Use startIcon prop here
            >
              {buttonText}
            </PrimaryButton>
          </div>
          {showConfetti && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
              />
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Modal;
