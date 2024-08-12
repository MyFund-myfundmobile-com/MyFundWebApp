"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import CustomSnackbar from "@/app/components/snackbar";
import Modal from "@/app/components/modal";
import Confetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";
import { fetchUserInfo } from "@/app/Redux store/actions";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: any;
  number: string;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, number }) => {
  const [otp, setOTP] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any);
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

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
    } else if (e.key === "Enter" && otp.every((o) => o !== "")) {
      handleConfirm();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      setOTP(pasteData.split(""));
      inputRefs.current[5].focus();
    }
  };

  // Inside the handleConfirm function, update the payload and response handling

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/submit_otp/`,
        {
          entered_otp: otp.join(""), // Ensure this matches the backend expected key
          reference: "reference", // Ensure this matches the backend expected key
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response based on the backend logic
      if (response.data.data.status === "success") {
        setSnackbarMessage("OTP Verification Successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setSuccessModalOpen(true);

        // Optionally dispatch actions or perform additional success logic here
      } else if (response.data.data.status === "failed") {
        setSnackbarMessage(
          "OTP Verification Failed. Please check and try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(
          "Unexpected response from the server. Please try again later."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
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

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          if (successModalOpen) {
            setSuccessModalOpen(false);
          }
        }}
        header="Enter OTP"
        body={
          <div>
            <p className="font-karla tracking-tight text-black mb-6">
              Hey {userInfo?.firstName}, <br />
              <br />
              Kindly enter the OTP sent to your registered phone number{" "}
              <span className="font-bold font-proxima">{number}</span> to
              complete your QuickSave.
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
          </div>
        }
        buttonText={isLoading ? "VERIFYING..." : "CONFIRM"}
        onButtonClick={handleConfirm}
        buttonDisabled={otp.some((o) => o === "")}
        startIcon={null}
        className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
        zIndex={50}
      />

      {successModalOpen && (
        <Modal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          header="Success!"
          body={
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Confetti />
              </div>
              <p className="font-karla text-black mb-4">
                Your QuickSave has been successfully processed!
              </p>
            </div>
          }
          buttonText="CLOSE"
          onButtonClick={() => setSuccessModalOpen(false)}
          startIcon={null}
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
          zIndex={50}
        />
      )}
    </>
  );
};

export default OTPModal;
