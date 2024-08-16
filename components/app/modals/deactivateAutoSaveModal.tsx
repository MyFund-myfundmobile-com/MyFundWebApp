"use client";

import React, { useState } from "react";
import Modal from "@/components/modal";
import { IonIcon } from "@ionic/react";
import {
  closeOutline,
  helpOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { CircularProgress } from "@mui/material";
import { PrimaryButton } from "@/components/Buttons/MainButtons";
import Confetti from "react-confetti";
import CustomSnackbar from "@/components/snackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux store/store";
import { RootState } from "@/Redux store/store";
import {
  fetchAutoSaveSettings,
  updateAutoSaveSettings,
} from "@/Redux store/actions";
import axios from "axios";

interface DeactivateAutoSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeactivate: () => void;
}

const DeactivateAutoSaveModal: React.FC<DeactivateAutoSaveModalProps> = ({
  isOpen,
  onClose,
  onDeactivate,
}) => {
  const [processing, setProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const autoSaveSettings = useSelector(
    (state: RootState) => state.auth.autoSaveSettings
  );

  const handleDeactivate = async () => {
    if (!token) {
      setSnackbarMessage(
        "Authentication token is missing. Please log in again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setProcessing(true); // Start loading indicator

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deactivate-autosave/`,
        {
          frequency: autoSaveSettings?.frequency,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.status === 200 &&
        response.data.message === "AutoSave deactivated"
      ) {
        // Update state with all required properties
        dispatch(fetchAutoSaveSettings(token)); // Fetch updated settings
        if (autoSaveSettings) {
          dispatch(
            updateAutoSaveSettings({
              active: false,
              amount: autoSaveSettings.amount, // Retain current amount
              frequency: autoSaveSettings.frequency, // Retain current frequency
              autosave_enabled: autoSaveSettings.autosave_enabled, // Optional
            })
          );
        } else {
          dispatch(
            updateAutoSaveSettings({
              active: false,
              amount: 0, // Provide default value if autoSaveSettings is undefined
              frequency: "None", // Provide default value
            })
          );
        }
        setProcessing(false); // Stop loading indicator
        setSnackbarMessage("AutoSave successfully deactivated!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setShowSuccessModal(true);
        setShowConfetti(true);
        onDeactivate();
      } else {
        setProcessing(false); // Stop loading indicator
        setSnackbarMessage(
          "AutoSave Deactivation Failed. Please try again later."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deactivating AutoSave:", error);
      setProcessing(false); // Stop loading indicator
      setSnackbarMessage(
        "Failed to deactivate AutoSave. Please check your connection and try again later."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Deactivate AutoSave"
        body={
          <div>
            <p className="text-center text-black mb-6">
              Are you sure you want to deactivate AutoSave?
            </p>
          </div>
        }
        buttonText={
          processing ? (
            <div className="flex items-center">
              <CircularProgress
                size={24}
                color="inherit"
                style={{ marginRight: 8 }}
              />
              Deactivating AutoSave...
            </div>
          ) : (
            "Yes, Deactivate!"
          )
        }
        onButtonClick={handleDeactivate}
        zIndex={200}
        modalIcon={helpOutline} // Use the question mark icon here
        iconColor="#4c28bc"
      />

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setShowConfetti(false);
        }}
        header="AutoSave Deactivated!"
        body={`You have successfully deactivated AutoSave. Your settings have been updated accordingly.`}
        buttonText="OK"
        modalIcon={checkmarkCircleOutline}
        iconColor="green"
        startIcon={
          processing ? (
            <CircularProgress
              size={20}
              style={{ color: "green" }}
            />
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
          onClose(); // Close both modals
        }}
        zIndex={200}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
        </div>
      </Modal>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default DeactivateAutoSaveModal;
