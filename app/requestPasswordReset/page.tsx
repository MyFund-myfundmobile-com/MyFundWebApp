"use client";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { CircularProgress } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { mailOutline, checkmarkCircleOutline } from 'ionicons/icons';
import CustomSnackbar from "../components/snackbar";
import Title from "../components/title";
import Subtitle from "../components/subtitle";
import Image from "next/image";
import ResetPasswordModal from "./resetPasswordModal";

const RequestPasswordResetPage: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#351265';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePasswordResetRequest = async () => {
    setIsLoading(true);
    try {
      const payload = { email };

      console.log('API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/request-password-reset/`, payload);

      setIsLoading(false);
      setSnackbarSeverity('success');
      setSnackbarMessage('Password reset email sent successfully!');
      setSnackbarOpen(true);

      setTimeout(() => {
        setIsResetPasswordModalOpen(true); // Open the reset password modal
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      let errorMsg = 'Something went wrong. Please try again.';
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          errorMsg = error.response.data.email
            ? 'Invalid email address.'
            : 'Please enter a valid email address.';
        } else if (error.response?.status === 500) {
          errorMsg = 'Internal server error. Please try again later.';
        } else {
          errorMsg = error.response?.data.detail || errorMsg;
        }
      }
      setErrorMessage(errorMsg);
      setSnackbarSeverity('error');
      setSnackbarMessage(errorMsg);
      setSnackbarOpen(true);
    }
  };

  const handleResetPassword = (data: any) => {
    console.log('Reset password data:', data);
    // Implement the logic for handling the reset password data
  };

  return (
    <section className="bg-customPurple">
      <div className="bg-customPurple flex flex-col items-center justify-center h-screen">
        <div className="max-w-xl px-5 py-16 text-center md:px-10 md:py-24 lg:py-32 bg-white rounded-lg shadow-lg">
          <div className="items-center" style={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', alignSelf: 'center' }}>
            <Image height={60} width={60} src="/images/logo.png" alt="Company Logo" className="mb-18 text-center items-center" style={{ alignSelf: 'center', marginTop: -45 }} />
          </div>
          <Title>Reset Password</Title>
          <Subtitle>Enter the email address you use for MyFund, and we&apos;ll help you create a new password.</Subtitle>
          
          <form className="mx-auto mt-10 mb-4 max-w-lg pb-4" name="wf-form-request-password-reset" method="get">
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
              />
            </div>

            <div className="flex mb-4 justify-center items-center">
              <a
                className="block rounded-xl bg-[#4C28BC] w-full py-4 text-center cursor-pointer font-semibold text-white"
                style={{ boxShadow: '6px 6px #351265' }}
                onClick={handlePasswordResetRequest}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span>RESETTING...</span>
                    <CircularProgress size={24} color="inherit" className="ml-2" />
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
        onResetPassword={handleResetPassword}
      />
    </section>
  );
};

export default RequestPasswordResetPage;
