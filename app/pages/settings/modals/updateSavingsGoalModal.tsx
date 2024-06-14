import React, { useState } from 'react';
import { TextField, Select, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { ArrowUpward, Close } from '@mui/icons-material';
import Modal from '@/app/components/modal';
import { checkmarkCircleOutline } from 'ionicons/icons';
import Confetti from 'react-confetti';

interface UpdateSavingsGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (preferredAsset: string, amount: number, duration: number) => void;
  firstname: string;
  setUpdatedSavingsGoal: (message: string) => void; // Add this prop
}

const UpdateSavingsGoalModal: React.FC<UpdateSavingsGoalModalProps> = ({ isOpen, onClose, onUpdate, firstname, setUpdatedSavingsGoal }) => {
  const [preferredAsset, setPreferredAsset] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [successMessage, setSuccessMessage] = useState(''); // Message to display in success modal
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display

  
  const formatAmount = (value: string) => {
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    return value.replace(regex, ',');
  };

  const handleUpdate = () => {
    const amountNum = parseFloat(amount.replace(/,/g, ''));
    if (amountNum < 1000000) {
      setAlertMessage('Invalid Amount: The minimum amount is ₦1,000,000. Please try again and enter a valid amount.');
      return;
    }

    setIsUpdating(true);
    setTimeout(() => {
      onUpdate(preferredAsset, amountNum, parseInt(duration));
      setIsUpdating(false);
      const durationNum = parseInt(duration);
      const savingsPerMonth = (amountNum / (durationNum * 12)).toFixed(2);
      const savingsGoalMessage = `You should be saving ₦${savingsPerMonth} per month to reach ₦${amountNum} for your ${preferredAsset} investment in ${duration} ${durationNum > 1 ? 'years' : 'year'}. Keep saving to reach your goal.`;
      setSuccessMessage(savingsGoalMessage);
      setShowSuccessModal(true);
      setShowConfetti(true); // Activate confetti on success
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds

      // Pass the success message to SettingsExtension
      setUpdatedSavingsGoal(savingsGoalMessage);
    }, 2000);
  };

  const handleClearAmount = () => {
    setAmount('');
    setAlertMessage('');
  };

  const presetAmounts = [1000000, 2000000, 5000000, 10000000, 15000000, 30000000];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Update Savings Goal"
        body={
          <div>
            <p>Hey <span className='text-purple1 font-proxima' style={{ fontSize: 16 }}>{firstname}</span>,</p>
            <p>As part of helping you grow your funds to own properties and develop your savings habit, you will need to set a savings goal.</p>
            <div className="mt-4">
              <Select
                fullWidth
                value={preferredAsset}
                onChange={(e) => setPreferredAsset(e.target.value)}
                displayEmpty
                variant="outlined"
                className="mb-4 bg-white"
              >
                <MenuItem value="" disabled>Preferred Asset</MenuItem>
                <MenuItem value="Real Estate (MyFund Hostels)">Real Estate (MyFund Hostels)</MenuItem>
                <MenuItem value="Paper Assets">Paper Assets</MenuItem>
                <MenuItem value="MyFund Hotels">MyFund Hotels</MenuItem>
              </Select>
              <div className="relative mb-4 bg-white">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="How much are you planning to save for it?"
                  value={amount}
                  onChange={(e) => setAmount(formatAmount(e.target.value))}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 4 }}>&#8358;</span>,
                    endAdornment: (
                      <IconButton onClick={handleClearAmount}>
                        <Close />
                      </IconButton>
                    )
                  }}
                  placeholder="Minimum savings goal is ₦1,000,000."
                />
              </div>
              {alertMessage && <p className="text-red-500">{alertMessage}</p>}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    className="bg-[#DCD1FF] text-black rounded-md font-productSans whitespace-nowrap transform active:scale-95 active:bg-purple-600 active:text-white"
                    style={{ height: '50px' }}
                    onMouseDown={(e) => e.currentTarget.classList.add('active')}
                    onMouseUp={(e) => e.currentTarget.classList.remove('active')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('active')}
                    onClick={() => setAmount(formatAmount(preset.toString()))}
                  >
                    {formatAmount(preset.toLocaleString())}
                  </button>
                ))}
              </div>
              <Select
                fullWidth
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                displayEmpty
                variant="outlined"
                className="mb-4 bg-white"
              >
                <MenuItem value="" disabled>How long will it take you?</MenuItem>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year} {year > 1 ? 'years' : 'year'}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        }
        buttonText={
          isUpdating ? (
            <div className="flex items-center">
              <CircularProgress size={24} className="mr-2" />
              Updating Savings Goal...
            </div>
          ) : (
            <>
              <ArrowUpward className="mr-2" />
              Update Savings Goal
            </>
          )
        }
        onButtonClick={handleUpdate}
        zIndex={200}
        buttonDisabled={!preferredAsset || !amount || !duration}
        confettiAnimation={true} // You can toggle confetti animation here if needed
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Savings Goal Updated!"
        body={successMessage}
        buttonText="OK"
        onButtonClick={() => setShowSuccessModal(false)}
        modalIcon={checkmarkCircleOutline} // Use checkmark icon if needed
        iconColor="green"
        zIndex={200}
        confettiAnimation={true} // Add confetti animation prop if needed
      >
        {showConfetti && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default UpdateSavingsGoalModal;
