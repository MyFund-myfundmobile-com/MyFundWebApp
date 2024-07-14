"use client";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { IonIcon } from "@ionic/react";
import { mailOutline, checkmarkCircleOutline } from "ionicons/icons";
import CustomSnackbar from "../components/snackbar";
import Title from "../components/title";
import Subtitle from "../components/subtitle";
import ResetPasswordModal from "./resetPasswordModal";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false; // Prevent Font Awesome from adding CSS automatically

const RequestPasswordResetPage: React.FC = () => {
  useEffect(() => {
    console.log("Setting background color...");
    document.body.style.backgroundColor = "#351265";
    return () => {
      console.log("Cleaning up background color...");
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false); // State to track email validity

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(e.target.value.includes("@")); // Check if email contains '@'
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isEmailValid) {
      e.preventDefault();
      handlePasswordResetRequest();
    }
  };

  const handlePasswordResetRequest = async () => {
    setIsLoading(true);
    try {
      const payload = { email };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/request-password-reset/`,
        payload
      );

      setIsLoading(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Password reset email sent successfully!");
      setSnackbarOpen(true);

      // Assuming the OTP token is returned in the response
      const { otpToken } = response.data; // Adjust this based on your actual response structure
      setOtpToken(otpToken);

      setTimeout(() => {
        setIsResetPasswordModalOpen(true); // Open the reset password modal
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      let errorMsg =
        "Network error. Please check your internet connection and try again.";
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          errorMsg = error.response.data.email
            ? "Invalid email address."
            : "Please enter a valid email address.";
        } else if (error.response?.status === 500) {
          errorMsg = "Internal server error. Please try again later.";
        } else {
          errorMsg = error.response?.data.detail || errorMsg;
        }
      }
      setErrorMessage(errorMsg);
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMsg);
      setSnackbarOpen(true);
    }
  };

  return (
    <section className="bg-customPurple animate-floatIn">
      <div className="bg-customPurple flex flex-col items-center justify-center h-screen">
        <div className="max-w-xl px-5 py-6 text-center md:px-10 md:py-24 lg:py-12 bg-white rounded-lg shadow-lg">
          <Title>
            <span style={{ color: "#BB9CE8" }}>Reset</span> Password
          </Title>
          <Subtitle>
            Enter the email address you use for MyFund, and we&apos;ll help you
            create a new password.
          </Subtitle>

          <form
            className="mx-auto mt-10 mb-4 max-w-lg pb-4"
            name="wf-form-request-password-reset"
            method="get"
          >
            <div className="relative mb-8">
              <IonIcon
                icon={mailOutline}
                className="w-6 h-6 text-[#4C28BC] absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                className="block h-9 w-full border border-[#4C28BC] bg-[#fff] px-3 py-6 pl-14 text-sm text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
                required
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} // Handle Enter key press
              />
            </div>

            <div className="flex mb-4 justify-center items-center">
              <a
                className={`block rounded-xl bg-[#4C28BC] w-full py-4 text-center cursor-pointer font-semibold text-white ${
                  !isEmailValid ? "opacity-50 pointer-events-none" : ""
                }`} // Disable button if email is not valid
                style={{ boxShadow: "6px 6px #351265" }}
                onClick={handlePasswordResetRequest}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span>RESETTING...</span>
                    <CircularProgress
                      size={24}
                      color="inherit"
                      className="ml-2"
                    />
                  </div>
                ) : (
                  <span>RESET</span>
                )}
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Snackbar component for displaying success or error messages */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        email={email} // Pass email to the modal
        otpToken={otpToken} // Pass otpToken to the modal
      />
    </section>
  );
};

export default RequestPasswordResetPage;
