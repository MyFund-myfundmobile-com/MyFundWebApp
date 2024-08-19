"use client";
import React, { useState, useEffect } from "react";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import { IonIcon } from "@ionic/react";
import { shieldCheckmarkOutline } from "ionicons/icons";
import { TextField, MenuItem, Box, CircularProgress } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import { checkmarkCircleOutline } from "ionicons/icons";
import Modal from "@/app/components/modal";
import Confetti from "react-confetti";
import axios from "axios";
import CustomSnackbar from "@/app/components/snackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";
import { setKYCStatus } from "@/app/Redux store/actions";

const KYCSettings: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display

  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [relationshipStatus, setRelationshipStatus] = useState<string | null>(
    null
  );
  const [employmentStatus, setEmploymentStatus] = useState<string | null>(null);
  const [yearlyIncome, setYearlyIncome] = useState<string | null>(null);
  const [cardType, setCardType] = useState<string | null>(null);
  const [relationshipWithNextOfKin, setRelationshipWithNextOfKin] = useState<
    string | null
  >(null);
  const [nameOfNextOfKin, setNameOfNextOfKin] = useState<string>("");
  const [nextOfKinPhoneNumber, setNextOfKinPhoneNumber] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [mothersMaidenName, setMothersMaidenName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [showImage, setShowImage] = useState(false);
  const [processing, setProcessing] = useState(false);

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const kycStatus = useSelector((state: RootState) => state.auth.KYCStatus);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  let statusColor = "text-gray-500"; // Default to gray
  let statusText = "Not yet started"; // Default text

  if (kycStatus?.kycStatus === "Pending...") {
    statusColor = "text-green-500";
    statusText = "Pending...";
  } else if (kycStatus?.kycStatus === "Updated!") {
    statusColor = "text-green-500";
    statusText = "Updated!";
  } else if (kycStatus?.kycStatus === "Failed") {
    statusColor = "text-red-500";
    statusText = "Failed";
  } else if (kycStatus?.kycStatus) {
    statusText = kycStatus.kycStatus;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // This is fine as `reader.result` is `string | ArrayBuffer | null`
        setShowImage(true);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUpdating(true);
    setProcessing(true);

    try {
      if (selectedFile) {
        const formData = new FormData();
        console.log("Payload formData:", formData);

        formData.append("gender", selectedGender || "");
        formData.append("relationship_status", relationshipStatus || "");
        formData.append("employment_status", employmentStatus || "");
        formData.append("yearly_income", yearlyIncome || "");
        formData.append("date_of_birth", dateOfBirth || "");
        formData.append("address", address || "");
        formData.append("mothers_maiden_name", mothersMaidenName || "");
        formData.append("identification_type", cardType || "");
        formData.append("next_of_kin_name", nameOfNextOfKin || "");
        formData.append(
          "relationship_with_next_of_kin",
          relationshipWithNextOfKin || ""
        );
        formData.append("next_of_kin_phone_number", nextOfKinPhoneNumber || "");
        formData.append("id_upload", selectedFile, "kyc_image.jpg");

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-kyc/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const responseData = response.data;
          dispatch(setKYCStatus(responseData.kycStatus));
          setIsUpdating(false);
          setProcessing(false);
          setShowModal(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);

          setSnackbarMessage(
            "KYC Submitted! Your KYC has been submitted for approval."
          );
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        } else {
          setIsUpdating(false);
          setProcessing(false);
          setSnackbarMessage("KYC Update Failed. Please try again later.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } else {
        setIsUpdating(false);
        setProcessing(false);
        setSnackbarMessage(
          "Image Missing. Please upload an image for your KYC."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error Updating KYC:", error);
      setIsUpdating(false);
      setProcessing(false);
      setSnackbarMessage(
        "Failed to update KYC. Please check your connection and try again later."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log("KYC status data:", statusText);
  console.log("KYCstatus:", kycStatus);

  return (
    <Box
      className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]"
      style={{ padding: "36px", borderRadius: "8px", backgroundColor: "white" }}
    >
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Update KYC</Title>
          <Subtitle style={{ marginTop: -5 }}>
            Update your details for added account security.
          </Subtitle>
        </div>

        <div className="flex items-center">
          <p className={`${statusColor} font-karla text-lg mr-2`}>
            {statusText}
          </p>
          {kycStatus.kycStatus === "Updated!" && (
            <CheckCircleOutline
              className={statusColor}
              style={{ fontSize: "32px" }}
            />
          )}
        </div>
      </div>

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
          icon={shieldCheckmarkOutline}
          className=" text-purple1 mr-4 self-center"
          style={{ fontSize: "48px" }}
        />
        <p className="overflow-auto" style={{ wordWrap: "break-word" }}>
          <span className="font-bold text-purple1">KYC Guidelines:</span> KYC
          (Know Your Customer) guidelines by CBN are meant to prevent your
          account from being used, intentionally or unintentionally, by criminal
          elements for money laundering activities.
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
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
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
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={relationshipStatus}
            onChange={(e) => setRelationshipStatus(e.target.value)}
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
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
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
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={yearlyIncome}
            onChange={(e) => setYearlyIncome(e.target.value)}
          >
            <MenuItem value="Less than N200000">Less than N200000</MenuItem>
            <MenuItem value="N200001 - N500000">N200001 - N500000</MenuItem>
            <MenuItem value="N500001 - N1million">N500001 - N1million</MenuItem>
            <MenuItem value="N1million - N5million">
              N1million - N5million
            </MenuItem>
            <MenuItem value="N5million - N10million">
              N5million - N10million
            </MenuItem>
            <MenuItem value="N10million - N20million">
              N10million - N20million
            </MenuItem>
            <MenuItem value="Above N20million">Above N20million</MenuItem>
          </TextField>

          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <TextField
            label="Address"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            label="Mother's Maiden Name"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={mothersMaidenName}
            onChange={(e) => setMothersMaidenName(e.target.value)}
          />

          <TextField
            label="Identification Type"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
          >
            <MenuItem value="International Passport">
              International Passport
            </MenuItem>
            <MenuItem value="Driver's License">Driver&apos;s License</MenuItem>
            <MenuItem value="National ID Card (NIN)">
              National ID Card (NIN)
            </MenuItem>
            <MenuItem value="Permanent Voter's Card">
              Permanent Voter&apos;s Card
            </MenuItem>
            <MenuItem value="Bank Verification Number (BVN)">
              Bank Verification Number (BVN)
            </MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <div>
            <div
              className="border border-dashed border-purple1 p-4 mt-1 rounded-lg"
              style={{ backgroundColor: "white" }}
            >
              <input type="file" onChange={handleFileChange} />
              {selectedFile && <p>{selectedFile.name}</p>}
            </div>
          </div>

          <TextField
            label="Name of Next of Kin"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={nameOfNextOfKin}
            onChange={(e) => setNameOfNextOfKin(e.target.value)}
          />

          <TextField
            label="Relationship with Next of Kin"
            select
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={relationshipWithNextOfKin}
            onChange={(e) => setRelationshipWithNextOfKin(e.target.value)}
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
            InputProps={{ style: { backgroundColor: "#F7F5FF" } }}
            value={nextOfKinPhoneNumber}
            onChange={(e) => setNextOfKinPhoneNumber(e.target.value)}
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
              isUpdating ? (
                <CircularProgress
                  size={24}
                  style={{ color: "#F7F5FF", marginRight: 8 }}
                />
              ) : (
                <IonIcon
                  icon={shieldCheckmarkOutline}
                  style={{ fontSize: "31px", marginRight: 5 }}
                />
              )
            }
            style={{
              width: "95%",
              letterSpacing: 0.5,
              marginBottom: -10,
              marginTop: 5,
            }}
          >
            {isUpdating ? "Updating KYC..." : "UPDATE KYC"}
          </PrimaryButton>
        </Box>
      </form>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={() => setSnackbarOpen(false)}
      />

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
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          </div>
        )}
      </Modal>
    </Box>
  );
};

export default KYCSettings;
