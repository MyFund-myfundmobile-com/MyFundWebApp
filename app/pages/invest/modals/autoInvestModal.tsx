"use client";
import React, { useState } from 'react';
import { TextField, Select, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { ArrowUpward, Close, CheckCircleOutline, FileCopyOutlined } from '@mui/icons-material';
import Modal from '@/app/components/modal';
import Confetti from 'react-confetti';
import { SelectChangeEvent } from '@mui/material/Select';
import { carSportOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';


interface AutoInvestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AutoInvestModal: React.FC<AutoInvestModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClearAmount = () => {
    setAmount('');
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleFrequencyChange = (event: SelectChangeEvent<string>) => {
    setSelectedFrequency(event.target.value);
  };

  const handleCardChange = (event: SelectChangeEvent<string>) => {
    setSelectedCard(event.target.value);
  };

  const handleSendActivation = () => {
    setIsSending(true);
    // Simulate activation process
    setTimeout(() => {
      setIsSending(false);
      setShowSuccessModal(true);
      setShowConfetti(true); // Activate confetti on success
      setTimeout(() => setShowConfetti(false), 4000); 
      onClose(); // Close modal after success
      // Hide confetti after 3 seconds
    }, 3000); // Adjust as needed for the simulation
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose(); // Ensure the main modal closes as well
  };

  const presetAmounts = [100000, 200000, 300000, 400000, 500000, 1000000];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Activate AutoInvest"
        body={
          <div>
            <p>
              Automatically move funds from your local bank account to your MyFund INVESTMENT account for a <span style={{ color: 'green' }}>20% p.a. ROI</span> every January and July.
            </p>
            <div className="mt-4">
              <TextField
                fullWidth
                variant="outlined"
                className="bg-white"
                label="Enter or Select an amount"
                value={amount}
                onChange={handleAmountChange}
                InputProps={{
                  startAdornment: <span style={{ marginRight: 4 }}>&#8358;</span>,
                  endAdornment: (
                    <IconButton onClick={handleClearAmount}>
                      <Close />
                    </IconButton>
                  ),
                }}
                placeholder="Enter or Select an amount"
              />
              <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
                {presetAmounts.map((preset, index) => (
                  <button
                    key={index}
                    className="bg-[#DCD1FF] text-black rounded-md font-productSans whitespace-nowrap transform active:scale-95 active:bg-purple-600 active:text-white"
                    style={{ height: '50px' }}
                    onClick={() => setAmount(preset.toString())}
                  >
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <Select
                fullWidth
                value={selectedFrequency}
                onChange={handleFrequencyChange}
                displayEmpty
                variant="outlined"
                className="mb-4 bg-white"
                placeholder="Select Frequency"
              >
                <MenuItem value="" disabled>
                  Select Frequency
                </MenuItem>
                <MenuItem value="Hourly">Hourly</MenuItem>
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
              {/* Select Card Section */}
              <Select
                fullWidth
                value={selectedCard}
                onChange={handleCardChange}
                displayEmpty
                variant="outlined"
                className="mb-4 bg-white"
              >
                <MenuItem value="" disabled>
                  No card added yet... Add Card Now!
                </MenuItem>
                <MenuItem value="card1">Card 1</MenuItem>
                <MenuItem value="card2">Card 2</MenuItem>
                <MenuItem value="card3">Card 3</MenuItem>
              </Select>
            </div>
          </div>
        }
        buttonText={
          isSending ? (
            <div className="flex items-center">
              <CircularProgress size={24} className="mr-2" />
              Activating AutoInvest...
            </div>
          ) : (
            <>
              <ArrowUpward className="mr-2" />
              Activate AutoInvest Now!
            </>
          )
        }
        onButtonClick={handleSendActivation}
        buttonDisabled={!amount || !selectedFrequency || !selectedCard}
        zIndex={200}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        header="AutoInvest Activated!"
        body="Your AutoInvest has been successfully activated. Funds will be transferred according to your selected frequency."
        buttonText="OK"
        modalIcon={carSportOutline}
        iconColor="green"
        startIcon={isSending ? <CircularProgress size={20} style={{color: 'green'}} /> : <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
        onButtonClick={handleSuccessModalClose}
        zIndex={200}
        confettiAnimation={true}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
          {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        </div>
      </Modal>
    </>
  );
};

export default AutoInvestModal;
