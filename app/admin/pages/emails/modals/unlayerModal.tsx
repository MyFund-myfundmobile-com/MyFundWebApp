"use client";

declare global {
    interface Window {
      unlayer: any;
    }
  }
  
  import React, { useEffect, useRef, useState } from 'react';
import Modal from '@/app/components/modal';
import SendEmailModal from './sendEmailModal';  // Import the new SendEmailModal component
import { closeOutline, trashOutline } from 'ionicons/icons';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';

declare global {
  interface Window {
    unlayer: any;
  }
}

interface UnlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void; // Adjusted onSave prop to accept a string parameter
  onSend: () => void;
  title: string;
}

const UnlayerModal: React.FC<UnlayerModalProps> = ({ isOpen, onClose, onSave, onSend, title }) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);  // State for sendEmailModal
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isEditorLoaded) {
      const script = document.createElement('script');
      script.src = 'https://editor.unlayer.com/embed.js';
      script.async = true;
      script.onload = () => setIsEditorLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, isEditorLoaded]);

  useEffect(() => {
    if (isOpen && isEditorLoaded && editorRef.current) {
      const windowHeight = window.innerHeight;
      const editorHeight = windowHeight * 0.8;

      window.unlayer.init({
        appearance: {
          theme: 'dark',
        },
        loader: {
          html: '<div class="custom-spinner"></div>',
          css: '.custom-spinner { color: red; }',
        },
        id: 'editor',
        projectId: 229117,
        displayMode: 'email',
        width: '100%',
        height: `${editorHeight}px`,
        minHeight: '80vh',
      });
    }
  }, [isOpen, isEditorLoaded]);

  const handleConfirmClose = () => {
    setIsConfirmCloseOpen(true); // Open confirmation modal
  };

  const handleCancelClose = () => {
    setIsConfirmCloseOpen(false); // Close confirmation modal
  };

  const handleConfirmCancel = () => {
    setIsConfirmCloseOpen(false);
    onClose();
  };

  const handleSaveDesign = () => {
    onSave(title); // Pass the title prop directly to onSave
    onClose(); // Close the modal
  };

  const handleSendEmail = () => {
    setIsSendEmailModalOpen(true); // Open the send email modal
  };

  const handleSendEmailModalClose = () => {
    setIsSendEmailModalOpen(false);
  };

  const handleSend = (subject: string, recipients: string[]) => {
    // Add logic to send the email
    setIsSendEmailModalOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full h-full"
          style={{ width: '95%', height: '95%' }}
        >
          <div className="flex justify-between items-center p-2 border-b border-gray-200" style={{ paddingBottom: -5, marginBottom: -12 }}>
            <h2 className="md:text-2xl text-xl uppercase tracking-tight text-purple1 font-proxima font-bold text-left ml-5">
              {title}
            </h2>
            <div className="flex items-center space-x-2 mr-3" style={{ marginBottom: -5 }}>
              <PrimaryButton
                className="rounded-lg px-4 py-2 mr-3 font-product-sans uppercase font-bold text-sm"
                onClick={handleSendEmail}  // Trigger sendEmailModal
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                color="#fff"
                hoverColor="#fff"
              >
                Send Email
              </PrimaryButton>
              <PrimaryButton
                className="rounded-lg px-4 py-2 mr-5 font-product-sans uppercase font-bold text-sm"
                onClick={handleSaveDesign} // Call handleSaveDesign when Save button is clicked
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                color="#fff"
                hoverColor="#fff"
                style={{ marginRight: 5 }}
              >
                Save This Design
              </PrimaryButton>
              <button onClick={handleConfirmClose} className="text-gray-500 ml-5 hover:text-gray-700" style={{ marginLeft: 15 }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginBottom: 10 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div id="editor" ref={editorRef} style={{ width: '100%', height: 'calc(100% - 4rem)' }} />
        </div>
      </div>

      <Modal
        isOpen={isConfirmCloseOpen}
        onClose={handleCancelClose}
        header="Confirm Close"
        body="Are you sure you want to close this editor? Any unsaved changes will be lost."
        buttonText="Yes, Close"
        onButtonClick={handleConfirmCancel}
        modalIcon={trashOutline} // Use trashOutline icon
        iconColor="brown"
        zIndex={200} // Ensure a higher z-index than the UnlayerModal
      />

      <SendEmailModal
        isOpen={isSendEmailModalOpen}
        onClose={handleSendEmailModalClose}
        onSend={handleSend}
      />
    </>
  );
};

export default UnlayerModal;
