"use client";
import React from "react";
import Modal from "@/components/modal";
import { IonIcon } from "@ionic/react";
import {
  logoFacebook,
  logoTwitter,
  logoLinkedin,
  logoWhatsapp,
  logoInstagram,
  logoTiktok,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux store/store";
import { Divider } from "@mui/material";

const ShareModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const referralLink = `http://myfundmobile.com/${userInfo.email}`;
  const shareMessage = (
    <>
      Earn <span style={{ color: "#006400", fontWeight: "bold" }}>N500</span>{" "}
      welcome bonus and for every referral completed on MyFund. Signup using my
      link:{" "}
      <strong style={{ fontFamily: "Proxima Nova, sans-serif" }}>
        {referralLink}
      </strong>
    </>
  );

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: logoFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${referralLink}`,
      color: "#4267B2",
    },
    {
      name: "Twitter",
      icon: logoTwitter,
      url: `https://twitter.com/intent/tweet?text=${shareMessage}`,
      color: "#1DA1F2",
    },
    {
      name: "LinkedIn",
      icon: logoLinkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${referralLink}&title=MyFund`,
      color: "#0077B5",
    },
    {
      name: "WhatsApp",
      icon: logoWhatsapp,
      url: `https://wa.me/?text=${shareMessage}`,
      color: "#25D366",
    },
    {
      name: "Instagram",
      icon: logoInstagram,
      url: `https://www.instagram.com/?url=${referralLink}`,
      color: "#E1306C",
    },
    {
      name: "TikTok",
      icon: logoTiktok,
      url: `https://www.tiktok.com/share?url=${referralLink}`,
      color: "#000000",
    },
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Share and Earn via..."
      body={
        <>
          <p
            className="mb-6"
            style={{ letterSpacing: -0.5, marginBottom: 7 }}
          >
            {shareMessage}
          </p>
          <Divider
            className="my-4 bg-gray-100"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          <div className="grid grid-cols-3 gap-6 justify-center items-center">
            {socialPlatforms.map((platform) => (
              <div
                key={platform.name}
                className="cursor-pointer text-center group" // Added group class for hover effect
                onClick={() => handleSocialClick(platform.url)}
              >
                {/* Icon with hover effect */}
                <IonIcon
                  icon={platform.icon}
                  className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-200"
                  style={{ color: platform.color }}
                />
                {/* Label with hover color effect */}
                <span
                  className="text-sm font-medium group-hover:text-opacity-90 transition-colors duration-200"
                  style={{
                    color: platform.color,
                    display: "block",
                    marginTop: -5,
                  }}
                >
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </>
      }
      buttonText="Close"
      onButtonClick={onClose}
      zIndex={1000}
    />
  );
};

export default ShareModal;
