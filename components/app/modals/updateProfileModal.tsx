"use client";
import React, { useState } from "react";
import { TextField, CircularProgress } from "@mui/material";
import Modal from "@/components/modal";
import { IonIcon } from "@ionic/react";
import { arrowUpOutline, checkmarkCircleOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/Redux store/store";
import { updateUserProfile } from "@/Redux store/actions";
import CustomSnackbar from "@/components/snackbar";
import Confetti from "react-confetti";
import useWindowWidth from "@/lib/useWindowWidth";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.mobileNumber || "");
  const [updating, setUpdating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleUpdateProfile = async () => {
    const updatedProfile = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };

    setUpdating(true);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-user-profile/`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(updateUserProfile(updatedProfile));
        setShowConfetti(true); // Activate confetti on success
        setUpdating(false);
        setSnackbarMessage("Profile updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setShowSuccessModal(true);
      } else {
        console.log("Profile update failed:", response.data);
        setSnackbarMessage("Profile update failed.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setUpdating(false);
      }
    } catch (error) {
      console.log("Profile update error:", error);
      setSnackbarMessage("Profile update error.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setUpdating(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Edit Profile"
        body={
          <>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={userInfo?.email}
              disabled
              className="mb-4 mt-4"
              style={{ marginBottom: 15 }}
            />
          </>
        }
        buttonText={updating ? "Updating Profile..." : "Update"}
        onButtonClick={handleUpdateProfile}
        startIcon={
          updating ? (
            <CircularProgress
              size={20}
              color="inherit"
            />
          ) : (
            <IonIcon
              icon={arrowUpOutline}
              style={{ fontSize: "20px", marginRight: 5 }}
            />
          )
        }
        zIndex={100}
        confettiAnimation={true}
      />
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Profile Info Updated!"
        body="Your profile information has been updated successfully!"
        buttonText="OK"
        onButtonClick={handleCloseSuccessModal}
        modalIcon={checkmarkCircleOutline} // Use checkmark icon if needed
        iconColor="green"
        zIndex={200}
        confettiAnimation={true} // Add confetti animation prop if needed
      >
        {showConfetti && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
            <Confetti
              width={windowWidth}
              height={window.innerHeight}
            />
          </div>
        )}
      </Modal>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
    </>
  );
};

export default UpdateProfileModal;
