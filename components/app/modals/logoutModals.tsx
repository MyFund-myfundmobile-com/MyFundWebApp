"use client";
import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import Modal from "@/components/modal";
import { logOutOutline } from "ionicons/icons";
import axios from "axios";
import CustomSnackbar from "@/components/snackbar";
import { deleteCookie } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const [loggingOutButtonText, setLoggingOutButtonText] =
    useState<React.ReactNode>("Yes, Logout");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const router = useRouter();

  const handleLogoutConfirm = async () => {
    setLoggingOutButtonText(
      <div className="flex items-center justify-center">
        <CircularProgress
          size={20}
          color="inherit"
          className="mr-2"
        />
        LOGGING OUT...
      </div>
    ); // Change button text to "LOGGING OUT..."

    try {
      console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout/`,
        {}
      );

      if (response.status === 200) {
        setSnackbarMessage("Logging you out...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        sessionStorage.clear();
        localStorage.clear();
        deleteCookie("userToken");
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });

        // Redirect to login page
        router.push("login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      setSnackbarMessage("Logout failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Log Out Confirmation"
        body="Are you sure you want to logout of MyFund?"
        buttonText={loggingOutButtonText}
        onButtonClick={handleLogoutConfirm}
        modalIcon={logOutOutline} // Pass the logout icon as modalIcon prop
        iconColor="#8B4513" // Change the icon color to brown
        zIndex={200}
      />

      {/* Snackbar for showing logout result */}
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setOpenSnackbar(false)}
      />
    </>
  );
};

export default LogoutModal;
