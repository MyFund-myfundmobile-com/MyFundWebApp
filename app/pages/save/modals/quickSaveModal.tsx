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
import Modal from "@/app/components/modal";
import Confetti from "react-confetti";
import { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { checkmarkCircleOutline, card as cardIcon } from "ionicons/icons"; // Import icons
import { IonIcon } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";
import { getCards, deleteCard } from "@/app/Redux store/actions";
import CustomSnackbar from "@/app/components/snackbar";
import { bankOptions } from "@/app/components/bankOptions";
import { useNavigate } from "react-router-dom"; // import useNavigate
import OTPModal from "./otpModal";
import { fetchUserTransactions } from "@/app/Redux store/actions";

interface QuickSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount: string;
  className?: string; // Add className prop
}

const QuickSaveModal: React.FC<QuickSaveModalProps> = ({
  isOpen,
  onClose,
  initialAmount,
  className,
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [selectedOption, setSelectedOption] = useState("Bank Transfer");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [userNumber, setUserNumber] = useState(""); // Add user's number state

  const [showCopiedAmount, setShowCopiedAmount] = useState(false);
  const [showCopiedAccount, setShowCopiedAccount] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const cards = useSelector((state: RootState) => state.auth.cards);

  const getBankColor = (bankCode: string) => {
    const bank = bankOptions.find((option) => option.code === bankCode);
    return bank ? bank.color : "#4c28bc"; // Default color if not found
  };

  useEffect(() => {
    if (token) {
      dispatch(getCards(token));
      dispatch(fetchUserTransactions(token));
    }
  }, [dispatch, token]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(Number(value))) {
      setAmount(formatAmount(value)); // Only set if it's a valid number
    }
  };

  useEffect(() => {
    if (cards.length > 0) {
      setSelectedCardId(cards[0].id); // Set the default selected card to the first one
    }
  }, [cards]);

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount); // Copy the amount to the clipboard
    setShowCopiedAmount(true);

    // Reset "Copied" feedback after 3 seconds
    setTimeout(() => {
      setShowCopiedAmount(false);
    }, 3000);
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

  const handleQuickSave = async () => {
    setIsSending(true);
    try {
      const cardId = selectedCardId || (cards.length > 0 ? cards[0].id : null);
      const formattedAmount = parseFloat(amount.replace(/,/g, ""));

      if (!formattedAmount || isNaN(formattedAmount)) {
        throw new Error("Invalid amount. Please enter a valid number.");
      }

      const payload = {
        card_id: cardId,
        amount: formattedAmount,
      };

      console.log("QuickSave Payload:", payload); // Log the payload

      if (typeof token === "string") {
        const response =
          selectedOption === "Bank Transfer"
            ? await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/initiate-save-transfer/`,
                { amount: formattedAmount },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
            : await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quicksave/`,
                payload,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

        if (response.status === 200 || response.status === 201) {
          const { status, display_text, user_number, open_url } = response.data;
          setSnackbarMessage(response.data.display_text);
          setSnackbarSeverity("success");
          dispatch(fetchUserTransactions(token));
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
      console.error("QuickSave Error:", error);
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

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText("0821326433"); // Copy the account number to the clipboard
    setShowCopiedAccount(true);

    // Reset "Copied" feedback after 3 seconds
    setTimeout(() => {
      setShowCopiedAccount(false);
    }, 3000);
  };

  const navigate = useNavigate(); // useNavigate hook

  const handleNavigateToAddCard = () => {
    navigate("/App/settings", {
      state: { triggerAddCard: true, triggerCardAndBankSettings: true },
    });
  };

  const presetAmounts = [5000, 10000, 15000, 20000, 40000, 100000];
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="QuickSave"
        className="animate-floatIn"
        body={
          <div>
            <p>
              Manually move funds from your local bank account into your{" "}
              <span style={{ color: "#4C28BC" }}>SAVINGS</span> account with a
              few clicks (
              <span className="text-green-800">@13% interest p.a.</span>).
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
                  startAdornment: (
                    <span style={{ marginRight: 4 }}>&#8358;</span>
                  ),
                  endAdornment: (
                    <IconButton onClick={handleCopyAmount}>
                      {showCopiedAmount ? (
                        <>
                          <CheckCircleOutline
                            style={{ color: "green", marginRight: -5 }}
                          />
                          <span
                            style={{
                              color: "green",
                              fontSize: 13,
                              marginLeft: 7,
                            }}
                          >
                            Copied
                          </span>
                        </>
                      ) : (
                        <FileCopyOutlined />
                      )}
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
                    style={{ height: "50px" }}
                    onClick={() => setAmount(formatAmount(preset.toString()))}
                  >
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Using...</p>
                <Select
                  fullWidth
                  value={selectedOption}
                  onChange={handleOptionChange}
                  displayEmpty
                  variant="outlined"
                  className="mb-4 bg-white"
                  placeholder="Using..."
                >
                  <MenuItem value="" disabled>
                    Using...
                  </MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="My Saved Cards">My Saved Cards</MenuItem>
                </Select>
              </div>
              {selectedOption === "Bank Transfer" && (
                <div
                  className="mb-4"
                  style={{ textAlign: "center", alignSelf: "center" }}
                >
                  <p>
                    Copy and transfer the exact amount you entered above to...
                    <br />
                    <span
                      style={{ fontSize: 30, color: "#4C28BC", marginLeft: 15 }}
                    >
                      <strong>0821326433</strong>
                    </span>
                    <IconButton onClick={handleCopyToClipboard}>
                      {showCopiedAccount ? (
                        <>
                          <CheckCircleOutline
                            style={{ color: "green", marginRight: -5 }}
                          />
                          <span
                            style={{
                              color: "green",
                              fontSize: 13,
                              marginLeft: 7,
                            }}
                          >
                            Copied
                          </span>
                        </>
                      ) : (
                        <FileCopyOutlined />
                      )}
                    </IconButton>
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
              {selectedOption === "My Saved Cards" &&
                (cards.length === 0 ? (
                  <div className="text-center text-gray-600">
                    No cards added yet...{" "}
                    <span
                      className="font-bold font-proxima text-blue-500 cursor-pointer"
                      onClick={handleNavigateToAddCard}
                    >
                      Add Card Now...
                    </span>
                  </div>
                ) : (
                  <Select
                    fullWidth
                    variant="outlined"
                    displayEmpty
                    className="mb-4 bg-white"
                    placeholder="Which of your cards?"
                    value={selectedCardId || ""}
                    onChange={(event) => {
                      console.log("Selected card ID:", event.target.value); // Log selected card ID
                      setSelectedCardId(event.target.value);
                    }}
                  >
                    {cards.map((card) => (
                      <MenuItem key={card.id} value={card.id}>
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
                ))}
            </div>
          </div>
        }
        buttonText={
          isSending ? (
            <div className="flex items-center justify-center">
              <CircularProgress size={24} className="mr-2" />
              Sending...
            </div>
          ) : selectedOption === "Bank Transfer" ? (
            "I'VE SENT THE PAYMENT"
          ) : (
            "QuickSave Now!"
          )
        }
        onButtonClick={handleQuickSave}
        buttonDisabled={!selectedOption || !amount}
        zIndex={200}
        modalIcon={undefined}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="QuickSave Request Successful!"
        body="Your bank transfer has been initiated and will be processed shortly once your payment (transfer) is confirmed. Keep growing your funds."
        buttonText="OK"
        modalIcon={checkmarkCircleOutline}
        iconColor="green"
        startIcon={
          isSending ? (
            <CircularProgress size={20} style={{ color: "green" }} />
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
            <Confetti width={window.innerWidth} height={window.innerHeight} />
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

export default QuickSaveModal;
