"use client";

import React, { useState, useEffect } from "react";
import {
  Chip,
  TextField,
  IconButton,
  MenuItem,
  Select,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import { IonIcon } from "@ionic/react";
import {
  happyOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
} from "ionicons/icons";
import { Add } from "@mui/icons-material";
import Modal from "@/app/components/modal";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import Confetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/Redux store/store";
import { fetchUserInfo, fetchAllUsers } from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import CustomSnackbar from "@/app/components/snackbar"; // Import Snackbar component for notifications
import { SelectChangeEvent } from "@mui/material";

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (subject: string, recipients: string[]) => void;
  htmlContent: string;
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({
  isOpen,
  onClose,
  onSend,
  htmlContent,
}) => {
  const [category, setCategory] = useState("RECIPIENTS");
  const [subject, setSubject] = useState("");
  const [sender, setSender] = useState("MyFund <info@myfundmobile.com>");
  const [isSenderEditable, setIsSenderEditable] = useState(false);

  const [recipients, setRecipients] = useState<string[]>([]);
  const [recipientInput, setRecipientInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [savedRecipients, setSavedRecipients] = useState<string[]>([]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEmojiPickerForSubject, setShowEmojiPickerForSubject] =
    useState(false);

  const [failedEmails, setFailedEmails] = useState<string[]>([]); // Declare failedEmails state

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const totalUsers = useSelector(
    (state: RootState) => state.auth.allUsers?.length || 0
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const allUsers = useSelector((state: RootState) => state.auth.allUsers);
  useEffect(() => {
    if (category === "ALL USERS" && allUsers) {
      const emailList = allUsers.map((user) => user.email);
      console.log("Email List for ALL USERS:", emailList); // Log email list to the console
      setRecipients(emailList); // Update recipients state with all user emails
    }
  }, [category, allUsers]);

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const newCategory = event.target.value;

    if (newCategory === "ALL USERS") {
      // Save current recipients before switching to ALL USERS
      setSavedRecipients(recipients);

      if (allUsers) {
        const emailList = allUsers.map((user) => user.email);
        setRecipients(emailList); // Update recipients state with all user emails
      }
    } else if (newCategory === "RECIPIENTS") {
      // Restore previous recipients when switching back to RECIPIENTS
      setRecipients(savedRecipients);
      setRecipientInput("");
    }

    setCategory(newCategory);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any);
      dispatch(fetchAllUsers(token) as any).finally(() => setLoading(false));
    }
  }, [dispatch, token]);

  useEffect(() => {
    console.log("All users have been fetched successfully:", totalUsers); // Add this line
  }, [totalUsers]);

  const clearAllRecipients = () => {
    setRecipients([]);
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData("text");
      if (pastedText) {
        // Extract emails using a regular expression for email validation
        const emailPattern =
          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const emails = (pastedText.match(emailPattern) || []) // Ensure emails is always an array
          .map((email: string) => email.trim().toLowerCase()) // Type assertion to string[]
          .filter((email) => email && !recipients.includes(email));

        if (emails.length > 0) {
          setRecipients((prevRecipients) => [...prevRecipients, ...emails]);
          setRecipientInput("");
        }
      }
    };

    const inputElement = document.getElementById("recipient-input");
    if (inputElement) {
      inputElement.addEventListener("paste", handlePaste);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("paste", handlePaste);
      }
    };
  }, [recipients]);

  const handleRecipientInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipientInput(event.target.value);
  };

  const handleRecipientInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (["Enter", ",", ";", " "].includes(event.key)) {
      event.preventDefault();
      addRecipient();
    }
  };

  const handleRecipientInputBlur = () => {
    // if (recipientInput) {
    //   addRecipient();
    // }
  };

  const addRecipient = () => {
    const emails = recipientInput
      .split(/[\s,;]+/)
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email && !recipients.includes(email));
    if (emails.length > 0) {
      setRecipients([...recipients, ...emails]);
      setRecipientInput("");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter((recipient) => recipient !== email));
  };

  const handleButtonClick = () => {
    handleSend(subject, recipients);
  };

  const handleSend = async (subject: string, recipients: string[]) => {
    if (!token) {
      setSnackbarMessage(
        "Authentication token is missing. Please log in again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    console.log("Sender:", sender);
    console.log("Subject:", subject);
    console.log("Recipients:", recipients);
    console.log("HTML Content:", htmlContent);

    setIsSending(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email/`,
        {
          sender,
          subject,
          body: htmlContent,
          recipients,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 207) {
        const { failedEmails } = response.data;
        setFailedEmails(failedEmails || []); // Store failed emails in state
        setShowSuccessModal(true);
        setSnackbarMessage(
          "Your email has been successfully sent to the selected recipients."
        );
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Failed to send email. Please try again.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSnackbarMessage(
        "An error occurred while sending the email. Please try again later."
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      setIsSending(false); // Stop the sending animation
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Send As Email..."
        body={
          <div>
            <div className="mt-4 mb-4">
              <TextField
                label="Sender"
                placeholder="Enter sender email..."
                fullWidth
                variant="outlined"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                disabled={!isSenderEditable}
                InputProps={{
                  style: { backgroundColor: "#FFFFFF" },
                  startAdornment: isSenderEditable ? null : (
                    <InputAdornment
                      position="start"
                      className="text-green-600"
                      style={{ color: "green" }}
                    >
                      <IonIcon
                        icon={checkmarkCircle}
                        color="green"
                        style={{ fontSize: 22, color: "green" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setIsSenderEditable(!isSenderEditable)} // Toggle edit mode
                        className="hover:bg-gray-200 rounded-md p-1"
                      >
                        <div
                          className="font-karla text-sm tracking-tight italic bg-gray-200 rounded-md px-2 py-1 mr--5"
                          style={{ marginRight: -6 }}
                        >
                          {isSenderEditable ? "Save" : "Edit Sender"}
                        </div>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isSenderEditable ? "red" : "grey", // Red border if editing
                      borderWidth: isSenderEditable ? "2px" : "1px", // Thicker red border if editing
                    },
                    "&:hover fieldset": {
                      borderColor: isSenderEditable ? "red" : "grey", // Red border on hover if editing
                      borderWidth: isSenderEditable ? "2px" : "1px", // Maintain thicker red border on hover if editing
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isSenderEditable ? "red" : "grey", // Red border when focused if editing
                      borderWidth: isSenderEditable ? "2px" : "1px", // Thicker red border when focused if editing
                    },
                  },
                }}
              />
            </div>

            <TextField
              id="subject-field"
              label="Subject"
              placeholder="Enter subject..."
              fullWidth
              variant="outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              InputProps={{
                style: { backgroundColor: "#FFFFFF" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowEmojiPickerForSubject(!showEmojiPickerForSubject)
                      }
                    >
                      <IonIcon icon={happyOutline} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {showEmojiPickerForSubject && (
              <div style={{ position: "absolute", zIndex: 1000 }}>
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    const inputElement = document.getElementById(
                      "subject-field"
                    ) as HTMLInputElement;
                    const cursorPosition = inputElement.selectionStart || 0;
                    const newText =
                      subject.slice(0, cursorPosition) +
                      emojiData.emoji +
                      subject.slice(cursorPosition);
                    setSubject(newText);
                    setShowEmojiPickerForSubject(false);
                    inputElement.focus();
                  }}
                />
              </div>
            )}

            <Select
              value={category}
              onChange={handleCategoryChange} // Updated handler
              fullWidth
              variant="outlined"
              className="mt-4 font-proxima bg-white"
            >
              <MenuItem className="font-proxima" value="RECIPIENTS">
                ENTER RECIPIENTS
              </MenuItem>
              <MenuItem className="font-proxima" value="ALL USERS">
                ALL USERS
              </MenuItem>
            </Select>

            {category === "ALL USERS" ? (
              <div
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Subtitle style={{ alignSelf: "center" }}>
                  Total number of users selected:
                </Subtitle>
                <Title
                  style={{
                    fontSize: 115,
                    alignSelf: "center",
                    marginTop: -5,
                    color: "#BB9CE8",
                  }}
                >
                  {loading ? "Loading..." : totalUsers}
                </Title>
              </div>
            ) : (
              <div className="mt-5">
                <TextField
                  id="recipient-input"
                  placeholder="Enter or paste emails..."
                  label="Send to..."
                  className="bg-white"
                  fullWidth
                  variant="outlined"
                  value={recipientInput}
                  onChange={handleRecipientInputChange}
                  onKeyDown={handleRecipientInputKeyDown}
                  onBlur={handleRecipientInputBlur}
                  InputProps={{
                    style: { backgroundColor: "#FFFFFF" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="font-karla text-sm tracking-tight italic bg-gray-200 rounded-md px-2 py-1 mr--5">
                          BCC:
                        </span>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setRecipientInput("")} // Clears the input field
                          className="hover:bg-gray-200 rounded-md p-1"
                        >
                          <CloseIcon style={{ color: "#666" }} />{" "}
                          {/* Use Close icon */}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <div className="relative" style={{ marginTop: "10px" }}>
                  {" "}
                  {/* Added margin for spacing */}
                  <div
                    className="flex flex-wrap"
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                  >
                    {recipients.map((email, index) => (
                      <Chip
                        key={index}
                        label={email}
                        onDelete={() => removeRecipient(email)}
                        className="m-1"
                      />
                    ))}
                  </div>
                  {recipients.length > 0 && (
                    <IconButton
                      onClick={clearAllRecipients}
                      className="hover:bg-gray-200 rounded-md p-1"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "50%", // Align vertically to the middle
                        transform: "translateY(-50%)", // Adjust to ensure perfect centering
                      }}
                    >
                      <CloseIcon style={{ color: "#666" }} />
                    </IconButton>
                  )}
                </div>

                <div
                  className="text-gray-500 italic text-sm text-center mt-2"
                  style={{ fontFamily: "Karla", fontSize: 15 }}
                >
                  Separate multiple emails with space, comma, colon or enter.
                </div>
                {recipients.length > 0 && (
                  <div
                    style={{
                      alignContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <Subtitle style={{ alignSelf: "center" }}>
                      Total number of users entered:
                    </Subtitle>
                    <Title
                      style={{
                        fontSize: 115,
                        alignSelf: "center",
                        marginTop: -5,
                        color: "#BB9CE8",
                      }}
                    >
                      {recipients.length}
                    </Title>
                  </div>
                )}
              </div>
            )}
          </div>
        }
        buttonText={
          isSending ? (
            <div className="flex items-center">
              <CircularProgress size={24} className="mr-2" />
              Sending...
            </div>
          ) : (
            "Send Now"
          )
        }
        onButtonClick={handleButtonClick} // Use wrapper function
        modalIcon=""
        iconColor=""
        zIndex={200}
        buttonDisabled={category !== "ALL USERS" && recipients.length === 0}
      />

      {showSuccessModal && (
        <Modal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            setShowConfetti(false);
          }}
          header="Email Sending Results"
          body={
            snackbarSeverity === "success"
              ? "Your email has been successfully sent to the selected recipients."
              : `Some emails were not sent successfully. Please check the following addresses: ${failedEmails.join(
                  ", "
                )}`
          }
          buttonText="OK"
          modalIcon={checkmarkCircleOutline}
          iconColor={snackbarSeverity === "success" ? "green" : "red"}
          onButtonClick={() => {
            setShowSuccessModal(false);
            setShowConfetti(false);
          }}
          zIndex={201}
        />
      )}

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default SendEmailModal;
