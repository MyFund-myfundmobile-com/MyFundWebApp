"use client";
import React, { useState } from "react";
import Modal from "@/app/components/modal";
import { IonIcon } from "@ionic/react";
import {
    closeOutline,
    helpOutline,
    checkmarkCircleOutline,
} from "ionicons/icons";
import { CircularProgress } from "@mui/material";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import Confetti from "react-confetti";
import CustomSnackbar from "@/app/components/snackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";
import {
    fetchAutoInvestSettings,
    updateAutoInvestSettings,
} from "@/app/Redux store/actions";
import axios from "axios";

interface DeactivateAutoInvestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeactivate: () => void;
}

const DeactivateAutoInvestModal: React.FC<DeactivateAutoInvestModalProps> = ({
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

    const autoInvestSettings = useSelector(
        (state: RootState) => state.auth.autoInvestSettings
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
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deactivate-autoinvest/`,
                {
                    frequency: autoInvestSettings?.frequency,
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
                response.data.message === "AutoInvest deactivated"
            ) {
                // Update state with all required properties
                dispatch(fetchAutoInvestSettings(token)); // Fetch updated settings
                if (autoInvestSettings) {
                    dispatch(
                        updateAutoInvestSettings({
                            active: false,
                            amount: autoInvestSettings.amount, // Retain current amount
                            frequency: autoInvestSettings.frequency, // Retain current frequency
                            autoinvest_enabled: autoInvestSettings.autoinvest_enabled, // Optional
                        })
                    );
                } else {
                    dispatch(
                        updateAutoInvestSettings({
                            active: false,
                            amount: 0, // Provide default value if autoInvestSettings is undefined
                            frequency: "None", // Provide default value
                        })
                    );
                }
                setProcessing(false); // Stop loading indicator
                setSnackbarMessage("AutoInvest successfully deactivated!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setShowSuccessModal(true);
                setShowConfetti(true);
                onDeactivate();
            } else {
                setProcessing(false); // Stop loading indicator
                setSnackbarMessage(
                    "AutoInvest Deactivation Failed. Please try again later."
                );
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error deactivating AutoInvest:", error);
            setProcessing(false); // Stop loading indicator
            setSnackbarMessage(
                "Failed to deactivate AutoInvest. Please check your connection and try again later."
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
                header="Deactivate AutoInvest"
                body={
                    <div>
                        <p className="text-center text-black mb-6">
                            Are you sure you want to deactivate AutoInvest?
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
                            Deactivating AutoInvest...
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
                <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}

            <Modal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    setShowConfetti(false);
                }}
                header="AutoInvest Deactivated!"
                body={`You have successfully deactivated AutoInvest. Your settings have been updated accordingly.`}
                buttonText="OK"
                modalIcon={checkmarkCircleOutline}
                iconColor="green"
                startIcon={
                    processing ? (
                        <CircularProgress size={20} style={{ color: "green" }} />
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
                        <Confetti width={window.innerWidth} height={window.innerHeight} />
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

export default DeactivateAutoInvestModal;
