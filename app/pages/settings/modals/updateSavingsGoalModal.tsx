"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";
import Modal from "@/app/components/modal";
import { checkmarkCircleOutline } from "ionicons/icons";
import Confetti from "react-confetti";
import CustomSnackbar from "@/app/components/snackbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/Redux store/store";
import { fetchUserInfo } from "@/app/Redux store/actions";

interface UpdateSavingsGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstname: string;
  setUpdatedSavingsGoal: (message: string) => void;
  onUpdate: (
    newPreferredAsset: string,
    newAmount: number,
    newDuration: number
  ) => void;
}

const UpdateSavingsGoalModal: React.FC<UpdateSavingsGoalModalProps> = ({
  isOpen,
  onClose,
  firstname,
  setUpdatedSavingsGoal,
  onUpdate,
}) => {
  const [preferredAsset, setPreferredAsset] = useState(
    "Real Estate (MyFund Hostels)"
  );
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("5");
  const [isUpdating, setIsUpdating] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const token = useSelector((state: RootState) => state.auth.token);

  console.log("UserInfo.token:", userInfo?.token);
  console.log("token:", token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [token, dispatch]);

  const formatAmount = (value: string) => {
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    return value.replace(regex, ",");
  };

  const handleUpdate = async () => {
    const amountNum = parseFloat(amount.replace(/,/g, ""));
    if (amountNum < 1000000) {
      setAlertMessage(
        "Invalid Amount: The minimum amount is ₦1,000,000. Please try again and enter a valid amount."
      );
      return;
    }

    setIsUpdating(true);

    try {
      if (!userInfo || !token) {
        console.error("User info or token is missing");
        setSnackbarSeverity("error");
        setSnackbarMessage("User info or token is missing");
        setOpenSnackbar(true);
        setIsUpdating(false);
        return;
      }

      const data = {
        preferred_asset: preferredAsset,
        savings_goal_amount: Math.round(amountNum),
        time_period: parseInt(duration),
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-savings-goal/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.preferred_asset) {
        setIsUpdating(false);

        const savingsPerMonth =
          data.savings_goal_amount / (data.time_period * 12);
        const roundedSavingsPerMonth = Math.round(
          Number(savingsPerMonth.toPrecision(3))
        );
        const savingsGoalMessage = `You should be saving ₦${roundedSavingsPerMonth.toLocaleString()} per month to reach ₦${data.savings_goal_amount.toLocaleString()} for your ${
          data.preferred_asset
        } investment in ${data.time_period} ${
          data.time_period > 1 ? "years" : "year"
        }. Keep saving to reach your goal.`;

        // Update the user profile directly
        setUpdatedSavingsGoal(savingsGoalMessage);
        setSuccessMessage(savingsGoalMessage);
        setShowSuccessModal(true);
        setShowConfetti(true);

        setSnackbarSeverity("success");
        setSnackbarMessage("Savings goal updated successfully!");
        setOpenSnackbar(true);

        setTimeout(() => {
          setShowConfetti(false);
          setOpenSnackbar(false);
        }, 6000);

        // API call to refresh user profile and update Redux store
        dispatch(fetchUserInfo(token)); // Ensure user info is refreshed
        onClose();
      } else {
        console.error("Invalid API response format");
        setSnackbarSeverity("error");
        setSnackbarMessage("Invalid API response format");
        setOpenSnackbar(true);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error updating savings goal:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error updating savings goal");
      setOpenSnackbar(true);
      setIsUpdating(false);
    }
  };

  const handleClearAmount = () => {
    setAmount("");
    setAlertMessage("");
  };

  const presetAmounts = [
    1000000, 2000000, 5000000, 10000000, 15000000, 30000000,
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Update Savings Goal"
        body={
          <div>
            <p>
              Hey{" "}
              <span
                className="text-purple1 font-proxima"
                style={{ fontSize: 16 }}
              >
                {firstname}
              </span>
              ,
            </p>
            <p>
              As part of helping you grow your funds to own properties and
              develop your savings habit, you will need to set a savings goal.
            </p>
            <div className="mt-4">
              <Select
                fullWidth
                value={preferredAsset}
                onChange={(e) => setPreferredAsset(e.target.value)}
                displayEmpty
                variant="outlined"
                className="mb-4 bg-white"
              >
                <MenuItem value="" disabled>
                  Preferred Asset
                </MenuItem>
                <MenuItem value="Real Estate (MyFund Hostels)">
                  Real Estate (MyFund Hostels)
                </MenuItem>
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
                    startAdornment: (
                      <span style={{ marginRight: 4 }}>&#8358;</span>
                    ),
                    endAdornment: (
                      <IconButton onClick={handleClearAmount}>
                        <Close />
                      </IconButton>
                    ),
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
                    style={{ height: "50px" }}
                    onMouseDown={(e) => e.currentTarget.classList.add("active")}
                    onMouseUp={(e) =>
                      e.currentTarget.classList.remove("active")
                    }
                    onMouseLeave={(e) =>
                      e.currentTarget.classList.remove("active")
                    }
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
                <MenuItem value="" disabled>
                  How long will it take you?
                </MenuItem>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year} {year > 1 ? "years" : "year"}
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
        confettiAnimation={true} // Add confetti animation prop here if needed
      />

      {/* Confetti */}
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* Snackbar */}
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setOpenSnackbar(false)} // Make sure to use `handleClose` here
      />
    </>
  );
};

export default UpdateSavingsGoalModal;
