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
import { checkmarkCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";

import CustomSnackbar from "@/app/components/snackbar";

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const token = useSelector((state: RootState) => state.auth.token);

  const handleClearAmount = () => {
    setAmount("");
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

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatAmount(event.target.value));
  };

  const handleSendPayment = () => {
    setIsSending(true);
    // Simulate sending payment process
    setTimeout(() => {
      setIsSending(false);
      setShowSuccessModal(true);
      setShowConfetti(true); // Activate confetti on success
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds

      onClose(); // Close modal after success
    }, 3000); // Adjust as needed for the simulation
  };

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

  const presetAmounts = [5000, 10000, 15000, 20000, 40000, 100000];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="QuickInvest"
        body={
          <div>
            <p>
              Manually move funds from your local bank account into your{" "}
              <span style={{ color: "#4C28BC" }}>INVESTMENT</span> account with
              a few clicks.
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
                <MenuItem value="" disabled>
                  Using...
                </MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="My Saved Cards">My Saved Cards</MenuItem>
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
                <Select
                  fullWidth
                  variant="outlined"
                  displayEmpty
                  className="mb-4 bg-white"
                  placeholder="Which of your cards?"
                >
                  {/* List of saved cards from settings/subsettings/card.tsx */}
                  <MenuItem value="" disabled>
                    No cards added yet. Use Transfer or... Add Cards Now!
                  </MenuItem>
                  {/* Render saved cards here */}
                </Select>
              )}
            </div>
          </div>
        }
        buttonText={
          isSending ? (
            <div className="flex items-center">
              <CircularProgress size={24} className="mr-2" />
              Sending Payment...
            </div>
          ) : (
            <>
              <ArrowUpward className="mr-2" />
              {selectedOption === "Bank Transfer"
                ? "I've Sent The Payment"
                : "QuickInvest Now!"}
            </>
          )
        }
        onButtonClick={handleSendPayment}
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
    </>
  );
};

export default QuickInvestModal;
