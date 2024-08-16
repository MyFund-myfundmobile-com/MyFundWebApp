import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import Modal from "@/components/modal";
import BankOptions from "@/components/bankOptions";
import { briefcaseOutline } from "ionicons/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux store/store";
import { RootState } from "@/Redux store/store";
import { addBankAccount } from "@/Redux store/actions";
import { IonIcon } from "@ionic/react";
import CustomSnackbar from "@/components/snackbar";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

interface AddBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bankAccount: any) => void;
}

const AddBankModal: React.FC<AddBankModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [bank, setBank] = useState<any>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  const [resolvedAccountName, setResolvedAccountName] = useState("");
  const [isAccountNameResolved, setIsAccountNameResolved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Add states for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Snackbar handle close function
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (isOpen) {
      setBank(null);
      setAccountNumber("");
    }
  }, [isOpen]);

  const handleAccountNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setAccountNumber(value);

    if (value.length === 10 && bank) {
      setIsLoading(true);
      try {
        const accountName = await fetchAccountName(value, bank.code);
        setResolvedAccountName(accountName);
        setIsAccountNameResolved(true);
        setSnackbarMessage("Account name resolved successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        setResolvedAccountName("Account name not found. Please try again.");
        setIsAccountNameResolved(false);
        setSnackbarMessage("Account name not found. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResolvedAccountName("");
      setIsAccountNameResolved(false);
    }
  };

  const fetchAccountName = async (accountNumber: string, bankCode: string) => {
    try {
      const response = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PAYSTACK_LIVE_KEY}`,
          },
        }
      );
      return response.data.data.account_name;
    } catch (error) {
      console.error("Error fetching account name:", error);
      throw new Error("Account name not found. Please try again.");
    }
  };

  const handleProceed = async () => {
    setProcessing(true);
    try {
      const accountName = await fetchAccountName(
        accountNumber.trim(),
        bank?.code || "00000"
      );

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add-bank-account/`,
        {
          accountNumber: accountNumber.trim(),
          bankName: bank?.name || "Default Bank",
          accountName,
          bankCode: bank?.code || "00000",
          bankColor: bank?.color || "#4c28bc", // Ensure bank.color is defined
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSnackbarMessage("Bank account added successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        // Delay to show the snackbar before closing the modal
        setTimeout(() => {
          onSuccess(response.data); // Pass the bank account details to the parent component
          onClose();
        }, 1000); // Adjust delay as needed
      }
    } catch (error) {
      console.error("Error adding bank account:", error);
      setSnackbarMessage(
        "This bank account is already associated with another user. Please try another."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Add Bank Account"
      body={
        <>
          <BankOptions
            value={bank}
            onChange={(value) => setBank(value)}
          />
          <TextField
            label="Bank Account Number"
            fullWidth
            variant="outlined"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IonIcon icon={briefcaseOutline} />
                </InputAdornment>
              ),
              style: { backgroundColor: "white" },
            }}
            placeholder="1234567890"
            style={{ marginTop: "16px" }}
          />

          <TextField
            label="Account Name"
            fullWidth
            variant="outlined"
            value={resolvedAccountName}
            disabled
            InputProps={{
              style: { color: isAccountNameResolved ? "green" : "red" },
              endAdornment: (
                <InputAdornment position="end">
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    isAccountNameResolved && (
                      <CheckCircleOutline style={{ color: "green" }} />
                    )
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input": {
                WebkitTextFillColor: isAccountNameResolved ? "green" : "red",
              },
            }}
            style={{ marginTop: "16px" }}
          />

          <CustomSnackbar
            open={snackbarOpen}
            message={snackbarMessage}
            severity={snackbarSeverity}
            handleClose={handleSnackbarClose}
          />

          <p className="font-karla text-gray-500 mt-2 text-xs text-center">
            This bank account can only be used by you to receive money.
          </p>
        </>
      }
      buttonText={processing ? "Processing..." : "Add Bank Account"}
      onButtonClick={handleProceed}
      startIcon={
        processing ? (
          <CircularProgress
            size={20}
            color="inherit"
          />
        ) : (
          <IonIcon
            icon={briefcaseOutline}
            style={{ fontSize: "20px", marginRight: 5 }}
          />
        )
      }
      zIndex={100}
    />
  );
};

export default AddBankModal;
