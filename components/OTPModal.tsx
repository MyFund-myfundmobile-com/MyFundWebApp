"use client";
import "dotenv/config";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import CustomSnackbar from "@/components/snackbar";
import { CircularProgress } from "@mui/material";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { PrimaryButton } from "@/components/Buttons/MainButtons";

interface OTPModalProps {
  email: string;
  password: string;
  isOpen: boolean;
  onClose: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({
  email,
  password,
  isOpen,
  onClose,
}) => {
  const [otp, setOTP] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP.join("").slice(0, 6));

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      setOTP(pasteData);
      inputRefs.current[5].focus();
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/confirm-otp/`,
        {
          otp: otp,
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        console.log("OTP Verification Successful");

        try {
          const loginResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/`,
            {
              username: email,
              password: password,
            }
          );

          if (loginResponse.status === 200) {
            const { access, refresh, user_id } = loginResponse.data;
            handleSnackbarOpen(
              "success",
              "We've confirmed it's you! Welcome to MyFund..."
            );
            console.log("Login Successful");
            window.location.href = "/app"; // Redirect to your desired page upon successful login
          } else {
            console.error("Login API Error:", loginResponse.data);
            handleSnackbarOpen(
              "error",
              "An error occurred while logging in. Please try again."
            );
          }
        } catch (loginError) {
          console.error("Login API Error:", loginError);
          handleSnackbarOpen(
            "error",
            "An error occurred while logging in. Please try again."
          );
        }
      } else {
        console.error("OTP Verification Failed:", response.data);
        handleSnackbarOpen(
          "error",
          "OTP Verification Failed. Please check and try again."
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      handleSnackbarOpen("error", "An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarOpen = (
    severity: "success" | "error",
    message: string
  ) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <CustomSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleSnackbarClose}
      />
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative bg-white rounded-lg p-8 w-full max-w-md z-50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600"
          >
            <IonIcon
              icon={closeOutline}
              className="w-6 h-6"
            />
          </button>
          <h2 className="md:text-2xl text-xl tracking-tight text-purple1 font-proxima font-bold mb-2 text-left">
            Confirm Signup
          </h2>
          <hr className="border-gray-300 mb-4" />
          <p className="font-karla tracking-tight text-black mb-6">
            Enter or paste the 6-digit OTP we just sent to <b>{email}</b> to
            complete your signup
          </p>
          <div className="flex justify-center items-center space-x-2 mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={otp[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                ref={(el: HTMLInputElement | null) => {
                  if (el) inputRefs.current[index] = el;
                }}
                className="w-12 h-12 text-2xl border border-gray-300 rounded text-center focus:outline-none"
              />
            ))}
          </div>
          <div className="flex justify-center">
            <PrimaryButton
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              onClick={handleConfirm}
              background="#4C28BC"
              hoverBackgroundColor="#351265"
              color="#fff"
              hoverColor="#fff"
              style={{ width: "95%" }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <span>VERIFYING...</span>
                  <CircularProgress
                    size={24}
                    color="inherit"
                    className="ml-2"
                  />
                </div>
              ) : (
                <span>CONFIRM</span>
              )}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPModal;
