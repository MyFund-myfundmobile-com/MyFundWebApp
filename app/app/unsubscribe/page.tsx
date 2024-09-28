"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar, TextField, CircularProgress } from "@mui/material";
import Modal from "@/components/modal"; // Ensure the import path is correct
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import CustomSnackbar from "@/components/snackbar";
import { mailOutline, checkmarkCircleOutline } from "ionicons/icons";

const UnsubscribePage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isResubscribeModalOpen, setIsResubscribeModalOpen] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loadingUnsubscribe, setLoadingUnsubscribe] = useState(false);
  const [loadingResubscribe, setLoadingResubscribe] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#351265"; // Set background color similar to reset page
    return () => {
      document.body.style.backgroundColor = ""; // Reset background color on unmount
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(e.target.value.includes("@")); // Check if email contains '@' to validate
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (action: "unsubscribe" | "resubscribe") => {
    if (!isEmailValid) {
      setSnackbarMessage("Please enter a valid email.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoadingUnsubscribe(action === "unsubscribe");
    setLoadingResubscribe(action === "resubscribe");

    try {
      const url =
        action === "unsubscribe"
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribe/`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/resubscribe/`;

      const response = await axios.post(url, { email });

      // Update snackbar messages and modal based on the action
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // In the handleSubmit function
      if (response.status === 200) {
        if (action === "unsubscribe") {
          setSuccessModalOpen(true);
        } else if (action === "resubscribe") {
          // Add this condition
          setIsResubscribeModalOpen(true); // Open resubscribe modal
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "User not found. To subscribe, click 'CREATE FREE ACCOUNT'";
      setSnackbarMessage(
        errorMessage === "User not found."
          ? "User isn't found in our system. Did you mean to click Subscribe instead?"
          : errorMessage
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoadingUnsubscribe(false);
      setLoadingResubscribe(false);
    }
  };

  const unsubscribeButtonBackgroundColor = loadingUnsubscribe
    ? "green"
    : !isEmailValid
    ? "gray"
    : "#4C28BC"; // Set button color logic for unsubscribe button

  const resubscribeButtonBackgroundColor = loadingResubscribe
    ? "green"
    : !isEmailValid
    ? "gray"
    : "#4C28BC"; // Set button color logic for resubscribe button

  return (
    <div className="bg-customPurple flex flex-col items-center justify-center h-screen">
      <div className="max-w-xl px-5 py-5 text-center md:px-10 md:py-10 lg:py-10 bg-white rounded-lg shadow-lg">
        <Title>
          <span style={{ color: "#BB9CE8" }}>Manage</span> Subscription
        </Title>
        <Subtitle>
          Enter your email below to unsubscribe or resubscribe to our financial
          intelligence tips, newsletters, etc. via email
        </Subtitle>

        <TextField
          label="Enter your email"
          variant="outlined"
          value={email}
          onChange={handleInputChange}
          fullWidth
          className="mb-4 mt-11"
          style={{ borderColor: "#4C28BC", marginTop: 19 }}
        />

        <div className="flex mb-4 mt-9 justify-between space-x-4">
          {/* Unsubscribe Button */}
          <a
            className="block rounded-xl w-full py-4 text-center cursor-pointer font-semibold text-white"
            style={{
              backgroundColor: unsubscribeButtonBackgroundColor,
              boxShadow: "6px 6px #351265",
              pointerEvents: !isEmailValid ? "none" : "auto", // Disable button if email is invalid
            }}
            onClick={() => handleSubmit("unsubscribe")}
          >
            {loadingUnsubscribe ? (
              <div className="flex items-center justify-center">
                <span>UNSUBSCRIBING...</span>
                <CircularProgress
                  size={24}
                  color="inherit"
                  className="ml-2"
                />
              </div>
            ) : (
              <span>UNSUBSCRIBE</span>
            )}
          </a>

          {/* Resubscribe Button */}
          <a
            className="block rounded-xl w-full py-4 text-center cursor-pointer font-semibold text-white"
            style={{
              backgroundColor: resubscribeButtonBackgroundColor,
              boxShadow: "6px 6px #351265",
              pointerEvents: !isEmailValid ? "none" : "auto", // Disable button if email is invalid
            }}
            onClick={() => handleSubmit("resubscribe")}
          >
            {loadingResubscribe ? (
              <div className="flex items-center justify-center">
                <span>RESUBSCRIBING...</span>
                <CircularProgress
                  size={24}
                  color="inherit"
                  className="ml-2"
                />
              </div>
            ) : (
              <span>SUBSCRIBE</span>
            )}
          </a>
        </div>

        <p className="text-sm text-[#636262] mt-9 mb--2">
          New to MyFund?{" "}
          <a
            href="/register"
            className="text-sm font-bold text-purple1"
          >
            CREATE FREE ACCOUNT
          </a>
        </p>

        {/* Snackbar component for displaying success or error messages */}
        <CustomSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          handleClose={handleCloseSnackbar}
        />

        <Modal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          header="Unsubscribed"
          body={
            <p>You have successfully unsubscribed from our mailing service.</p>
          }
          buttonText="OK"
          onButtonClick={() => setSuccessModalOpen(false)}
          confettiAnimation={true}
          zIndex={100}
          iconColor="#4CAF50"
          modalIcon={checkmarkCircleOutline}
        />

        <Modal
          isOpen={isResubscribeModalOpen}
          onClose={() => setIsResubscribeModalOpen(false)}
          header="Resubscribed"
          body={<p>Thank you for subscribing to our mailing service.</p>}
          buttonText="OK"
          onButtonClick={() => setIsResubscribeModalOpen(false)}
          confettiAnimation={true}
          zIndex={100}
          iconColor="#4CAF50"
          modalIcon={checkmarkCircleOutline}
        />
      </div>
    </div>
  );
};

export default UnsubscribePage;
