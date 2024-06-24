import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, IconButton, CircularProgress, InputLabel } from '@mui/material';
import { ArrowUpward, Close, CheckCircleOutline, FileCopyOutlined } from '@mui/icons-material';
import Modal from '@/app/components/modal';
import Confetti from 'react-confetti';
import { SelectChangeEvent } from '@mui/material/Select';
import { IonIcon } from '@ionic/react';
import { arrowDownOutline, checkmarkCircleOutline } from 'ionicons/icons';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultWithdrawFrom: string;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, defaultWithdrawFrom }) => {
  const [amount, setAmount] = useState<string>("");
  const [withdrawFrom, setWithdrawFrom] = useState<string>(defaultWithdrawFrom);
  const [withdrawTo, setWithdrawTo] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    setWithdrawFrom(defaultWithdrawFrom);
  }, [defaultWithdrawFrom]);

  const handleClearAmount = () => {
    setAmount('');
  };

  const formatAmount = (value: string) => {
    const cleanedValue = value.replace(/[^0-9]/g, ''); // Remove non-digit characters
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Format with commas
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatAmount(event.target.value));
  };

  const handleWithdraw = () => {
    setIsSending(true);
    // Simulate withdraw process
    setTimeout(() => {
      setIsSending(false);
      setShowSuccessModal(true);
      setShowConfetti(true); // Activate confetti on success
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
      onClose(); // Close modal after success
    }, 3000); // Adjust as needed for the simulation
  };

  const handleWithdrawFromChange = (event: SelectChangeEvent<string>) => {
    setWithdrawFrom(event.target.value);
    setWithdrawTo(''); // Reset withdrawTo when withdrawFrom changes
    setUserEmail(''); // Reset user email when withdrawFrom changes
  };

  const handleWithdrawToChange = (event: SelectChangeEvent<string>) => {
    setWithdrawTo(event.target.value);
  };

  const getWithdrawToOptions = () => {
    switch (withdrawFrom) {
      case 'Savings':
        return (
          <>
            <MenuItem value="Investment">Investment</MenuItem>
            <MenuItem value="Bank Account">Bank Account2</MenuItem>
          </>
        );
      case 'Investment':
        return <MenuItem value="Bank Account">Bank Account2</MenuItem>;
      case 'Wallet':
        return (
          <>
            <MenuItem value="Savings">Savings</MenuItem>
            <MenuItem value="Investment">Investment</MenuItem>
            <MenuItem value="Bank Account">Bank Account</MenuItem>
            <MenuItem value="Another User">Another User</MenuItem>
          </>
        );
      default:
        return null;
    }
  };

  const presetAmounts = [5000, 10000, 15000, 20000, 40000, 100000];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Withdraw"
        body={
          <div>
            <p>Move money from Savings to Investment or to your bank.</p><br/>

            <p>
              Immediate Withdrawal to <span style={{ color: 'green', fontWeight: 'bold' }}>Bank Account</span> attracts...
              <ul>
                <li><span style={{ color: 'brown', fontWeight: 'bold' }}>10%</span> charge if from <span style={{ color: '#4C28BC', fontWeight: 'bold' }}>SAVINGS</span></li>
                <li><span style={{ color: 'brown', fontWeight: 'bold' }}>15%</span> charge if from <span style={{ color: '#4C28BC', fontWeight: 'bold' }}>INVESTMENT</span></li>
                <li><span style={{ color: 'green', fontWeight: 'bold' }}>0%</span> charge if from <span style={{ color: '#4C28BC', fontWeight: 'bold' }}>WALLET</span></li>
              </ul>
              <br/>

              To schedule a withdrawal without charges, message admin with the withdrawal request.
            </p>
            <br/>
            <Select
              fullWidth
              value={withdrawFrom}
              onChange={handleWithdrawFromChange}
              displayEmpty
              variant="outlined"
              className="mb-4 bg-white"
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled>
                Withdraw from...
              </MenuItem>
              <MenuItem value="Savings">Savings (N30,546)</MenuItem>
              <MenuItem value="Investment">Investment (N4,370,000)</MenuItem>
              <MenuItem value="Wallet">Wallet (N199,000)</MenuItem>
            </Select>

            {withdrawFrom && (
              <Select
                fullWidth
                value={withdrawTo}
                onChange={handleWithdrawToChange}
                displayEmpty
                variant="outlined"
                className="mb-4 bg-white"
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>
                  Withdraw to...
                </MenuItem>
                {getWithdrawToOptions()}
              </Select>
            )}

            {withdrawTo === 'Bank Account' && (
              <Select
                fullWidth
                variant="outlined"
                displayEmpty
                className="mb-4 bg-white"
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>
                  Select Bank Account...
                </MenuItem>
                {/* Replace with actual list of saved bank accounts */}
                <MenuItem value="bank1">Bank 1 - 123456789</MenuItem>
                <MenuItem value="bank2">Bank 2 - 987654321</MenuItem>
                <MenuItem value="no_bank">
                  No bank accounts added yet... Add Bank Account Now
                </MenuItem>
              </Select>
            )}

            {withdrawTo === 'Another User' && (
              <TextField
                fullWidth
                variant="outlined"
                className='bg-white mb-4'
                label="Enter User's Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter User's email"
              />
            )}

            <TextField
              fullWidth
              variant="outlined"
              className='bg-white'
              label="Amount"
              value={amount}
              onChange={handleAmountChange}
              InputProps={{
                startAdornment: <span style={{ marginRight: 4 }}>&#8358;</span>,
                endAdornment: (
                  <IconButton onClick={handleClearAmount}>
                    <Close />
                  </IconButton>
                )
              }}
              placeholder={
                withdrawFrom === 'Savings' && withdrawTo === 'Investment'
                  ? "Minimum amount is N100,000"
                  : "e.g. N20,000"
              }
            />

            <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
              {presetAmounts.map((preset, index) => (
                <button
                  key={index}
                  className="bg-[#DCD1FF] text-black rounded-md font-productSans whitespace-nowrap transform active:scale-95 active:bg-purple-600 active:text-white"
                  style={{ height: '50px' }}
                  onClick={() => setAmount(formatAmount(preset.toString()))}
                >
                  {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        }
        buttonText={
          isSending ? (
            <div className="flex items-center">
              <CircularProgress size={24} className="mr-2" />
              Processing Withdrawal...
            </div>
          ) : (
            <>
              <IonIcon icon={arrowDownOutline} className="mr-2" />
              Withdraw Now
            </>
          )
        }
        onButtonClick={handleWithdraw}
        buttonDisabled={!withdrawFrom || !withdrawTo || !amount}
        zIndex={200}
        modalIcon={undefined}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Withdrawal Successful!"
        body="Your withdrawal request has been received and will be processed shortly. You'll receive a confirmation email soon. Thank you for using MyFund."
        buttonText="OK"
        modalIcon={checkmarkCircleOutline}
        iconColor="green"
        startIcon={isSending ? <CircularProgress size={20} style={{ color: 'green' }} /> : <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
        onButtonClick={() => setShowSuccessModal(false)}
        zIndex={200}
        confettiAnimation={true}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default WithdrawModal;

