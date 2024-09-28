"use client";
import React, { useState, useEffect } from "react";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import { IonIcon } from "@ionic/react";
import {
  giftOutline,
  checkmarkOutline,
  copyOutline,
  shareSocialOutline,
} from "ionicons/icons";
import { Box, IconButton } from "@mui/material";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import { Img } from "react-image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux store/store";
import { RootState } from "@/app/Redux store/store";
import { fetchUserInfo } from "@/app/Redux store/actions";
import ShareModal from "../../withdraw/modals/shareModal";

// Define props interface
interface ReferAndEarnProps {
  onNavigate: (menu: string) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReferAndEarn: React.FC<ReferAndEarnProps> = ({
  onNavigate,
  isShareModalOpen,
  setIsShareModalOpen,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any); // Dispatch fetchUserInfo action with type assertion to any
    }
  }, [dispatch, token]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(userInfo?.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Box
      className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]"
      style={{ padding: "36px", borderRadius: "8px", backgroundColor: "white" }}
    >
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>Refer and Earn</Title>
          <Subtitle style={{ marginTop: -5 }}>
            Refer your friends and earn rewards!
          </Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon
            icon={giftOutline}
            className="text-purple1"
            style={{ fontSize: "32px" }}
          />
        </div>
      </div>

      <div className="md:col-span-6">
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <div className="mb-4 mt-3">
            <Img
              width={720}
              height={720}
              src="/images/ReferAndEarn500.png"
              alt="Refer and earn"
              className="w-full h-auto rounded-lg"
            />

            <div className="flex justify-center mt-4">
              <PrimaryButton
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
                onClick={handleShareClick}
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                color="#fff"
                hoverColor="#fff"
                endIcon={<IonIcon icon={shareSocialOutline} />}
                style={{ width: "95%", letterSpacing: 0.5 }}
              >
                SHARE AND EARN
              </PrimaryButton>
            </div>

            <div className="flex justify-center">
              <Subtitle
                className="flex items-center"
                style={{ alignSelf: "center" }}
              >
                <span className="font-italics">Referral ID:</span> <br />
                <br />{" "}
                <span className="font-bold font-proxim">{userInfo?.email}</span>
                <span className="flex items-center ml-2">
                  {isCopied ? (
                    <>
                      <IonIcon
                        icon={checkmarkOutline}
                        style={{ color: "green", marginRight: "4px" }}
                      />
                      <span style={{ color: "green" }}>Copied</span>
                    </>
                  ) : (
                    <IonIcon icon={copyOutline} onClick={handleCopyClick} />
                  )}
                </span>
              </Subtitle>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </Box>
  );
};

export default ReferAndEarn;
