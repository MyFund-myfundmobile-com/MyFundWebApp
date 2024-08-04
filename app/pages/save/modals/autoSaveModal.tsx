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
import Image from "next/image";
import CustomSnackbar from "@/app/components/snackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";
import { fetchTopSaversData } from "@/app/Redux store/actions";
import axios from "axios";
import { checkmarkCircleOutline, card as cardIcon } from "ionicons/icons"; // Import icons
import { IonIcon } from "@ionic/react";
import { bankOptions } from "@/app/components/bankOptions";
import { useNavigate } from "react-router-dom"; // import useNavigate

interface AutoSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const AutoSaveModal: React.FC<AutoSaveModalProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const cards = useSelector((state: RootState) => state.auth.cards);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchTopSaversData(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (cards.length > 0) {
      setSelectedCardId(cards[0].id); // Set the default selected card to the first one
    }
  }, [cards]);

  const getBankColor = (bankCode: string) => {
    const bank = bankOptions.find((option) => option.code === bankCode);
    return bank ? bank.color : "#4c28bc"; // Default color if not found
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(Number(value))) {
      setAmount(formatAmount(value)); // Only set if it's a valid number
    }
  };

  const navigate = useNavigate(); // useNavigate hook

  const handleNavigateToAddCard = () => {
    navigate("/App/settings", {
      state: { triggerAddCard: true, triggerCardAndBankSettings: true },
    });
  };

  const formatAmount = (value: string) => {
    // Remove non-digit characters
    const cleanedValue = value.replace(/[^0-9]/g, "");
    // Format with commas
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleConfirmAutoSave = async () => {
    if (!token) {
      setSnackbarMessage(
        "Authentication token is missing. Please log in again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    try {
      setProcessing(true);

      const currentDate = new Date();
      const messageDate = currentDate.toISOString();
      const messageTime = currentDate.toLocaleTimeString();

      // Dispatch the success message with date and time properties
      const successMessage = `Your AutoSave has been activated. You're now saving ₦${amount} ${frequency}. Well done! Keep growing your funds. 🥂`;
      const messageData = {
        text: successMessage,
        date: messageDate,
        time: messageTime,
      };

      // Dispatch the success message with date and time properties
      // dispatch(addAlertMessage(messageData));

      // Send a POST request to create an alert message associated with the user
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-alert-message/`,
        {
          text: successMessage, // The alert message text
          date: messageDate, // The date of the alert message
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // Activate AutoSave
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/activate-autosave/`,
        {
          card_id: selectedCardId,
          amount: parseFloat(amount.replace(/,/g, "")),
          frequency: frequency,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (response.status === 200) {
        // dispatch(fetchAutoSaveSettings());
        dispatch(fetchTopSaversData(token));
        setProcessing(false);
        setSnackbarMessage(successMessage);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        onClose();
      } else {
        setProcessing(false);
        setSnackbarMessage(
          "AutoSave Activation Failed. Please try again later."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error activating AutoSave:", error);
      setProcessing(false);
      setSnackbarMessage(
        "Failed to activate AutoSave. Please check your connection and try again later."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const presetAmounts = [5000, 10000, 15000, 20000, 40000, 100000];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="AutoSave Settings"
        className={className}
        body={
          <div>
            <TextField
              fullWidth
              variant="outlined"
              className="bg-white"
              label="Enter Amount"
              value={amount}
              onChange={handleAmountChange}
              InputProps={{
                startAdornment: <span style={{ marginRight: 4 }}>&#8358;</span>,
              }}
              placeholder="Enter Amount"
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
              <p className="text-sm text-gray-600">Frequency:</p>
              <Select
                fullWidth
                value={frequency}
                onChange={(event) => setFrequency(event.target.value)}
                displayEmpty
                variant="outlined"
                className="mb-4 bg-white"
              >
                <MenuItem value="hourly">Hourly</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </div>
            <div className="mt--1">
              <p className="text-sm text-gray-600">Using:</p>
              {cards.length === 0 ? (
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
                  value={selectedCardId || ""}
                  onChange={(event) =>
                    setSelectedCardId(event.target.value as string)
                  }
                  displayEmpty
                  variant="outlined"
                  className="mb-4 bg-white"
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
              )}
            </div>

            <div className="flex justify-center my-2">
              {selectedCardId && (
                <Image
                  src="/images/paystack.png"
                  alt="Paystack"
                  width={150}
                  height={50}
                />
              )}
            </div>
          </div>
        }
        buttonText={
          processing ? (
            <div className="flex items-center justify-center">
              <CircularProgress size={24} className="mr-2" />
              PROCESSING... PLEASE WAIT...
            </div>
          ) : (
            "Activate AutoSave"
          )
        }
        onButtonClick={handleConfirmAutoSave}
        buttonDisabled={!selectedCardId || !amount}
        zIndex={200}
      />

      {/* Snackbar for notifications */}
      <CustomSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default AutoSaveModal;
