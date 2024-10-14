import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  InputAdornment,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { arrowDownOutline } from "ionicons/icons";
import Modal from "@/app/components/modal";

import { RootState } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import {
  fetchUserBankAccounts,
  fetchUserInfo,
  fetchUserTransactions,
  fetchAccountBalances,
  fetchTopSaversData,
} from "@/app/Redux store/actions";
import { bankOptions } from "@/app/components/bankOptions";

interface WithdrawalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultWithdrawFrom: string;
}

interface ErrorResponse {
  error: string;
}

const WithdrawalRequestModal: React.FC<WithdrawalRequestModalProps> = ({
  isOpen,
  onClose,
  defaultWithdrawFrom,
}) => {
  const [withdrawFrom, setWithdrawFrom] = useState("");
  const [withdrawTo, setWithdrawTo] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [amount, setAmount] = useState("");

  const token = useSelector((state: RootState) => state.auth.token) || ""; // Fallback to empty string if token is null
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
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

  const handleWithdrawFromChange = (event: SelectChangeEvent<string>) => {
    const selectedWithdrawFrom = event.target.value;
    setWithdrawFrom(selectedWithdrawFrom);

    switch (selectedWithdrawFrom) {
      case "Savings":
      case "Investment":
      case "Wallet":
        setWithdrawTo("Bank Account");
        break;
      default:
        setWithdrawTo("");
    }
  };

  const handleWithdrawToChange = (event: SelectChangeEvent<string>) => {
    setWithdrawTo(event.target.value);
  };

  useEffect(() => {
    if (bankAccounts.length > 0) {
      setSelectedBankAccount(bankAccounts[0].id);
    }
  }, [bankAccounts]);

  const handleWithdrawAll = () => {
    console.log("Withdraw all clicked!");
  };

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
                className="font-bold text-blue-500 cursor-pointer"
                onClick={() => console.log("Navigate to add bank account")}
              >
                Add Bank Account Now...
              </span>
            </div>
          </div>
        );
      }

      return (
        <FormControl fullWidth variant="outlined" className="mb-4 bg-white">
          <InputLabel>Which of Your Bank Accounts</InputLabel>
          <Select
            label="Which of Your Bank Accounts"
            fullWidth
            variant="outlined"
            className="mb-4 bg-white"
            value={selectedBankAccount}
            onChange={(event) => setSelectedBankAccount(event.target.value)}
          >
            <MenuItem value="" disabled>
              Which of Your Bank Accounts...
            </MenuItem>
            {bankAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                <div className="flex items-center">
                  <IonIcon
                    icon="briefcase"
                    style={{ fontSize: "24px", color: "#4C28BC" }}
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
    }
    return null;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Withdraw to Bank Account"
        body={
          <div>
            <p>
              Submit a request to move money from Savings, Investment, or Wallet
              to your bank account.
            </p>
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
              To schedule a withdrawal without charges,{" "}
              <span className="font-proxima text-[#4c28BC]">
                message admin with the withdrawal request{" "}
              </span>
              <span className="text-italics font-italics">
                (30 days, if from Savings and 90 days, if from Investment).
              </span>
            </p>
            <br />

            <FormControl fullWidth variant="outlined" className="mb-5">
              <InputLabel>Withdraw from...</InputLabel>
              <Select
                value={withdrawFrom}
                onChange={handleWithdrawFromChange}
                displayEmpty
                label="Withdraw from..."
                className="mb-4 bg-white"
                variant="outlined"
              >
                <MenuItem value="" disabled>
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
                  <MenuItem value="" disabled>
                    Withdraw to...
                  </MenuItem>
                  <MenuItem value="Bank Account">Bank Account</MenuItem>
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
              onChange={(event) => setAmount(event.target.value)}
              InputProps={{
                startAdornment: <span style={{ marginRight: 4 }}>&#8358;</span>,
                endAdornment: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={handleWithdrawAll}
                      className="hover:bg-gray-200 rounded-md p-1"
                    >
                      <div className="font-karla text-sm italic bg-gray-200 rounded-md px-2 py-1 mr--5">
                        Withdraw All
                      </div>
                    </IconButton>
                    <IconButton onClick={() => setAmount("")}>
                      <Close />
                    </IconButton>
                  </div>
                ),
              }}
              placeholder="e.g. N20,000"
            />
          </div>
        }
        buttonText="SUBMIT"
        onButtonClick={() => console.log("Button clicked")}
        zIndex={1000}
      />
    </>
  );
};

export default WithdrawalRequestModal;
