"use client";
import React, { useState } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import { IonIcon } from '@ionic/react';
import { shieldCheckmarkOutline } from 'ionicons/icons';
import { TextField, MenuItem, Box, CircularProgress } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import { checkmarkCircleOutline } from 'ionicons/icons';
import Modal from '@/app/components/modal';
import Confetti from 'react-confetti';


const KYCSettings: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsUpdating(true);

    // Simulate an API call
    setTimeout(() => {
      setIsUpdating(false);
      setShowModal(true);
    }, 2000);

    setShowConfetti(true); // Activate confetti on success
    setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]" style={{ padding: '36px', borderRadius: '8px', backgroundColor: 'white' }}>
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Update KYC</Title>
          <Subtitle style={{ marginTop: -5 }}>Update your details for added account security.</Subtitle>
        </div>
        <div className="flex items-center">
          <p className="text-green-500 font-karla text-lg mr-2">Updated</p> {/* Replace with dynamic status */}
          <CheckCircleOutline className="text-green-500" style={{ fontSize: '32px' }} />
        </div>
      </div>

      <div className="rounded-lg p-4 mt-4 sm:p-6 grid grid-cols-[auto,1fr] items-start overflow-hidden" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14, marginBottom: '16px' }}>
        <IonIcon icon={shieldCheckmarkOutline} className="text-green-500 text-purple1 mr-4 self-center" style={{ fontSize: '48px' }} />
        <p className="overflow-auto" style={{ wordWrap: 'break-word' }}>
          <span className="font-bold text-purple1">KYC Guidelines:</span> KYC (Know Your Customer) guidelines by CBN are meant to prevent your account from being used, intentionally or unintentionally, by criminal elements for money laundering activities.
        </p>
      </div>

      {/* KYC Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Form Fields */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Gender"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Non-binary">Non-binary</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <TextField
            label="Relationship Status"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          >
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
            <MenuItem value="Separated">Separated</MenuItem>
            <MenuItem value="Remarried">Remarried</MenuItem>
            <MenuItem value="Widowed">Widowed</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <TextField
            label="Employment Status"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          >
            <MenuItem value="Unemployed">Unemployed</MenuItem>
            <MenuItem value="Employed">Employed</MenuItem>
            <MenuItem value="Self-employed">Self-employed</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Retired">Retired</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <TextField
            label="Yearly Income"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
            >
            <MenuItem value="Less than N200000">Less than N200000</MenuItem>
            <MenuItem value="N200001 - N500000">N200001 - N500000</MenuItem>
            <MenuItem value="N500001 - N1million">N500001 - N1million</MenuItem>
            <MenuItem value="N1million - N5million">N1million - N5million</MenuItem>
            <MenuItem value="N5million - N10million">N5million - N10million</MenuItem>
            <MenuItem value="N10million - N20million">N10million - N20million</MenuItem>
            <MenuItem value="Above N20million">Above N20million</MenuItem>
            </TextField>

          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          />

          <TextField
            label="Address"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          />

          <TextField
            label="Mother's Maiden Name"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          />

          <TextField
            label="Identification Type"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          >
            <MenuItem value="International Passport">International Passport</MenuItem>
            <MenuItem value="Driver's License">Driver&apos;s License</MenuItem>
            <MenuItem value="National ID Card (NIN)">National ID Card (NIN)</MenuItem>
            <MenuItem value="Permanent Voter's Card">Permanent Voter&apos;s Card</MenuItem>
            <MenuItem value="Bank Verification Number (BVN)">Bank Verification Number (BVN)</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <div>
            <div className="border border-dashed border-purple1 p-4 mt-1 rounded-lg" style={{ backgroundColor: 'white' }}>
              <input type="file" onChange={handleFileChange} />
              {selectedFile && <p>{selectedFile.name}</p>}
            </div>
          </div>

          <TextField
            label="Name of Next of Kin"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          />

          <TextField
            label="Relationship with Next of Kin"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          >
            <MenuItem value="Brother">Brother</MenuItem>
            <MenuItem value="Sister">Sister</MenuItem>
            <MenuItem value="Spouse">Spouse</MenuItem>
            <MenuItem value="Father">Father</MenuItem>
            <MenuItem value="Mother">Mother</MenuItem>
            <MenuItem value="Daughter">Daughter</MenuItem>
            <MenuItem value="Son">Son</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Relative">Relative</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <TextField
            label="Next of Kin's Phone Number"
            type="tel"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: '#F7F5FF' } }}
          />
        </Box>

        {/* Update KYC Button */}
        <Box className="flex justify-center mt-4">
          <PrimaryButton
            className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
            onClick={handleSubmit}
            background="#4C28BC"
            hoverBackgroundColor="#351265"
            color="#fff"
            hoverColor="#fff"
            startIcon={
              isUpdating ? <CircularProgress size={24} style={{ color: '#F7F5FF', marginRight: 8 }} /> : 
              <IonIcon icon={shieldCheckmarkOutline} style={{ fontSize: '31px', marginRight: 5 }} />
            }
            style={{ width: '95%', letterSpacing: 0.5, marginBottom: -10, marginTop: 5}}
          >
            {isUpdating ? 'Updating KYC...' : 'UPDATE KYC'}
          </PrimaryButton>
        </Box>
      </form>


    <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        header="KYC Updated Successfully!"
        body="Your KYC request has been submitted successfully and is pending approval."
        buttonText="OK"
        onButtonClick={handleCloseModal}
        modalIcon={checkmarkCircleOutline} // Use checkmark icon if needed
        iconColor="green"
        zIndex={200}
        confettiAnimation={true} // Add confetti animation prop if needed
      >
        {showConfetti && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
          </div>
        )}
        </Modal>
    
    </Box>
  );
};

export default KYCSettings;
