// RecentTransactionsSection.tsx
"use client";
import React, { useEffect } from "react";
import Section from "@/app/components/section";
import { IonIcon } from "@ionic/react";
import { arrowDownOutline } from "ionicons/icons";
import { RootState } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";
import iconMapping from "../../home/iconMapping";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Subtitle from "@/app/components/subtitle";
import RecentTransactionsModal from "../../home/modals/recentTransactionsModal";
import { Box, Button, Collapse, Typography } from "@mui/material";
import Title from "@/app/components/title";
import RecentTransactionsSection from "../../home/recentTransactions";
import WithdrawalRequestModal from "../modals/withdrawalRequwstModal";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";

interface Transaction {
  description: string;
  date: string;
  transaction_id: string;
  amount: number;
  type: "credit" | "debit";
  status: "pending" | "confirmed";
}

interface WithdrawalRequestTransactionsProps {
  transactionType?: "Savings" | "Invest" | "Withdraw" | "Save";
}

const WithdrawalRequestTransactions: React.FC<
  WithdrawalRequestTransactionsProps
> = ({ transactionType }) => {
  const { userTransactions, isLoading } = useSelector((state: RootState) => ({
    userTransactions: state.auth.userTransactions,
    isLoading: state.auth.isLoading,
  }));

  // Define arrays of keywords for different transaction types
  const savingsKeywords = ["quicksave", "autosave", "savings"];
  const investKeywords = ["quickinvest", "autoinvest", "investment"];
  const propertyKeywords = ["property", "real estate", "purchase", "rent"]; // Add property-related keywords

  // Function to determine relevant keywords based on transactionType
  const getKeywordsForTransactionType = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case "savings":
      case "save":
        return savingsKeywords;
      case "invest":
      case "investment":
        return investKeywords;
      case "property":
        return propertyKeywords;
      default:
        return [];
    }
  };

  // Get keywords based on transactionType
  const keywords = getKeywordsForTransactionType(transactionType);

  // Filter transactions based on the keywords
  const filteredTransactions = keywords.length
    ? userTransactions.filter((transaction) =>
        keywords.some((keyword) =>
          transaction.description.toLowerCase().includes(keyword)
        )
      )
    : userTransactions;

  const displayedTransactions = filteredTransactions.slice(0, 5);
  // Existing state
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // New state for WithdrawalRequestModal
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] =
    React.useState(false);

  // Open and close handlers for the withdrawal modal
  const openWithdrawalModal = () => setIsWithdrawalModalOpen(true);
  const closeWithdrawalModal = () => setIsWithdrawalModalOpen(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserTransactions(token));
    }
  }, [dispatch, token]);

  return (
    <section className="mt-4">
      <Box
        className="flex justify-between items-center mb-4"
        style={{
          paddingRight: "36px",
          paddingLeft: "36px",
          paddingTop: "36px",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <Box>
          <Title style={{ marginTop: -25 }}>My Withdrawals</Title>
          <Subtitle style={{ marginTop: 1, paddingRight: 90 }}>
            Submit a withdrawal requests to be processed into your local account
          </Subtitle>
        </Box>
        <div className="flex items-center">
          <IonIcon
            icon={arrowDownOutline}
            className="text-purple1"
            style={{ fontSize: "32px" }}
          />
        </div>
      </Box>

      <div
        className="md:col-span-3"
        style={{
          alignSelf: "flex-start",
          paddingRight: "36px",
          paddingLeft: "36px",
        }}
      >
        <RecentTransactionsSection transactionType="Withdraw" />
      </div>

      <Box className="flex justify-center">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={openWithdrawalModal} // Update this to open the new modal
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          style={{ width: "95%", letterSpacing: 0.5, marginBottom: 35 }}
          startIcon={
            <IonIcon
              icon={arrowDownOutline}
              style={{ fontSize: "31px", marginRight: 5 }}
            />
          }
        >
          SUBMIT WITHDRAWAL REQUEST
        </PrimaryButton>
      </Box>

      <RecentTransactionsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transactions={userTransactions as Transaction[]}
      />
      <WithdrawalRequestModal
        isOpen={isWithdrawalModalOpen}
        onClose={closeWithdrawalModal}
        defaultWithdrawFrom={""} // Pass default value if needed
      />
    </section>
  );
};

export default WithdrawalRequestTransactions;
