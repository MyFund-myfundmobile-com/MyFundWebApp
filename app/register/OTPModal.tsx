import React, { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { CircularProgress } from '@mui/material';
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import { useRouter } from 'next/router';
import { NextRouter } from 'next/router'; // Import the NextRouter type

interface OTPModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  router: NextRouter; // Accept router as a prop
}

const OTPModal: React.FC<OTPModalProps> = ({ email, isOpen, onClose, router }) => {
  const [otp, setOTP] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; 

    const newOTP = otp.split('');
    newOTP[index] = value;
    setOTP(newOTP.join(''));

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (index === 5 && value) {
      handleConfirm();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('Text').slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      setOTP(pasteData);
      inputRefs.current[5].focus();
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate OTP verification process
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router.push('/home'); 
    }, 2000);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white rounded-lg p-8 w-full max-w-md z-50">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <IonIcon icon={closeOutline} className="w-6 h-6" />
        </button>
        <h2 className="md:text-2xl text-xl tracking-tight text-purple1 font-proxima font-bold mb-2 text-left">Confirm Signup</h2>
        <hr className="border-gray-300 mb-4" />
        <p className="font-karla tracking-tight text-black mb-6">
          Enter or paste the 6-digit OTP we just sent to <b>{email}</b> to complete your signup
        </p>
        <div className="flex justify-center items-center space-x-2 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={otp[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el: HTMLInputElement | null) => { if (el) inputRefs.current[index] = el; }}
              className="w-12 h-12 text-2xl border border-gray-300 rounded text-center focus:outline-none"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <PrimaryButton
            className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
            onClick={handleConfirm}
            background="#4C28BC"
            hoverBackgroundColor="#351265"
            color="#fff"
            hoverColor="#fff"
            style={{ width: '95%' }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <span>VERIFYING...</span>
                <CircularProgress size={24} color="inherit" className="ml-2" />
              </div>
            ) : (
              <span>CONFIRM</span>
            )}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
