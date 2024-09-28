"use client";
import { bankOptions } from "@/components/bankOptions";
import Modal from "@/components/modal";
import { IonIcon } from "@ionic/react";
import { Close } from "@mui/icons-material";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  arrowDownOutline,
  briefcase,
  checkmarkCircle,
  checkmarkCircleOutline,
  sendOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

import {
  fetchAccountBalances,
  fetchTopSaversData,
  fetchUserBankAccounts,
  fetchUserInfo,
  fetchUserTransactions,
} from "@/Redux store/actions";
import { AppDispatch, RootState } from "@/Redux store/store";
import { useDispatch, useSelector } from "react-redux";

import Section from "@/components/section";
import CustomSnackbar from "@/components/snackbar";
import axios, { AxiosError } from "axios";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultWithdrawFrom: string;
}

interface ErrorResponse {
  error: string;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  defaultWithdrawFrom,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [userLastName, setUserLastName] = useState(""); // Fix typo here
  const [userDetails, setUserDetails] = useState<string | null>(null);

  const [withdrawFrom, setWithdrawFrom] = useState<string>(defaultWithdrawFrom);
  const [withdrawTo, setWithdrawTo] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isResolving, setIsResolving] = useState<boolean>(false);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedBankAccount, setSelectedBankAccount] = useState(""); // Define state for selected bank account

  // Add states for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const token = useSelector((state: RootState) => state.auth.token) || ""; // Fallback to empty string if token is null
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const cards = useSelector((state: RootState) => state.auth.cards);
  const accountSavedBalance = useSelector(
    (state: RootState) => state.auth.accountBalances.savings
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserTransactions(token));
      dispatch(fetchUserInfo(token) as any); // Dispatch fetchUserInfo action with type assertion to any
      dispatch(fetchUserBankAccounts(token as string)); // Ensure token is of type string
      dispatch(fetchAccountBalances(token));
    }
  }, [dispatch, token]);

  const accountBalances = useSelector(
    (state: RootState) => state.auth.accountBalances
  );
  const bankAccounts = useSelector(
    (state: RootState) => state.auth.bankAccounts
  );

  const getBankColor = (bankCode: string) => {
    const bank = bankOptions.find((option) => option.code === bankCode);
    return bank ? bank.color : "#4c28bc"; // Default color if not found
  };

  const { push: navigate } = useRouter(); // Move useNavigate here

  const handleNavigateToAddBankAccount = () => {
    navigate(
      "/App/settings?triggerAddBank=true&triggerCardAndBankSettings=true"
    );
  };

  useEffect(() => {
    setWithdrawFrom(defaultWithdrawFrom);
  }, [defaultWithdrawFrom]);

  const handleClearAmount = () => {
    setAmount("");
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000); // Hides confetti after 3 seconds
      return () => clearTimeout(timer); // Cleanup on unmount or when showConfetti changes
    }
  }, [showConfetti]);
  const formatAmount = (value: string) => {
    const cleanedValue = value.replace(/[^0-9]/g, ""); // Remove non-digit characters
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format with commas
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatAmount(event.target.value));
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setShowConfetti(false);
    onClose();
  };

  const formatAmountWithCommas = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formattedSavings = formatAmountWithCommas(
    Number(accountBalances.savings)
  );
  const formattedInvestment = formatAmountWithCommas(
    Number(accountBalances.investment)
  );
  const formattedWallet = formatAmountWithCommas(
    Number(accountBalances.wallet)
  );

  const handleWithdraw = () => {
    const requestedAmount = parseFloat(amount.replace(/,/g, ""));
    if (!amount || requestedAmount <= 0) {
      setSnackbarMessage("Please enter a valid amount.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setIsSending(true);

    if (withdrawFrom === "Savings" && withdrawTo === "Investment") {
      handleSavingsToInvestmentTransfer();
    }
    if (withdrawFrom === "Wallet" && withdrawTo === "Savings") {
      handleWalletToSavingsTransfer();
    }
    if (withdrawFrom === "Wallet" && withdrawTo === "Investment") {
      handleWalletToInvestmentTransfer();
    }
    if (withdrawFrom === "Wallet" && withdrawTo === "Another User") {
      transferToWallet(); // Call the transfer function
    }
    if (
      withdrawFrom === "Savings" ||
      withdrawFrom === "Investment" ||
      withdrawFrom === "Wallet"
    ) {
      handleWithdrawToBankAccount(); // Call the unified withdraw function
    }
    // Other transfer cases can go here...
  };

  const handleWithdrawToBankAccount = async () => {
    setIsSending(true);
    let sourceAccountBalance;
    try {
      switch (withdrawFrom) {
        case "Savings":
          sourceAccountBalance = accountBalances.savings;
          break;
        case "Investment":
          sourceAccountBalance = accountBalances.investment;
          break;
        case "Wallet":
          sourceAccountBalance = accountBalances.wallet;
          break;
        default:
          sourceAccountBalance = 0;
      }
      const requestedAmount = parseFloat(amount.replace(/,/g, ""));
      if (sourceAccountBalance < requestedAmount) {
        setIsSending(false);
        setSnackbarMessage("Insufficient funds. Please check and try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      const requestData = {
        source_account: withdrawFrom.toLowerCase(),
        target_bank_account_id: selectedBankAccount,
        amount: requestedAmount,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/withdraw-to-bank/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Withdrawal response:", response);
      if (response.status === 200 && response.data.success) {
        const responseData = response.data;
        dispatch(fetchUserTransactions(token));
        dispatch(fetchAccountBalances(responseData.updated_balance));
        dispatch(fetchTopSaversData(token));

        setSnackbarMessage("Payment sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setShowSuccessModal(true);
        setShowConfetti(true);
      } else {
        setSnackbarMessage(
          response.data.error || "An error occurred. Please try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;

      console.log(
        "Withdrawal Error:",
        axiosError.response ? axiosError.response.data : axiosError
      );
      setSnackbarMessage(
        axiosError.response?.data.error ||
          "Network error. Please check your connection."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleSavingsToInvestmentTransfer = async () => {
    setIsSending(true);
    try {
      const requestedAmount = parseFloat(amount.replace(/,/g, ""));
      const savingsBalance = accountBalances.savings;

      console.log("Requested Amount:", requestedAmount); // Debug Log
      console.log("Savings Balance:", savingsBalance); // Debug Log

      if (requestedAmount < 100000) {
        setSnackbarMessage(
          "Minimum amount for QuickInvest is 100,000. Please check and try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      if (requestedAmount > savingsBalance) {
        setSnackbarMessage(
          "Insufficient balance in your Savings account. Please check and try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setIsSending(false); // Stop the loading state
        console.log("Insufficient balance."); // Debug Log
        return; // Exit the function if balance is insufficient
      }
      const requestData = { amount: requestedAmount };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/savings-to-investment/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        dispatch(fetchUserTransactions(token));
        dispatch(fetchAccountBalances(response.data.newAccountBalances));
        dispatch(fetchTopSaversData(token));

        setSnackbarMessage("Transfer successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setShowSuccessModal(true);
        setShowConfetti(true);
      }
    } catch (error) {
      console.log("Error occurred:", error); // Debug Log
      setSnackbarMessage("An error occurred while processing your request.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleWalletToSavingsTransfer = async () => {
    setIsSending(true);
    try {
      const requestedAmount = parseFloat(amount.replace(/,/g, ""));
      const walletBalance = accountBalances.wallet;
      if (requestedAmount > walletBalance) {
        setSnackbarMessage(
          "Insufficient balance in your Wallet. Please check and try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setIsSending(false); // Stop the loading state
        return;
      }
      const requestData = { amount: requestedAmount };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet-to-savings/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const responseData = response.data;
        dispatch(fetchUserTransactions(token));
        dispatch(fetchAccountBalances(response.data.newAccountBalances));
        dispatch(fetchTopSaversData(token));

        setSnackbarMessage("Transfer successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setShowSuccessModal(true);
        setShowConfetti(true);
      }
    } catch (error) {
      console.error("Wallet to Savings Transfer Error:", error);
      setSnackbarMessage("An error occurred while processing your request.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleWalletToInvestmentTransfer = async () => {
    setIsSending(true);
    try {
      const requestedAmount = parseFloat(amount.replace(/,/g, ""));
      const walletBalance = accountBalances.wallet;
      if (requestedAmount < 100000) {
        setSnackbarMessage(
          "Minimum amount for QuickInvest is 100,000. Please check and try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      if (requestedAmount > walletBalance) {
        setSnackbarMessage(
          "Insufficient balance in your Wallet. Please check and try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setIsSending(false); // Stop the loading state
        return;
      }

      const requestData = { amount: requestedAmount };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet-to-investment/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        dispatch(fetchUserTransactions(token));
        dispatch(fetchAccountBalances(responseData.newAccountBalances));
        dispatch(fetchTopSaversData(token));

        setSnackbarMessage("Transfer successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setShowSuccessModal(true);
        setShowConfetti(true);
      }
    } catch (error) {
      console.error("Wallet to Investment Transfer Error:", error);
      setSnackbarMessage("An error occurred while processing your request.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSending(false);
    }
  };

  const transferToWallet = async () => {
    setIsSending(true); // Set sending state for button
    try {
      const requestedAmount = parseFloat(amount.replace(/,/g, ""));
      const walletBalance = accountBalances.wallet; // Assuming you have the wallet balance in your state
      if (requestedAmount > walletBalance) {
        setSnackbarMessage(
          "Insufficient balance in your Wallet. Please check and try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      const requestData = {
        recipient_email: userEmail, // Ensure this key matches your backend
        amount: requestedAmount,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet-to-wallet/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const responseData = response.data;
        dispatch(fetchUserTransactions(token));
        dispatch(fetchAccountBalances(responseData.newAccountBalances));
        dispatch(fetchTopSaversData(token));

        setSnackbarMessage("Payment sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setShowSuccessModal(true);
        setShowConfetti(true);
      } else {
        // Handle other response statuses
        if (response.status === 400) {
          setSnackbarMessage(
            "Invalid input. Please check your data and try again."
          );
        } else if (response.status === 401) {
          setSnackbarMessage("You are not authorized. Please login again.");
        } else {
          setSnackbarMessage(
            "An error occurred while processing your request. Please try again later."
          );
        }
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Wallet to Wallet Transfer Error:", error);
      setSnackbarMessage(
        "An error occurred while processing your request. Please check your network connection and try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSending(false); // Reset sending state
    }
  };

  const handleWithdrawFromChange = (event: SelectChangeEvent<string>) => {
    const selectedWithdrawFrom = event.target.value;
    setWithdrawFrom(selectedWithdrawFrom);
    switch (selectedWithdrawFrom) {
      case "Savings":
        setWithdrawTo("Investment"); // Default to Investment
        break;
      case "Investment":
        setWithdrawTo("Bank Account"); // Default to Bank Account
        break;
      case "Wallet":
        setWithdrawTo("Savings"); // Default to Savings
        break;
      default:
        setWithdrawTo(""); // Reset withdrawTo if no valid selection
    }
  };

  useEffect(() => {
    switch (withdrawFrom) {
      case "Savings":
        setWithdrawTo("Investment"); // Default to Investment
        break;
      case "Investment":
        setWithdrawTo("Bank Account"); // Default to Bank Account
        break;
      case "Wallet":
        setWithdrawTo("Savings"); // Default to Savings
        break;
      default:
        setWithdrawTo(""); // Reset withdrawTo if no valid selection
    }
  }, [withdrawFrom]);

  // Add Debug Logs
  useEffect(() => {
    console.log("withdrawFrom:", withdrawFrom);
    console.log("withdrawTo:", withdrawTo);
  }, [withdrawFrom, withdrawTo]);

  const handleWithdrawToChange = (event: SelectChangeEvent<string>) => {
    console.log("Withdraw to changed:", event.target.value);
    setWithdrawTo(event.target.value);
  };

  useEffect(() => {
    if (bankAccounts.length > 0) {
      setSelectedBankAccount(bankAccounts[0].id);
    }
  }, [bankAccounts]);

  const renderAdditionalFields = () => {
    if (withdrawTo === "Bank Account") {
      if (bankAccounts.length === 0) {
        return (
          <div
            className="text-center text-gray-600"
            style={{ marginBottom: 35, marginTop: 20, letterSpacing: -0.15 }}
          >
            <div>
              No account yet...{" "}
              <span
                className="font-bold font-proxima text-blue-500 cursor-pointer"
                onClick={handleNavigateToAddBankAccount}
              >
                Add Bank Account Now...
              </span>
            </div>
          </div>
        );
      }

      return (
        <FormControl
          fullWidth
          variant="outlined"
          className="mb-4 bg-white"
        >
          <InputLabel>Which of Your Bank Accounts</InputLabel>
          <Select
            label="Which of Your Bank Accounts"
            fullWidth
            variant="outlined"
            className="mb-4 bg-white"
            value={selectedBankAccount}
            onChange={(event) => {
              console.log("Selected value:", event.target.value);
              setSelectedBankAccount(event.target.value);
            }}
          >
            <MenuItem
              value=""
              disabled
            >
              Which of Your Bank Accounts...
            </MenuItem>
            {bankAccounts.map((account) => (
              <MenuItem
                key={account.id}
                value={account.id}
              >
                <div className="flex items-center">
                  <IonIcon
                    icon={briefcase}
                    style={{
                      fontSize: "24px",
                      color: getBankColor(account.bank_code),
                    }}
                  />
                  <span className="ml-2">
                    {account.bank_name} -{" "}
                    {`**** ${account.account_number.slice(-4)}`}
                  </span>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if (withdrawTo === "Another User") {
      return (
        <>
          <TextField
            fullWidth
            variant="outlined"
            className="bg-white"
            style={{ marginBottom: 10 }}
            label="Enter User's Email"
            value={userEmail}
            onChange={handleUserEmailChange}
            placeholder="Enter User's email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isResolving ? (
                    <CircularProgress size={20} /> // Show progress when resolving
                  ) : userFirstName && userLastName ? (
                    <IonIcon
                      icon={checkmarkCircleOutline}
                      className="text-green-500"
                      style={{ fontSize: "30px" }}
                    />
                  ) : null}
                </InputAdornment>
              ),
            }}
          />
          {userFirstName && userLastName && (
            <div
              className="flex items-center justify-end mb-4"
              style={{ marginTop: -30 }}
            >
              <Section
                className="text-sm text-green-700 mr-1"
                style={{ color: "green" }}
              >
                {userFirstName.toUpperCase()} {userLastName.toUpperCase()}
              </Section>
              <IonIcon
                icon={checkmarkCircle}
                className="text-green-500"
                style={{ fontSize: "20px", marginBottom: -20 }}
              />
            </div>
          )}
        </>
      );
    }
    return null;
  };

  const handleUserEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value; // Extract the value from event target
    setUserEmail(value);
    const isValidEmail = value.toLowerCase().endsWith(".com");

    if (isValidEmail) {
      const correctedEmail = encodeURIComponent(value); // Encode email before passing to API
      console.log("Corrected Email:", correctedEmail); // Log the corrected email for debugging
      setIsResolving(true);
      getUserDetailsByEmail(correctedEmail);
    } else {
      setUserDetails(null);
      setUserFirstName("");
      setUserLastName("");
      setIsResolving(false); // Stop circular progress if email is invalid
    }
  };

  const getUserDetailsByEmail = async (correctedEmail: string) => {
    setIsResolving(true);
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/get-user-by-email/?email=${correctedEmail.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsResolving(false);
        const userData = response.data;
        setUserFirstName(userData.first_name);
        setUserLastName(userData.last_name);
        setSnackbarOpen(true);
        setSnackbarMessage("User info successfully resolved");
        setSnackbarSeverity("success");
      } else {
        setIsResolving(false);
        setSnackbarOpen(true);
        setSnackbarMessage("Error resolving user info");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setIsResolving(false);
      setSnackbarOpen(true);
      setSnackbarMessage("User not found. Please check and try again.");
      setSnackbarSeverity("error");
    }
  };

  const presetAmounts =
    (withdrawFrom === "Savings" && withdrawTo === "Investment") ||
    (withdrawFrom === "Wallet" && withdrawTo === "Investment")
      ? [100000, 200000, 500000, 1000000, 2000000, 5000000]
      : [5000, 10000, 15000, 20000, 40000, 100000];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Withdraw"
        body={
          <div>
            <p>Move money from Savings to Investment or to your bank.</p>
            <br />

            <p>
              Immediate Withdrawal to{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                Bank Account
              </span>{" "}
              attracts...
              <ul>
                <li>
                  <span style={{ color: "brown", fontWeight: "bold" }}>
                    10%
                  </span>{" "}
                  charge if from{" "}
                  <span style={{ color: "#4C28BC", fontWeight: "bold" }}>
                    SAVINGS
                  </span>
                </li>
                <li>
                  <span style={{ color: "brown", fontWeight: "bold" }}>
                    15%
                  </span>{" "}
                  charge if from{" "}
                  <span style={{ color: "#4C28BC", fontWeight: "bold" }}>
                    INVESTMENT
                  </span>
                </li>
                <li>
                  <span style={{ color: "green", fontWeight: "bold" }}>0%</span>{" "}
                  charge if from{" "}
                  <span style={{ color: "#4C28BC", fontWeight: "bold" }}>
                    WALLET
                  </span>
                </li>
              </ul>
              <br />
              To schedule a withdrawal without charges, message admin with the
              withdrawal request{" "}
              <span className="text-italics font-italics">
                (30 days, if from Savings and 90 days, if from Investment).
              </span>
            </p>
            <br />

            <FormControl
              fullWidth
              variant="outlined"
              className="mb-5"
            >
              <InputLabel>Withdraw from...</InputLabel>
              <Select
                value={withdrawFrom}
                onChange={handleWithdrawFromChange}
                displayEmpty
                label="Withdraw from..."
                className="mb-4 bg-white"
                variant="outlined"
              >
                <MenuItem
                  value=""
                  disabled
                >
                  Withdraw from...
                </MenuItem>
                <MenuItem value="Savings">
                  Savings (₦{formattedSavings})
                </MenuItem>
                <MenuItem value="Investment">
                  Investment (₦{formattedInvestment})
                </MenuItem>
                <MenuItem value="Wallet">Wallet (₦{formattedWallet})</MenuItem>
              </Select>
            </FormControl>

            {withdrawFrom && (
              <FormControl
                fullWidth
                variant="outlined"
                style={{ marginTop: 5 }}
              >
                <InputLabel>Withdraw to...</InputLabel>
                <Select
                  value={withdrawTo}
                  onChange={handleWithdrawToChange}
                  label="Withdraw to..."
                  className="mb-4 bg-white"
                  variant="outlined"
                >
                  <MenuItem
                    value=""
                    disabled
                  >
                    Withdraw to...
                  </MenuItem>
                  {withdrawFrom === "Savings" && [
                    <MenuItem
                      key="investment"
                      value="Investment"
                    >
                      Investment (₦{formattedInvestment})
                    </MenuItem>,
                    <MenuItem
                      key="bank-account"
                      value="Bank Account"
                    >
                      Bank Account
                    </MenuItem>,
                  ]}
                  {withdrawFrom === "Investment" && (
                    <MenuItem value="Bank Account">Bank Account</MenuItem>
                  )}
                  {withdrawFrom === "Wallet" && [
                    <MenuItem
                      key="savings"
                      value="Savings"
                    >
                      Savings (₦{formattedSavings})
                    </MenuItem>,
                    <MenuItem
                      key="investment"
                      value="Investment"
                    >
                      Investment (₦{formattedInvestment})
                    </MenuItem>,
                    <MenuItem
                      key="bank-account"
                      value="Bank Account"
                    >
                      Bank Account
                    </MenuItem>,
                    <MenuItem
                      key="another-user"
                      value="Another User"
                    >
                      Another User
                    </MenuItem>,
                  ]}
                </Select>
              </FormControl>
            )}

            {renderAdditionalFields()}

            <TextField
              fullWidth
              variant="outlined"
              style={{ marginTop: 5 }}
              className="mt-4 bg-white"
              label="Amount"
              value={amount}
              onChange={handleAmountChange}
              InputProps={{
                startAdornment: <span style={{ marginRight: 4 }}>&#8358;</span>,
                endAdornment: (
                  <IconButton onClick={handleClearAmount}>
                    <Close />
                  </IconButton>
                ),
              }}
              placeholder={
                withdrawFrom === "Savings" && withdrawTo === "Investment"
                  ? "Minimum amount is N100,000"
                  : "e.g. N20,000"
              }
            />

            <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
              {presetAmounts.map((preset, index) => (
                <button
                  key={index}
                  className="bg-[#DCD1FF] text-black rounded-md font-productSans whitespace-nowrap transform active:scale-95 active:bg-purple-600 active:text-white"
                  style={{ height: "50px" }}
                  onClick={() => setAmount(formatAmount(preset.toString()))}
                >
                  {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        }
        buttonText={
          isSending &&
          withdrawFrom === "Wallet" &&
          withdrawTo === "Another User" ? (
            <div className="flex items-center">
              <CircularProgress
                size={24}
                className="mr-2"
              />
              Sending...
            </div>
          ) : isSending ? (
            <div className="flex items-center">
              <CircularProgress
                size={24}
                className="mr-2"
              />
              Processing Withdrawal...
            </div>
          ) : withdrawFrom === "Wallet" && withdrawTo === "Another User" ? (
            <>
              <IonIcon
                icon={sendOutline}
                className="mr-2"
              />
              Send to User
            </>
          ) : (
            <>
              <IonIcon
                icon={arrowDownOutline}
                className="mr-2"
              />
              Withdraw Now
            </>
          )
        }
        onButtonClick={handleWithdraw}
        buttonDisabled={!withdrawFrom || !withdrawTo || !amount}
        zIndex={200}
        modalIcon={undefined}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Withdrawal Successful"
        body="Your withdrawal request has been processed successfully. Thank you for using MyFund."
        buttonText="OK"
        modalIcon={checkmarkCircleOutline}
        iconColor="green"
        startIcon={
          isSending ? (
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
        onButtonClick={handleSuccessModalClose}
        zIndex={200}
        confettiAnimation={true}
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

export default WithdrawModal;
