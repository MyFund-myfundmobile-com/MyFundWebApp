"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  ArrowUpward,
  Close,
  FileCopyOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import Modal from "@/components/modal";
import Confetti from "react-confetti";
import { SelectChangeEvent } from "@mui/material/Select";
import { IonIcon } from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import { Img } from "react-image";
import useWindowWidth from "@/lib/useWindowWidth";

interface BuyPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    image: string;
    title: string;
    cost: number;
    earnings: number;
  } | null; // Make property nullable
}

const BuyPropertyModal: React.FC<BuyPropertyModalProps> = ({
  isOpen,
  onClose,
  property,
}) => {
  const windowWidth = useWindowWidth();
  const [units, setUnits] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Bank Transfer");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleUnitChange = (event: SelectChangeEvent<number>) => {
    setUnits(event.target.value as number);
  };

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  const handleSendPayment = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowSuccessModal(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      onClose();
    }, 3000);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText("0821326433");
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 3000);
  };

  if (!property) {
    return null; // or render a loading state or handle case when property is null/undefined
  }

  const totalCost = property.cost * units;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Buy Property"
        body={
          <div>
            <div style={{ display: "flex", marginBottom: 16 }}>
              <Img
                width={80}
                height={80}
                src={property.image}
                alt={property.title}
                style={{ width: "50%", marginRight: 16 }}
              />
              <div style={{ flex: 1 }}>
                <h3>{property.title}</h3>
                <p>
                  <span
                    style={{ fontSize: 13, color: "grey", marginBottom: -8 }}
                  >
                    Cost:
                  </span>
                  <br />
                  <span
                    className="font-bold"
                    style={{ color: "#4C28BC", fontSize: 22 }}
                  >
                    <strong>&#8358;{property.cost.toLocaleString()}</strong>
                  </span>
                  /unit
                </p>
                <p>
                  <span
                    style={{ fontSize: 13, color: "grey", marginBottom: -8 }}
                  >
                    Earnings:
                  </span>
                  <br />
                  <span
                    className="font-bold"
                    style={{ color: "green", fontSize: 22 }}
                  >
                    <strong>&#8358;{property.earnings.toLocaleString()}</strong>
                  </span>{" "}
                  p.a.
                </p>
              </div>
            </div>
            <div className="mt-4 mb-4">
              <Select
                fullWidth
                value={units}
                onChange={handleUnitChange}
                displayEmpty
                variant="outlined"
                className="bg-white"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <MenuItem
                    key={i + 1}
                    value={i + 1}
                  >
                    {i + 1} unit{i > 0 ? "s" : ""}
                  </MenuItem>
                ))}
              </Select>
              <p style={{ textAlign: "right", marginTop: 8 }}>
                Total: &#8358;{totalCost.toLocaleString()}
              </p>
            </div>
            <Select
              fullWidth
              value={selectedOption}
              onChange={handleOptionChange}
              displayEmpty
              variant="outlined"
              className="mb-4 bg-white"
              placeholder="Using..."
            >
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              <MenuItem value="My Saved Cards">My Saved Cards</MenuItem>
              <MenuItem value="Savings">Savings (N31,546)</MenuItem>
              <MenuItem value="Investment">Investment (N4,370,000)</MenuItem>
              <MenuItem value="Wallet">Wallet (N198,000)</MenuItem>
            </Select>
            {selectedOption === "Bank Transfer" && (
              <div
                className="mb-4"
                style={{ textAlign: "center", alignSelf: "center" }}
              >
                <p>
                  Transfer the exact amount you entered above to...
                  <br />
                  <span
                    style={{ fontSize: 30, color: "#4C28BC", marginLeft: 15 }}
                  >
                    <strong>0821326433</strong>
                  </span>
                  <IconButton onClick={handleCopyToClipboard}>
                    {showCopied ? (
                      <CheckCircleOutline
                        style={{ color: "green", marginRight: -5 }}
                      />
                    ) : (
                      <FileCopyOutlined />
                    )}
                  </IconButton>
                  {showCopied && <span style={{ color: "green" }}>Copied</span>}
                  <br />
                  <span style={{ marginTop: -5 }}>(Access Bank)</span>
                  <br />
                  <strong>Vcorp Systems Limited</strong>
                </p>
                <br />
                <p>
                  Click I&apos;VE SENT THE PAYMENT after making the transfer and
                  your account will be updated within minutes.
                </p>
              </div>
            )}
            {selectedOption === "My Saved Cards" && (
              <Select
                fullWidth
                variant="outlined"
                displayEmpty
                className="mb-4 bg-white"
                placeholder="Which of your cards?"
              >
                {/* Replace the placeholder with the actual list of saved cards */}
                <MenuItem
                  value=""
                  disabled
                >
                  No cards added yet... Add Card Now!
                </MenuItem>
                {/* Example of rendering saved cards */}
                {/* {savedCards.map(card => (
                    <MenuItem key={card.id} value={card.id}>{card.name}</MenuItem>
                  ))} */}
              </Select>
            )}
          </div>
        }
        buttonText={
          isSending ? (
            <div className="flex items-center">
              <CircularProgress
                size={24}
                className="mr-2"
              />
              Sending Payment...
            </div>
          ) : (
            <>
              {selectedOption === "Bank Transfer" ? (
                <>
                  <ArrowUpward className="mr-2" />
                  I&apos;ve Sent The Payment
                </>
              ) : (
                <>
                  <ArrowUpward className="mr-2" />
                  Buy Now!
                </>
              )}
            </>
          )
        }
        onButtonClick={handleSendPayment}
        buttonDisabled={!selectedOption}
        zIndex={200}
      />

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        header="Purchase Successful!"
        body="Your purchase has been successfully completed. Your account will be updated shortly."
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
        onButtonClick={() => setShowSuccessModal(false)}
        zIndex={200}
        confettiAnimation={true}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-40">
          {showConfetti && (
            <Confetti
              width={windowWidth}
              height={window.innerHeight}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default BuyPropertyModal;
