"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  ArrowUpward,
  Close,
  FileCopyOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import Modal from "@/components/modal";
import Confetti from "react-confetti";
import { SelectChangeEvent } from "@mui/material/Select";
import { bankOptions } from "@/components/bankOptions";
import { IonIcon } from "@ionic/react";
import { useRouter } from "next/navigation";
import { getCards, deleteCard } from "@/Redux store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux store/store";
import { RootState } from "@/Redux store/store";
import {
  fetchUserTransactions,
  fetchAccountBalances,
  fetchTopSaversData,
} from "@/Redux store/actions";
import Image from "next/image";
import CustomSnackbar from "@/components/snackbar";
import { checkmarkCircleOutline, card as cardIcon } from "ionicons/icons";
import axios from "axios";
import OTPModal from "../modals/autoInvestModal";

interface QuickInvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount: string;
}

const QuickInvestModal: React.FC<QuickInvestModalProps> = ({
  isOpen,
  onClose,
  initialAmount,
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [selectedOption, setSelectedOption] = useState("Bank Transfer");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [userNumber, setUserNumber] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const cards = useSelector((state: RootState) => state.auth.cards);
  const accountSavedBalance = useSelector(
    (state: RootState) => state.auth.accountBalances.savings
  );

  useEffect(() => {
    if (token) {
      dispatch(getCards(token));
      dispatch(fetchUserTransactions(token));
    }
  }, [dispatch, token]);
  const handleClearAmount = () => {
    setAmount("");
  };
  const getBankColor = (bankCode: string) => {
    const bank = bankOptions.find((option) => option.code === bankCode);
    return bank ? bank.color : "#4c28bc"; // Default color if not found
  };

  useEffect(() => {
    setAmount(initialAmount); // Update the amount when initialAmount changes
  }, [initialAmount]);

  const formatAmount = (value: string) => {
    // Remove non-digit characters
    const cleanedValue = value.replace(/[^0-9]/g, "");
    // Format with commas
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (cards.length > 0) {
      setSelectedCardId(cards[0].id); // Set the default selected card to the first one
    }
  }, [cards]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(Number(value))) {
      setAmount(formatAmount(value)); // Only set if it's a valid number
    }
  };
  const handleQuickInvest = async () => {
    setIsSending(true);
    // Investment data sending
    const cardId = selectedCardId || (cards.length > 0 ? cards[0].id : null);
    const formattedAmount = parseFloat(amount.replace(/,/g, ""));
    try {
      if (!formattedAmount || isNaN(formattedAmount)) {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Invalid amount. Please enter a valid amount to Invest."
        );
        return;
      }
      if (formattedAmount < 100000) {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "The minimum amount is 100,000. Please enter a valid amount or select a preset amount."
        );
        return;
      }

      const payload = {
        card_id: cardId,
        amount: formattedAmount,
      };

      if (typeof token === "string") {
        const response =
          selectedOption === "Bank Transfer"
            ? await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/initiate-invest-transfer/`,
                { amount: formattedAmount },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
            : await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quickinvest/`,
                payload,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
        if (response.status === 200 || response.status === 201) {
          const { status, display_text, user_number, open_url, amount } =
            response.data;
          setSnackbarMessage("QuickInvest Request Successful.");
          setSnackbarSeverity("success");
          dispatch(fetchUserTransactions(token));
          dispatch(fetchAccountBalances(response.data.newAccountBalances));
          dispatch(fetchTopSaversData(token));
          setSnackbarOpen(true);
          setUserNumber(user_number);
          if (status === "open_url") {
            window.open(open_url, "_blank");
          }
          setTimeout(() => {
            if (selectedOption === "Bank Transfer") {
              setShowSuccessModal(true);
            } else {
              setShowOTPModal(true);
            }
            onClose();
          }, 1000);
        } else {
          throw new Error("Unexpected response status");
        }
      } else {
        throw new Error("Token is not available.");
      }
    } catch (error: any) {
      console.error("QuickInvest Error:", error);
      console.log("Error details:", error.response?.data); // Log the error details
      setSnackbarMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSending(false);
    }
  };

  //need to update the savings amount with the investment transaction removed
  const handleInvestTransfer = async () => {
    try {
      setIsSending(true);
      const formattedAmount = parseFloat(amount.replace(/,/g, ""));

      if (!formattedAmount || isNaN(formattedAmount)) {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Invalid amount. Please enter a valid amount to invest."
        );
        return;
      }
      if (formattedAmount < 100000) {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "The minimum amount is 100,000. Please enter a valid amount or select a preset amount."
        );
        return;
      }
      if (accountSavedBalance < formattedAmount) {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "You do not have enough balance in your SAVINGS account for this transfer."
        );
        return;
      }
      const payload = { amount: formattedAmount };
      if (typeof token === "string") {
        const response =
          selectedOption === "My Savings"
            ? await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/savings-to-investment/`,
                { amount: formattedAmount },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
            : await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quickinvest/`,
                payload,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
        if (response.status === 200 || response.status === 201) {
          // Dispatch the necessary actions
          const { status, display_text, user_number, open_url, amount } =
            response.data;

          setSnackbarOpen(true);
          setSnackbarSeverity("success");
          setSnackbarMessage("QuickInvest Request Successful.");
          dispatch(fetchAccountBalances(response.data.newAccountBalances));
          dispatch(fetchUserTransactions(token));
          if (status === "open_url") {
            window.open(open_url, "_blank");
          }
          setTimeout(() => {
            if (selectedOption === "My Savings") {
              setShowSuccessModal(true);
              setShowConfetti(true);
            } else {
              throw new Error("Transaction failed");
            }
            onClose();
          }, 1000);
        }
      } else {
        throw new Error("Failed to process request");
      }
    } catch (error: any) {
      console.error("Error fetching account balances:");
    } finally {
      setIsSending(false);
    }
  };

  //     setTimeout(() => {
  //       setIsSending(false);
  //       setShowSuccessModal(true);
  //       setShowConfetti(true); // Activate confetti on success
  //       setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds

  //       onClose(); // Close modal after success
  //     }, 3000); // Adjust as needed for the simulation
  //   };
  // }
  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText("0821326433");
    setShowCopied(true);

    // Reset "Copied" feedback after 3 seconds
    setTimeout(() => {
      setShowCopied(false);
    }, 3000);
  };
  const { push: navigate } = useRouter();

  const handleNavigateToAddCard = () => {
    navigate(
      "/app/settings?triggerAddCard=true&triggerCardAndBankSettings=true"
    );
  };

  const presetAmounts = [100000, 200000, 500000, 1000000, 200000, 5000000];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="QuickInvest"
        className="animate-floatIn"
        body={
          <div>
            <p>
              Manually move funds from your savings into your{" "}
              <span style={{ color: "#4C28BC" }}>INVESTMENT</span> account with
              a few clicks.
            </p>
            <div className="mt-4">
              <TextField
                fullWidth
                variant="outlined"
                className="bg-white"
                label="QuickInvest..."
                value={amount}
                onChange={handleAmountChange}
                InputProps={{
                  startAdornment: (
                    <span style={{ marginRight: 4 }}>&#8358;</span>
                  ),
                  endAdornment: (
                    <IconButton onClick={handleClearAmount}>
                      <Close />
                    </IconButton>
                  ),
                }}
                placeholder="Minimum amount is ₦100,000"
              />
              <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
                {presetAmounts.map((preset, index) => (
                  <button
                    key={index}
                    className="bg-[#DCD1FF] text-black rounded-md font-productSans whitespace-nowrap transform active:scale-95 active:bg-purple-600 active:text-white"
                    style={{ height: "50px" }}
                    onClick={() => setAmount(formatAmount(preset.toString()))}
                  >
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <Select
                fullWidth
                value={selectedOption}
                onChange={handleOptionChange}
                displayEmpty
                variant="outlined"
                className="mb-4 bg-white"
                placeholder="Using..."
              >
                <MenuItem
                  value=""
                  disabled
                >
                  Using...
                </MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="My Saved Cards">My Saved Cards</MenuItem>
                <MenuItem value="My Savings">{`Savings (₦${Math.floor(
                  accountSavedBalance
                ).toLocaleString()})`}</MenuItem>
              </Select>
              {selectedOption === "Bank Transfer" && (
                <div
                  className="mb-4"
                  style={{ textAlign: "center", alignSelf: "center" }}
                >
                  <p>
                    Transfer the exact amount you entered above to...
                    <br />
                    <span
                      style={{ fontSize: 30, color: "#4C28BC", marginLeft: 15 }}
                    >
                      <strong>0821326433</strong>
                    </span>
                    <IconButton onClick={handleCopyToClipboard}>
                      {showCopied ? (
                        <CheckCircleOutline
                          style={{ color: "green", marginRight: -5 }}
                        />
                      ) : (
                        <FileCopyOutlined />
                      )}
                    </IconButton>
                    {showCopied && (
                      <span style={{ color: "green" }}>Copied</span>
                    )}
                    <br />
                    <span style={{ marginTop: -5 }}>(Access Bank)</span>
                    <br />
                    <strong>Vcorp Systems Limited</strong>
                  </p>
                  <br />
                  <p>
                    Click I&apos;VE SENT THE PAYMENT after making the transfer
                    and your account will be updated within minutes.
                  </p>
                </div>
              )}
              {selectedOption === "My Saved Cards" && (
                <div className="text-center">
                  {cards.length === 0 ? (
                    <div className="text-center text-gray-600">
                      <div>
                        No cards added yet...{" "}
                        <span
                          className="font-bold font-proxima text-blue-500 cursor-pointer"
                          onClick={handleNavigateToAddCard}
                        >
                          Add Card Now...
                        </span>
                      </div>
                      <div className="mt-7 mb--5 flex justify-center">
                        <Image
                          src="/images/paystack.png"
                          alt="Paystack"
                          width={150}
                          height={50}
                          className="text-center"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Select
                        fullWidth
                        variant="outlined"
                        displayEmpty
                        className="mb-4 bg-white"
                        placeholder="Which of your cards?"
                        value={selectedCardId || ""}
                        onChange={(event) => {
                          setSelectedCardId(event.target.value);
                        }}
                      >
                        {cards.map((card) => (
                          <MenuItem
                            key={card.id}
                            value={card.id}
                          >
                            <div className="flex items-center">
                              <IonIcon
                                icon={cardIcon}
                                style={{
                                  fontSize: "24px",
                                  color: getBankColor(card.bank_code),
                                }}
                              />
                              <span className="ml-2">
                                {card.bank_name} -{" "}
                                {`**** ${card.card_number.slice(-4)}`}
                              </span>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>

                      <div className="flex justify-center">
                        <Image
                          src="/images/paystack.png"
                          alt="Paystack"
                          width={150}
                          height={50}
                          className="text-center"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {selectedOption === "My Savings" && (
                <div className="text-center"></div>
              )}
            </div>
          </div>
        }
        buttonText={
          isSending ? (
            <div className="flex items-center justify-center">
              <CircularProgress
                size={24}
                className="mr-2"
              />
              PROCESSING... PLEASE WAIT...
            </div>
          ) : selectedOption === "Bank Transfer" ? (
            "I'VE SENT THE PAYMENT"
          ) : selectedOption === "My Savings" ? (
            "Moving Funds to Investment"
          ) : (
            "QuickInvest Now!"
          )
        }
        onButtonClick={
          selectedOption === "My Savings"
            ? handleInvestTransfer
            : handleQuickInvest
        }
        buttonDisabled={!selectedOption || !amount}
        zIndex={200}
        modalIcon={undefined}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Payment Sent!"
        body="Your payment has been successfully sent. Your account will be updated shortly."
        buttonText="OK"
        modalIcon={checkmarkCircleOutline}
        iconColor="green"
        startIcon={
          isSending ? (
            <CircularProgress
              size={20}
              style={{ color: "green" }}
            />
          ) : (
            <IonIcon
              icon={checkmarkCircleOutline}
              style={{ fontSize: "20px", marginRight: 5 }}
            />
          )
        }
        onButtonClick={() => setShowSuccessModal(false)}
        zIndex={200}
        confettiAnimation={true}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
        </div>
      </Modal>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        userInfo={userInfo}
        number={userNumber}
      />

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default QuickInvestModal;
