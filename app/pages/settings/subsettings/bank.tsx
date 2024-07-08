"use client";
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { addOutline, briefcaseOutline, checkmarkCircleOutline, trashOutline } from 'ionicons/icons';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import AddBankModal from '../modals/addBankModal';
import Modal from '@/app/components/modal';
import Confetti from 'react-confetti';

const BankSettings: React.FC<{ onNavigate: (menu: string) => void }> = ({ onNavigate }) => {
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);

  const handleAddBankClick = () => {
    setIsAddBankModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddBankModalOpen(false);
  };

  const handleShowSuccessModal = () => {
    setShowSuccessModal(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setShowConfetti(false);
    }, 6000); // Auto-close success modal after 6 seconds
  };

  const handleAddBankAccount = (bankAccount: any) => {
    setBankAccounts([...bankAccounts, bankAccount]);
    handleShowSuccessModal();
  };

  const handleDeleteBankAccount = (index: number) => {
    const updatedBankAccounts = [...bankAccounts];
    updatedBankAccounts.splice(index, 1);
    setBankAccounts(updatedBankAccounts);
  };

  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white', position: 'relative' }}>
      <Box className="flex justify-between items-center mb-4">
        <Box>
          <Title style={{ marginTop: -25 }}>My Accounts</Title>
          <Subtitle style={{ marginTop: 1, paddingRight: 90 }}>
            For faster withdrawals
          </Subtitle>
        </Box>
        <Box
          className="bg-gray-300 rounded-lg px-4 py-2 font-product-sans uppercase font-bold text-sm cursor-pointer"
          onClick={() => onNavigate("Card and Bank Settings")}
          style={{ letterSpacing: 0.5 }}
        >
          My Cards
        </Box>
      </Box>
      <div className="rounded-lg p-4 mt-4 sm:p-6 grid grid-cols-[auto,1fr] items-start overflow-hidden" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14, marginBottom: '16px' }}>
        <IonIcon icon={briefcaseOutline} className="text-green-500 text-purple1 mr-4 self-center" style={{ fontSize: '48px' }} />
        <p className="overflow-auto" style={{ wordWrap: 'break-word' }}>
          Set up your bank accounts so you can perform faster withdrawals including AutoSave, AutoInvest, Buy Property, etc.
        </p>
      </div>
      <Section>LIST OF BANK ACCOUNTS</Section>
      <Box className="mt-4">
        {bankAccounts.map((account, index) => (
          <Box key={index} className="p-4 border rounded mb-2 flex items-center justify-between" style={{ backgroundColor: account.bankColor, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}> 
            <Box className="flex items-center">
              <IonIcon icon={briefcaseOutline} className="text-green-500 text-white mr-4 self-center" style={{ fontSize: '48px' }} />
              <div>
                <h1 className="font-karla font-bold text-white">{account.name}</h1>
                <p className="font-karla text-sm text-gray-300">{account.bankName}</p>
                <p className="font-karla text-xs text-gray-200">{account.accountNumber}</p>
              </div>
            </Box>
            <IconButton onClick={() => handleDeleteBankAccount(index)}>
              <IonIcon icon={trashOutline} style={{color: 'red'}}/>
            </IconButton>
          </Box>
        ))}
        {bankAccounts.length === 0 && (
          <p className="text-gray-500 font-karla" style={{ marginTop: 65, marginBottom: 65, alignSelf: 'center', alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>You&apos;re yet to add any bank accounts.</p>
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
          startIcon={<IonIcon icon={addOutline} style={{ fontSize: '31px', marginRight: 5 }} />}
          style={{ width: '95%', letterSpacing: 0.5, marginBottom: -10 }}
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
        startIcon={<IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
      >
        {showConfetti && <Confetti />}
      </Modal>
    </Box>
  );
};

export default BankSettings;
