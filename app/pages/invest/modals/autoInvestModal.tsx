"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CustomSnackbar from "@/app/components/snackbar";
import {
  ArrowUpward,
  Close,
  CheckCircleOutline,
  FileCopyOutlined,
} from "@mui/icons-material";
import Modal from "@/app/components/modal";
import Confetti from "react-confetti";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  carSportOutline,
  checkmarkCircleOutline,
  card as cardIcon,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { bankOptions } from "@/app/components/bankOptions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAutoInvestSettings,
  fetchTopSaversData,
} from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";
import { useNavigate } from "react-router-dom";

interface AutoInvestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AutoInvestModal: React.FC<AutoInvestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [amount, setAmount] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("daily");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isAutoInvestOn, setIsAutoInvestOn] = useState<boolean>(false);
  const [tempAutoInvestState, setTempAutoInvestState] =
    useState<boolean>(false);
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
      setSelectedCard(cards[0].id); // Set the default selected card to the first one
    }
  }, [cards]);

  const getBankColor = (bankCode: string) => {
    const bank = bankOptions.find((option) => option.code === bankCode);
    return bank ? bank.color : "#4c28bc"; // Default color if not found
  };
  const formatAmount = (value: string) => {
    // Remove non-digit characters
    const cleanedValue = value.replace(/[^0-9]/g, "");
    // Format with commas
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(Number(value))) {
      setAmount(formatAmount(value)); // Only set if it's a valid number
    }
  };
  const navigate = useNavigate();
  const handleNavigateToAddCard = () => {
    navigate("/App/settings", {
      state: { triggerAddCard: true, triggerCardAndBankSettings: true },
    });
  };
  const handleFrequencyChange = (event: SelectChangeEvent<string>) => {
    setSelectedFrequency(event.target.value);
  };

  const handleCardChange = (event: SelectChangeEvent<string>) => {
    setSelectedCard(event.target.value);
  };

  const handleSendActivation = async () => {
    const formattedAmount = parseFloat(amount.replace(/,/g, ""));
    if (!token) {
      setSnackbarMessage(
        "Authentication token is missing. Please log in again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
    try {
      setProcessing(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/activate-autoinvest/`,
        {
          card_id: selectedCard,
          amount: formattedAmount,
          frequency: selectedFrequency,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(fetchAutoInvestSettings(token));
        dispatch(fetchTopSaversData(token));
        setProcessing(false);
        setSnackbarMessage("Auto Invest successfully activated!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true); // Show snackbar message
        setShowSuccessModal(true); // Show success modal
        setShowConfetti(true); // Trigger confetti
        onClose();
      } else {
        setProcessing(false);
        setSnackbarMessage(
          "Auto Invest Activation Failed. Please try again later."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setProcessing(false);
      setSnackbarMessage(
        "Failed to activate AutoSave. Please check your connection and try again later."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // const handleSuccessModalClose = () => {
  //   setShowSuccessModal(false);
  //   onClose(); // Ensure the main modal closes as well
  // };

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
              Automatically move funds from your local bank account to your
              MyFund INVESTMENT account for a{" "}
              <span style={{ color: "green" }}>20% p.a. ROI</span> every January
              and July.
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
                <p className="text-sm text-gray-600">Frequency:</p>
                <Select
                  fullWidth
                  value={selectedFrequency}
                  onChange={(event) => setSelectedFrequency(event.target.value)}
                  displayEmpty
                  variant="outlined"
                  className="mb-4 bg-white"
                  placeholder="Select Frequency"
                >
                  <MenuItem value="hourly">Hourly</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </div>
              {/* Select Card Section */}
              <div className="mt-4">
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
                    variant="outlined"
                    displayEmpty
                    className="mb-4 bg-white"
                    placeholder="Select Card"
                    value={selectedCard || ""}
                    onChange={(event) => {
                      setSelectedCard(event.target.value);
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
                )}
              </div>
            </div>
          </div>
        }
        buttonText={
          processing ? (
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
        onClose={() => {
          setShowSuccessModal(false);
          setShowConfetti(false); // Stop confetti when closing the modal
        }}
        header="AutoInvest Activated!"
        body={`Your AutoInvest has been activated.You're now investing ₦${amount} ${selectedFrequency}. Well done! Keep growing your funds.`}
        buttonText="OK"
        modalIcon={carSportOutline}
        iconColor="green"
        startIcon={
          processing ? (
            <CircularProgress size={20} style={{ color: "green" }} />
          ) : (
            <IonIcon
              icon={checkmarkCircleOutline}
              style={{ fontSize: "20px", marginRight: 5 }}
            />
          )
        }
        onButtonClick={() => {
          setShowSuccessModal(false);
          setShowConfetti(false); // Stop confetti when closing the modal
        }}
        zIndex={200}
        confettiAnimation={true}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
          {showConfetti && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
        </div>
      </Modal>
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

export default AutoInvestModal;
