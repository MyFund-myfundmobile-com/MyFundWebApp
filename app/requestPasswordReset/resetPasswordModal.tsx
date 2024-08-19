<<<<<<< HEAD
"use client"
=======
"use client";
>>>>>>> 9cdde254503cf0ef47c2b4d86b6e44be3560c203
import React, { useState } from "react";
import {
  TextField,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Modal from "@/app/components/modal"; // Ensure the import path is correct
import { IonIcon } from "@ionic/react";
import {
  lockClosedOutline,
  checkmarkCircleOutline,
  eyeOutline,
  eyeOffOutline,
  keyOutline,
} from "ionicons/icons";
import Subtitle from "../components/subtitle";
import axios from "axios";
import CustomSnackbar from "../components/snackbar";
import styles from "../ui/landing/Header.module.css";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  otpToken: string; // Add OTP token prop
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  email,
  otpToken, // Destructure OTP token from props
}) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isResetButtonDisabled = () => {
    return (
      resetting || loading || otp.length < 6 || password !== confirmPassword
    );
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      return;
    }

    setResetting(true);

    try {
      setLoading(true);

      const payload = {
        email,
        otp,
        password,
        confirm_password: confirmPassword, // Match backend field name
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reset-password/?token=${otpToken}`, // Include OTP token in URL
        payload
      );

      setLoading(false);

      if (response.status === 200) {
        setShowSuccessModal(true);
        setSnackbarMessage("Password reset successful!"); // Update success snackbar message
      } else {
        setSnackbarMessage("Password reset failed");
      }
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error response:", error.response);
          setSnackbarMessage(
            `${error.response.data.detail ||
            "An error occurred while resetting password"
            }`
          );
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Error request:", error.request);
          setSnackbarMessage("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
          setSnackbarMessage("An error occurred while setting up the request");
        }
      } else {
        console.error("Error:", error);
        setSnackbarMessage("An unexpected error occurred");
      }
    }

    setResetting(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
    window.location.href = "/login";
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Reset Password"
        body={
          <>
            <Subtitle style={{ marginBottom: 10 }}>
              Enter the OTP we just sent to{" "}
              <span
                style={{ color: "black" }}
                className="font-proxima font-bold"
              >
                {email}
              </span>{" "}
              to complete your password reset. <br />
              <br /> If you can&apos;t find it in your Inbox, kindly check your{" "}
              <span
                style={{ color: "black" }}
                className="font-proxima font-bold"
              >
                Trash
              </span>{" "}
              and{" "}
              <span
                style={{ color: "black" }}
                className="font-proxima font-bold"
              >
                Spam
              </span>{" "}
              folders.
            </Subtitle>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4 mt-4 focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
              style={{
                marginBottom: 15,
                marginTop: 15,
                backgroundColor: "white",
              }}
              InputProps={{
                startAdornment: (
                  <IonIcon
                    icon={keyOutline}
                    style={{
                      fontSize: "25px",
                      marginRight: 10,
                      backgroundColor: "white",
                    }}
                  />
                ),
              }}
            />
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 mt-4 focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
              style={{ marginBottom: 15, backgroundColor: "white" }}
              InputProps={{
                startAdornment: (
                  <IonIcon
                    icon={lockClosedOutline}
                    style={{ fontSize: "25px", marginRight: 10 }}
                  />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      <IonIcon
                        icon={showPassword ? eyeOutline : eyeOffOutline}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4 mt-4 focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
              style={{ marginBottom: 15, backgroundColor: "white" }}
              InputProps={{
                startAdornment: (
                  <IonIcon
                    icon={lockClosedOutline}
                    style={{ fontSize: "25px", marginRight: 10 }}
                  />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                      <IonIcon
                        icon={showConfirmPassword ? eyeOutline : eyeOffOutline}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        }
        buttonText={resetting ? "Resetting Password..." : "Reset Password"}
        onButtonClick={handleResetPassword}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
        zIndex={100}
        buttonDisabled={isResetButtonDisabled()}
      />
      <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        header="Password Reset Successful"
        body={
          <p>
            Your password has been successfully reset! Click the button below to
            return to the login screen to login with your new password
          </p>
        }
        buttonText="OK, RETURN TO LOGIN"
        onButtonClick={handleCloseSuccessModal}
        modalIcon={checkmarkCircleOutline}
        iconColor="#4CAF50"
        zIndex={100}
        confettiAnimation={true} // Enable confetti animation
      />

      <CustomSnackbar
        open={!!snackbarMessage}
        message={snackbarMessage}
        severity="success" // Change severity to success
        handleClose={() => setSnackbarMessage("")}
      />
    </>
  );
};

export default ResetPasswordModal;
