"use client";
import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { IonIcon } from "@ionic/react";
import {
  addOutline,
  cardOutline,
  checkmarkCircleOutline,
  trashOutline,
} from "ionicons/icons";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import Section from "@/app/components/section";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import AddCardModal from "../modals/addCardModal";
import Modal from "@/app/components/modal";
import Confetti from "react-confetti";

const CardSettings: React.FC<{ onNavigate: (menu: string) => void }> = ({
  onNavigate,
}) => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cards, setCards] = useState<any[]>([]);

  const handleAddCardClick = () => {
    setIsAddCardModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddCardModalOpen(false);
  };

  const handleShowSuccessModal = () => {
    setShowSuccessModal(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setShowConfetti(false);
    }, 6000); // Auto-close success modal after 6 seconds
  };

  const handleAddCard = (card: any) => {
    setCards([...cards, card]);
    handleShowSuccessModal();
  };

  const handleDeleteCard = (index: number) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

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
          <Title style={{ marginTop: -25 }}>My Cards</Title>
          <Subtitle style={{ marginTop: 1, paddingRight: 90 }}>
            For faster transactions
          </Subtitle>
        </Box>
        <Box className="flex flex-col items-end">
          <span
            className="text-xs font-karla italic text-gray-600"
            style={{ marginTop: -15 }}
          >
            Go to...
          </span>
          <Box
            className="relative bg-purple-500 text-white rounded-lg px-4 py-2 font-product-sans uppercase font-bold text-sm cursor-pointer mt-5 transform transition-transform duration-200 hover:scale-105"
            onClick={() => onNavigate("Bank Settings")}
            style={{ letterSpacing: 0.5, marginTop: 1 }}
          >
            <div
              className="absolute top-0 right-0 h-full w-8 bg-purple-500 rounded-r-full"
              style={{
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                marginRight: -10,
              }}
            ></div>
            <span>MY BANK ACCOUNTS . </span>
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
          icon={cardOutline}
          className="text-green-500 text-purple1 mr-4 self-center"
          style={{ fontSize: "48px" }}
        />
        <p className="overflow-auto" style={{ wordWrap: "break-word" }}>
          Set up your cards so you can perform faster transactions including
          AutoSave, AutoInvest, Buy Property, etc.
        </p>
      </div>
      <Section>LIST OF CARDS</Section>
      <Box className="mt-4">
        {cards.map((card, index) => (
          <Box
            key={index}
            className="p-4 border rounded mb-2 flex items-center justify-between"
            style={{ backgroundColor: card.bankColor, borderRadius: 10 }}
          >
            <Box className="flex items-center">
              <IonIcon
                icon={cardOutline}
                className="text-green-500 text-white mr-4 self-center"
                style={{ fontSize: "48px" }}
              />
              <div>
                <h1 className="font-karla font-bold text-white">{`**** **** **** ${card.cardNumber}`}</h1>
                <p className="font-karla text-sm text-gray-300">
                  {card.bankName}
                </p>
                <p className="font-karla text-xs text-gray-200">{`Expiry: ${card.expiry}`}</p>
              </div>
            </Box>
            <IconButton onClick={() => handleDeleteCard(index)}>
              <IonIcon icon={trashOutline} style={{ color: "red" }} />
            </IconButton>
          </Box>
        ))}
        {cards.length === 0 && (
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
            You&apos;re yet to add any cards.
          </p>
        )}
      </Box>
      <Box className="flex justify-center mt-14">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={handleAddCardClick}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          style={{ width: "95%", letterSpacing: 0.5, marginBottom: -10 }}
          startIcon={
            <IonIcon
              icon={addOutline}
              style={{ fontSize: "31px", marginRight: 5 }}
            />
          }
        >
          ADD NEW CARD
        </PrimaryButton>
      </Box>
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleAddCard}
      />

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Card Added Successfully!"
        body="Your new card has been added and is ready for transactions."
        buttonText="Awesome!"
        modalIcon={checkmarkCircleOutline}
        iconColor="#4CAF50"
        zIndex={200}
        confettiAnimation={true}
        onButtonClick={() => setShowSuccessModal(false)}
        startIcon={
          <IonIcon
            icon={checkmarkCircleOutline}
            style={{ fontSize: "20px", marginRight: 5 }}
          />
        }
      >
        {showConfetti && <Confetti />}
      </Modal>
    </Box>
  );
};

export default CardSettings;
