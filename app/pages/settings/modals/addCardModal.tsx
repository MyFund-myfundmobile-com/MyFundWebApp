"use client";
import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { cardOutline, informationCircleOutline } from "ionicons/icons";
import Modal from "@/app/components/modal";
import BankOptions from "@/app/components/bankOptions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";
import CustomSnackbar from "@/app/components/snackbar";
import Subtitle from "@/app/components/subtitle";
import { addCard } from "@/app/Redux store/actions"; // Make sure the action is imported
import { Card } from "@/app/Redux store/types";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (card: any) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [bank, setBank] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cvvInfoVisible, setCvvInfoVisible] = useState(false);

  // Add states for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Snackbar handle close function
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const cards = useSelector((state: RootState) => state.auth.cards); // Make sure cards are from Redux state

  useEffect(() => {
    if (isOpen) {
      setBank(null);
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setPin("");
      setCvvInfoVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (cvvInfoVisible) {
      const timer = setTimeout(() => {
        setCvvInfoVisible(false);
      }, 15000); // Hide CVV info after 15 seconds
      return () => clearTimeout(timer);
    }
  }, [cvvInfoVisible]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/\s/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      setExpiry(value.slice(0, 2) + "/" + value.slice(2, 4));
    } else {
      setExpiry(value);
    }
  };

  const handleProceed = async () => {
    console.log("Selected Bank:", bank);

    if (!bank) {
      setSnackbarMessage("Please select a bank");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!userInfo || !token) {
      setSnackbarMessage("User information is missing. Please relog in.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const cardNumberWithoutSpaces = cardNumber.replace(/ /g, "");

    // Check if the card with the same number already exists
    const isCardAlreadyAdded = cards.some(
      (card) => card.cardNumber === cardNumberWithoutSpaces
    );

    if (isCardAlreadyAdded) {
      setSnackbarMessage("This card has already been added.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      setProcessing(true);
      const requestData = {
        bank_name: bank.name,
        card_number: cardNumberWithoutSpaces,
        expiry_date: expiry,
        cvv: cvv,
        pin: pin,
      };

      console.log("requestData:", requestData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add-card/`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 201) {
        const newCardRecord: Card = {
          bankName: bank.name,
          cardNumber: cardNumberWithoutSpaces,
          expiryDate: expiry,
          id: response.data.id,
          bankColor: bank.color,
          cardHolderName: "",
        };

        dispatch(addCard(newCardRecord));
        setSnackbarMessage("Card added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        onSuccess(newCardRecord);
        setProcessing(false);
        onClose();
      } else {
        setProcessing(false);
        console.error("Failed to add card:", response.data);
        setSnackbarMessage("Failed to add card. Please try another card.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setProcessing(false);
      console.error("An error occurred while adding card:", error);
      let errorMessage =
        "An error occurred while adding card. Please try again later.";

      if (error.response) {
        // Server responded with a status other than 200 range
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response
        errorMessage =
          "No response from server. Please check your network connection.";
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Add New Card"
      body={
        <>
          <Subtitle style={{ marginBottom: 30 }}>
            Input your card details and enjoy swift and stress-free transactions
            on the MyFund Platform.
          </Subtitle>
          <BankOptions value={bank} onChange={(value) => setBank(value)} />
          <TextField
            label="Card Number"
            fullWidth
            className="bg-white"
            variant="outlined"
            value={cardNumber}
            onChange={handleCardNumberChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IonIcon icon={cardOutline} />
                </InputAdornment>
              ),
            }}
            placeholder="1234 5678 9101 1121"
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="Expiry"
            fullWidth
            className="bg-white"
            variant="outlined"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="CVV"
            fullWidth
            className="bg-white"
            variant="outlined"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setCvvInfoVisible(true)}
                  >
                    <IonIcon icon={informationCircleOutline} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="123"
            style={{ marginTop: "16px" }}
          />
          <CustomSnackbar
            open={snackbarOpen}
            message={snackbarMessage}
            severity={snackbarSeverity}
            handleClose={handleSnackbarClose}
          />
          {cvvInfoVisible && (
            <p
              style={{
                color: "gray",
                fontSize: "12px",
                marginTop: "8px",
                alignSelf: "center",
                textAlign: "center",
                alignContent: "center",
              }}
            >
              CVV is the 3 or 4-digit number at the back of your debit card. It
              is NOT your PIN.
            </p>
          )}
          <TextField
            label="PIN"
            fullWidth
            className="bg-white"
            variant="outlined"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            InputProps={{
              type: "password",
            }}
            placeholder="****"
            style={{ marginTop: "16px" }}
          />
        </>
      }
      buttonText={processing ? "Processing... Please Wait..." : "Proceed"}
      onButtonClick={handleProceed}
      startIcon={
        processing ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <IonIcon
            icon={cardOutline}
            style={{ fontSize: "20px", marginRight: 5 }}
          />
        )
      }
      zIndex={100}
    />
  );
};

export default AddCardModal;
