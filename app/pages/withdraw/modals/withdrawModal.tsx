"use client";
import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, IconButton, CircularProgress, InputLabel, FormControl } from '@mui/material';
import { Close, CheckCircleOutline } from '@mui/icons-material';
import Modal from '@/app/components/modal';
import Confetti from 'react-confetti';
import { SelectChangeEvent } from '@mui/material/Select';
import { IonIcon } from '@ionic/react';
import { arrowDownOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserTransactions, fetchAccountBalances, fetchTopSaversData
} from "@/app/Redux store/actions";
import { trace } from 'console';
import axios from "axios";
import { AppDispatch, RootState } from "@/app/Redux store/store";

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
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const dispatch = useDispatch<AppDispatch>();
  const accountSavedBalance = useSelector((state: RootState) => state.auth.accountBalances.savings);
  const accountInvestBalance = useSelector((state: RootState) => state.auth.accountBalances.investment);
  const accountWalletBalance = useSelector((state: RootState) => state.auth.accountBalances.wallet);
  useEffect(() => {
    setWithdrawFrom(defaultWithdrawFrom);
  }, [defaultWithdrawFrom]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserTransactions(token));
      dispatch(fetchAccountBalances(token));
    }
  }, [dispatch, token]);

  const handleClearAmount = () => {
    setAmount('');
  };
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000); // Hides confetti after 3 seconds
      return () => clearTimeout(timer); // Cleanup on unmount or when showConfetti changes
    }
  }, [showConfetti]);
  const formatAmount = (value: string) => {
    const cleanedValue = value.replace(/[^0-9]/g, ''); // Remove non-digit characters
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Format with commas
  };
  // const formattedAmount = parseFloat(amount.replace(/,/g, ""));
  // const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAmount(formatAmount(event.target.value));
  // };
  //disable later
  const handleWithdraw = async () => {

    setIsSending(true);
    // Simulate withdraw process
    if (withdrawFrom === "savings" && withdrawTo === "Investment") {
      handleTransferSavingstoInvest();
    } else if (withdrawFrom === "investment" && withdrawTo === "Savings") {
      handleTransferInvesttoSavings();
    } else if (withdrawFrom === "wallet" && withdrawTo === "Savings") {
      handleWalletToSavingsTransfer();
    } else if (withdrawFrom === "wallet" && withdrawTo === "Investment") {
      handleWalletToInvestmentTransfer();
    } else if (withdrawFrom === "wallet" && withdrawTo === "Another User") {
      handleTransferToWallet();
    } else {
      handleTransferToBankAccount();
    }
    setTimeout(() => {
      setIsSending(false);
      setShowSuccessModal(true);
      setShowConfetti(true); // Activate confetti on success
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
      onClose(); // Close modal after success
    }, 3000); // Adjust as needed for the simulation
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(Number(value))) {
      setAmount(formatAmount(value)); // Only set if it's a valid number

    };

  };
  const handleWithdrawFromChange = (event: SelectChangeEvent<string>) => {
    setWithdrawFrom(event.target.value);
    setWithdrawTo(''); // Reset withdrawTo when withdrawFrom changes
    setUserEmail(''); // Reset user email when withdrawFrom changes
  };

  const handleWithdrawToChange = (event: SelectChangeEvent<string>) => {
    console.log("Selected Withdraw To:", event.target.value);
    setWithdrawTo(event.target.value);
    // setWithdrawFrom('');
    // setUserEmail('');
  };

  const getWithdrawToOptions = () => {
    console.log("Withdraw From Value:", withdrawFrom); // Debugging log
    switch (withdrawFrom) {
      case 'Savings':
        return (
          <>
            <MenuItem value="Investment">Investment</MenuItem>
            <MenuItem value="Bank Account">Bank Account</MenuItem>
          </>
        );
      case 'Investment':
        return <MenuItem value="Bank Account">Bank Account</MenuItem>;
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

  const handleTransferToBankAccount = () => {




  }
  const handleWalletToSavingsTransfer = () => { };
  const handleTransferToWallet = () => {

  }

  const handleTransferToUser = () => {

  }
  const handleWalletToInvestmentTransfer = () => { };
  const handleTransferInvesttoSavings = async () => { }
  const handleTransferSavingstoInvest = async () => {
    try {
      const requestedAmount = parseFloat(amount.replace(/,/g, ""));


      if (requestedAmount > accountSavedBalance) {
        // Display an snackbar for insufficient balance
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Insufficient Balance. You do not have enough balance in your SAVINGS account for this withdrawal."
        );
        return;
      }

      // Prepare the data to send to the backend API
      const requestData = {
        amount: requestedAmount,
      };

      console.log("Request Data:", requestData); // Log the requestData
      console.log(token);
      if (typeof token === "string") {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/savings-to-investment/`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        console.log("API Response:", response); // Log the API response

        if (response.status === 200) {
          const responseData = response.data;

          dispatch(fetchUserTransactions(token));
          dispatch(fetchAccountBalances(responseData.newAccountBalances));
          console.log(responseData.newAccountBalances)

          // setIsSuccessVisible(true);
          // setWithdrawModalVisible(false);
          setIsSending(false);
        } else {
          // Handle API errors here and show appropriate alerts
          if (response.status === 400) {
            setIsSending(false);
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMessage(

              "Invalid input. Please check your data and try again."
            );
          } else if (response.status === 401) {
            setIsSending(false);
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMessage("You are not authorized. Please login again.");
          } else {
            setIsSending(false);
            setSnackbarMessage(
              "An error occurred while processing your request. Please try again later."
            );
          }
        }
      } else {
        throw new Error("Token is not available.");
      }

    } catch (error) {
      console.error("Savings to Investment Transfer Error:", error);
      // Handle network or other errors here and show an appropriate alert
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(

        "An error occurred. Please check your network connection and try again."
      );
    } finally {
      // Reset the processing state
      setIsSending(false);
    }
  };


  const handleTransfertoSaving = () => { }



  const renderAdditionalFields = () => {
    if (withdrawTo === 'Bank Account') {
      return (
        <FormControl fullWidth variant="outlined" className="mb-4 bg-white">
          <InputLabel>Which of Your Bank Accounts</InputLabel>
          <Select
            label="Which of Your Bank Accounts"
            fullWidth
            variant="outlined"
            displayEmpty
            className="mb-4 bg-white"
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Which of Your Bank Accounts...
            </MenuItem>
            {/* Replace with actual list of saved bank accounts */}
            <MenuItem value="bank1">Bank 1 - 123456789</MenuItem>
            <MenuItem value="bank2">Bank 2 - 987654321</MenuItem>
            <MenuItem value="no_bank">
              No bank accounts added yet... Add Bank Account Now
            </MenuItem>
          </Select>
        </FormControl>
      );
    } else if (withdrawTo === 'Another User') {
      return (
        <TextField
          fullWidth
          variant="outlined"
          className='bg-white mb-4'
          label="Enter User's Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter User's email"
        />
      );
    }
    return null;
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
            <p>Move money from Savings to Investment or to your bank.</p><br />

            <p>
              Immediate Withdrawal to <span style={{ color: 'green', fontWeight: 'bold' }}>Bank Account</span> attracts...
              <ul>
                <li><span style={{ color: 'brown', fontWeight: 'bold' }}>10%</span> charge if from <span style={{ color: '#4C28BC', fontWeight: 'bold' }}>SAVINGS</span></li>
                <li><span style={{ color: 'brown', fontWeight: 'bold' }}>15%</span> charge if from <span style={{ color: '#4C28BC', fontWeight: 'bold' }}>INVESTMENT</span></li>
                <li><span style={{ color: 'green', fontWeight: 'bold' }}>0%</span> charge if from <span style={{ color: '#4C28BC', fontWeight: 'bold' }}>WALLET</span></li>
              </ul>
              <br />

              To schedule a withdrawal without charges, message admin with the withdrawal request.
            </p>
            <br />
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
              <MenuItem value="Savings">{`Savings (₦${Math.floor(
                accountSavedBalance
              ).toLocaleString()})`}</MenuItem>
              <MenuItem value="Investment">{`Investment (₦${Math.floor(
                accountInvestBalance
              ).toLocaleString()})`}</MenuItem>
              <MenuItem value="Wallet">{`Wallet (₦${Math.floor(
                accountWalletBalance
              ).toLocaleString()})`}</MenuItem>
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
              >   Withdraw to...
                <MenuItem value="" disabled>

                  {/* {getWithdrawToOptions()} */}
                </MenuItem>

                <MenuItem value="Investment">Investment</MenuItem>
                <MenuItem value="Bank Account">Bank Account</MenuItem>
                <MenuItem value="Savings">Savings</MenuItem>
                <MenuItem value="Another User">Another User</MenuItem>
              </Select>
            )}

            {renderAdditionalFields()}

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
        header="Withdrawal Successful"
        body="Your withdrawal request has been processed successfully. Thank you for using MyFund."
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
