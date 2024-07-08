"use client";
import React, { useState, useEffect } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { IonIcon } from '@ionic/react';
import { starOutline, sendOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { Box, Rating, TextField, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import Modal from '@/app/components/modal';
import Confetti from 'react-confetti';


const RateMyFund: React.FC = () => {
  const [value, setValue] = useState<number | null>(2);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleStarClick = () => {
    if (value !== null && value < 5) {
      setValue(value + 1);
    }
  };

  const handleSubmitReview = () => {
    setSubmitting(true);
    // Simulate a submission process
    setTimeout(() => {
      setSubmitting(false);
      setShowSuccessModal(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 6000);
      console.log("Review submitted: ", value, message);
    }, 2000);
  };

  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white' }}>
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Rate MyFund</Title>
          <Subtitle style={{ marginTop: -5 }}>We value your feedback!</Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon icon={starOutline} className="text-purple1" style={{ fontSize: '32px' }} />
        </div>
      </div>

      <div className="rounded-lg p-4 mt-4 sm:p-6 flex flex-col items-center" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14 }}>
        <p className="mb-4 text-center">
          <span className="font-bold text-purple1">Rate Us:</span> Your feedback helps us improve.
        </p>
        <Rating
          name="rate-my-fund"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{ fontSize: '48px' }}
        />
      </div>

      <TextField
        label="Message"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          style: { backgroundColor: '#F7F5FF' },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleStarClick}>
                <IonIcon icon={starOutline} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        style={{ marginTop: '16px' }}
      />

      <Box className="flex justify-center mt-4">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={handleSubmitReview}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          startIcon={submitting ? <CircularProgress size={20} color="inherit" style={{ marginRight: 5 }} /> : <IonIcon icon={sendOutline} style={{ fontSize: '20px', marginRight: 5 }} />}
          style={{ width: '95%', letterSpacing: 0.5, marginTop: 5 }}
        >
          {submitting ? "Submitting" : "Submit Review"}
        </PrimaryButton>
      </Box>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Review Submitted!"
        body="Thank you for your feedback. We appreciate your input and will use it to improve our services."
        buttonText="OK"
        onButtonClick={() => setShowSuccessModal(false)}
        modalIcon={checkmarkCircleOutline}
        iconColor="green"
        zIndex={200}
        confettiAnimation={true}
      >
        {showConfetti && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          </div>
        )}
      </Modal>
    </Box>
  );
};

export default RateMyFund;
