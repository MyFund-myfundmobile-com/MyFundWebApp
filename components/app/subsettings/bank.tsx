"use client";
import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { IonIcon } from "@ionic/react";
import {
  addOutline,
  briefcaseOutline,
  checkmarkCircleOutline,
  trashOutline,
} from "ionicons/icons";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Section from "@/components/section";
import { PrimaryButton } from "@/components/Buttons/MainButtons";
import AddBankModal from "../modals/addBankModal";
import Modal from "@/components/modal";
import Confetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux store/store";
import { RootState } from "@/Redux store/store";
import {
  fetchUserBankAccounts,
  fetchUserInfo,
  deleteBankAccount,
  addBankAccount, // Assuming this action exists
} from "@/Redux store/actions";
import CustomSnackbar from "@/components/snackbar";
import { bankOptions } from "@/components/bankOptions";

interface BankSettingsProps {
  onNavigate: (menu: string) => void;
  isAddBankModalOpen: boolean;
  setIsAddBankModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BankSettings: React.FC<BankSettingsProps> = ({
  onNavigate,
  isAddBankModalOpen,
  setIsAddBankModalOpen,
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bankAccountToDelete, setBankAccountToDelete] = useState<number | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const bankAccounts = useSelector(
    (state: RootState) => state.auth.bankAccounts
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any); // Dispatch fetchUserInfo action with type assertion to any
      dispatch(fetchUserBankAccounts(token as string)); // Ensure token is of type string
    }
  }, [dispatch, token]);

  const handleAddBankClick = () => {
    setIsAddBankModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddBankModalOpen(false);
  };

  const getBankColor = (bankCode: string) => {
    const bank = bankOptions.find((option) => option.code === bankCode);
    return bank ? bank.color : "#4c28bc"; // Default color if not found
  };

  const handleAddBankAccount = (bankAccount: any) => {
    // Handle success modal display
    setShowSuccessModal(true);
    setShowConfetti(true);

    // Optionally, fetch the updated bank accounts
    dispatch(fetchUserBankAccounts(token as string)); // Ensure token is of type string

    // Auto-close success modal after a delay
    setTimeout(() => {
      setShowSuccessModal(false);
      setShowConfetti(false);
    }, 6000); // Auto-close success modal after 6 seconds
  };

  const handleOpenDeleteModal = (index: number) => {
    setBankAccountToDelete(index);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    console.log("Bank accounts received:", bankAccounts);
    bankAccounts.forEach((account, index) => {
      console.log(`Bank account ${index + 1}:`, account);
    });
  }, [bankAccounts]);

  const handleConfirmDeleteBankAccount = () => {
    if (bankAccountToDelete !== null && token) {
      const accountToDelete = bankAccounts[bankAccountToDelete];
      dispatch(deleteBankAccount(accountToDelete.account_number) as any) // Type assertion to any to avoid type error
        .then(() => {
          // Show success snackbar message
          setSnackbarMessage("Bank account deleted successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);

          // Refresh bank accounts only if token is available
          if (token) {
            dispatch(fetchUserBankAccounts(token));
          }
        })
        .catch(() => {
          // Show error snackbar message if deletion fails
          setSnackbarMessage("Failed to delete bank account.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
      setDeleteModalOpen(false);
      setBankAccountToDelete(null);
    }
  };

  useEffect(() => {
    console.log("Bank accounts received:", bankAccounts);
    bankAccounts.forEach((account, index) => {
      console.log(`Bank Color inside bank.tsx........:`, account.bankColor);
    });
  }, [bankAccounts]);

  return (
    <Box
      className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]"
      style={{
        padding: "36px",
        borderRadius: "8px",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Box className="flex justify-between items-center mb-4">
        <Box>
          <Title style={{ marginTop: -25 }}>My Bank Accounts</Title>
          <Subtitle style={{ marginTop: 1, paddingRight: 90 }}>
            For faster withdrawals
          </Subtitle>
        </Box>
        <Box className="flex flex-col items-end">
          <span
            className="text-xs font-karla italic text-gray-600"
            style={{ marginTop: -15 }}
          >
            Return to...
          </span>
          <Box
            className="relative bg-purple-500 text-white rounded-lg px-4 py-2 font-product-sans uppercase font-bold text-sm cursor-pointer mt-5 transform transition-transform duration-200 hover:scale-105"
            onClick={() => onNavigate("Card and Bank Settings")}
            style={{ letterSpacing: 0.5, marginTop: 1 }}
          >
            <div
              className="absolute top-0 left-0 h-full w-8 bg-purple-500 rounded-l-full transition-colors duration-200"
              style={{
                clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                marginLeft: -10,
              }}
            ></div>
            <span>. MY CARDS</span>
          </Box>
        </Box>
      </Box>

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
          icon={briefcaseOutline}
          className="text-purple1 mr-4 self-center"
          style={{ fontSize: "48px" }}
        />
        <p
          className="overflow-auto"
          style={{ wordWrap: "break-word" }}
        >
          Set up your bank accounts so you can perform faster withdrawals from
          your wallet.
        </p>
      </div>
      <Section>LIST OF BANK ACCOUNTS</Section>

      <Box className="mt-4">
        {bankAccounts.map((account, index) => {
          const bankColor = getBankColor(account.bank_code);

          return (
            <Box
              key={index}
              className="p-4 border rounded mb-2 flex items-center justify-between"
              style={{
                backgroundColor: bankColor,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Box className="flex items-center">
                <IonIcon
                  icon={briefcaseOutline}
                  className="text-white mr-4 self-center"
                  style={{ fontSize: "48px" }}
                />
                <div>
                  <h1 className="font-proxima font-bold text-white">
                    {account.account_name}
                  </h1>
                  <p className="font-karla text-sm text-gray-400">
                    {account.bank_name}
                  </p>
                  <p className="font-karla text-xs text-gray-300">
                    {account.account_number}
                  </p>
                </div>
              </Box>
              <IconButton onClick={() => handleOpenDeleteModal(index)}>
                <IonIcon
                  icon={trashOutline}
                  style={{ color: "red" }}
                />
              </IconButton>
            </Box>
          );
        })}

        {bankAccounts.length === 0 && (
          <p
            className="text-gray-500 font-karla"
            style={{
              marginTop: 65,
              marginBottom: 65,
              alignSelf: "center",
              alignContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            You&apos;re yet to add any bank accounts.
          </p>
        )}
      </Box>

      <Box className="flex justify-center mt-14">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={handleAddBankClick}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          startIcon={
            <IonIcon
              icon={addOutline}
              style={{ fontSize: "31px", marginRight: 5 }}
            />
          }
          style={{ width: "95%", letterSpacing: 0.5, marginBottom: -10 }}
        >
          Add New Bank Account
        </PrimaryButton>
      </Box>

      {isAddBankModalOpen && (
        <AddBankModal
          isOpen={isAddBankModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleAddBankAccount}
        />
      )}

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Bank Account Added Successfully!"
        body="Your bank account details have been added. Enjoy using MyFund!"
        buttonText="OK"
        onButtonClick={() => setShowSuccessModal(false)}
        modalIcon={checkmarkCircleOutline}
        iconColor="#4CAF50"
        zIndex={200}
        confettiAnimation={true}
        startIcon={
          <IonIcon
            icon={checkmarkCircleOutline}
            style={{ fontSize: "20px", marginRight: 5 }}
          />
        }
      >
        {showConfetti && <Confetti />}
      </Modal>

      {/* Snackbar for success/failure messages */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setSnackbarOpen(false)}
      />

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        header="Delete Bank Account"
        body="Are you sure you want to delete this bank account?"
        buttonText="Yes, Delete"
        onButtonClick={handleConfirmDeleteBankAccount}
        modalIcon={trashOutline}
        iconColor="brown"
        zIndex={200}
        startIcon={
          <IonIcon
            icon={trashOutline}
            style={{ fontSize: "20px", marginRight: 5, color: "red" }}
          />
        }
      />
    </Box>
  );
};

export default BankSettings;
