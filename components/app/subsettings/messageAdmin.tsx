"use client";
import React, { useState, useEffect } from "react";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import { IonIcon } from "@ionic/react";
import {
  chatbubbleEllipsesOutline,
  sendOutline,
  happyOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { PrimaryButton } from "@/components/Buttons/MainButtons";
import Modal from "@/components/modal";
import Confetti from "react-confetti";
import Image from "next/image";
import CustomSnackbar from "@/components/snackbar";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux store/store";
import { fetchUserInfo } from "@/Redux store/actions";
import { AppDispatch } from "@/Redux store/store";
import { closeCircleOutline, attachOutline, helpOutline } from "ionicons/icons";
import EmojiPicker from "emoji-picker-react"; // or the correct path if using a custom component
import useWindowWidth from "@/lib/useWindowWidth";

const MessageAdmin: React.FC = () => {
  const windowWidth = useWindowWidth();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // New state for showing emoji picker
  const [attachmentImage, setAttachmentImage] = useState<{
    uri: string;
  } | null>(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any); // Dispatch fetchUserInfo action with type assertion to any
    }
  }, [dispatch, token]);

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setAttachmentImage({ uri: reader.result as string });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSendClick = () => {
    if (message.split(" ").length < 5) {
      setSnackbarMessage("Message must contain at least 5 words.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleConfirmSend = async () => {
    setShowConfirmationModal(false);
    setSending(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/message-admin/`,
        {
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbarMessage("Message sent successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setMessage(""); // Clear the message field
    } catch (error) {
      // Handle error
      setSnackbarMessage("Failed to send message. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  console.log("Message typed:", message);

  return (
    <Box
      className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]"
      style={{ padding: "36px", borderRadius: "8px", backgroundColor: "white" }}
    >
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Message Admin</Title>
          <Subtitle style={{ marginTop: -5 }}>
            Send a message to the administrator.
          </Subtitle>
        </div>
        <div className="flex items-center">
          {/* Updated WhatsApp Button */}
          <a
            href="http://wa.me/2349032719396"
            target="_blank" // Opens in a new window
            rel="noopener noreferrer"
            className="flex items-center bg-green-600 text-white rounded-lg px-4 py-2 font-product-sans uppercase font-bold text-sm cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:bg-green-700"
            style={{ letterSpacing: 0.5, marginTop: 1 }}
          >
            <Image
              src="/images/whatsapp.png"
              alt="WhatsApp Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            <span>Live Chat Admin Instead</span>
          </a>
        </div>
      </div>

      <div
        className="rounded-lg p-4 mt-4 sm:p-6 grid grid-cols-[auto,1fr] items-start overflow-hidden"
        style={{
          backgroundColor: "#DCD1FF",
          color: "black",
          fontFamily: "Karla",
          fontSize: 14,
          marginBottom: "16px",
        }}
      >
        <IonIcon
          icon={chatbubbleEllipsesOutline}
          className="text-purple1 mr-4 self-center"
          style={{ fontSize: "48px" }}
        />
        <p
          className="overflow-auto"
          style={{ wordWrap: "break-word" }}
        >
          <span className="font-bold text-purple1">Message Admin:</span> Contact
          our support team for any assistance or inquiries - withdrawal
          requests, feedback, etc.
        </p>
      </div>

      <TextField
        label="Message"
        placeholder="At least 5 words..."
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          style: { backgroundColor: "#F7F5FF" },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <IonIcon icon={happyOutline} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {showEmojiPicker && (
        <div style={{ position: "absolute", zIndex: 1000 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {attachmentImage && (
        <Box className="mt-2">
          <Image
            src={attachmentImage.uri}
            alt="Attachment"
            width={100}
            height={100}
          />
          <IconButton onClick={() => setAttachmentImage(null)}>
            <IonIcon icon={closeCircleOutline} />
          </IconButton>
        </Box>
      )}

      <Box className="flex justify-center mt-4">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={handleSendClick}
          background={message.split(" ").length >= 5 ? "#4C28BC" : "#CCC"}
          hoverBackgroundColor={
            message.split(" ").length >= 5 ? "#351265" : "#CCC"
          }
          color="#fff"
          hoverColor="#fff"
          startIcon={
            sending ? (
              <CircularProgress
                size={20}
                color="inherit"
                style={{ marginRight: 5 }}
              />
            ) : (
              <IonIcon
                icon={sendOutline}
                style={{ fontSize: "20px", marginRight: 5 }}
              />
            )
          }
          style={{ width: "95%", letterSpacing: 0.5, marginTop: 5 }}
          disabled={message.split(" ").length < 5}
        >
          {sending ? "Sending..." : "Send Message"}
        </PrimaryButton>
      </Box>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Message Sent!"
        body="Thank you for reaching out. Our team will follow up with you via email shortly."
        buttonText="OK"
        onButtonClick={() => setShowSuccessModal(false)}
        modalIcon={checkmarkCircleOutline}
        iconColor="green"
        zIndex={200}
        confettiAnimation={true}
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

      <Modal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        header="Confirm Send Message"
        body="Are you sure you want to send this message to the admin?"
        buttonText="Yes, Message Admin"
        onButtonClick={handleConfirmSend}
        modalIcon={helpOutline}
        iconColor="blue"
        zIndex={200}
      />

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default MessageAdmin;
