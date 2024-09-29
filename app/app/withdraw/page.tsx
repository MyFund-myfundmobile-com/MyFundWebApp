"use client";
import React, { useState, useEffect, useRef } from "react";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Section from "@/components/section";
import AccountCard from "@/components/accountCard";
import { Divider } from "@mui/material";
import Referrals from "@/components/app/referrals";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PrimaryButton } from "@/components/Buttons/MainButtons";
import {
  shareSocialOutline,
  copyOutline,
  checkmarkOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import WithdrawModal from "@/components/app/modals/withdrawModal";
import Image from "next/image";
import { RootState } from "@/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "@/Redux store/actions";
import { AppDispatch } from "@/Redux store/store";
import TopSaversSection from "@/components/app/topSavers";
import RecentTransactionsSection from "@/components/app/recentTransactions";
import ShareModal from "@/components/app/modals/shareModal";

const WithdrawPage = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);
  const [showBalances, setShowBalances] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState<boolean>(false);
  const [defaultWithdrawFrom, setDefaultWithdrawFrom] = useState<string>("");
  const [initialAmount, setInitialAmount] = useState<number>(0); // Add initialAmount state
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const accountBalances = useSelector(
    (state: RootState) => state.auth.accountBalances
  );

  const bottomRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any); // Dispatch fetchUserInfo action with type assertion to any
    }
  }, [dispatch, token]);

  const formatAmount = (amount: number) => {
    return amount < 10 ? `0${amount}` : `${amount}`;
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText("username@email.com").then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Add this formatting function to format account balances with commas
  const formatAmountWithCommas = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Format the account balances
  const formattedSavings = formatAmountWithCommas(
    Number(accountBalances.savings)
  );

  const formattedInvestment = formatAmountWithCommas(
    Number(accountBalances.investment)
  );

  const formattedWallet = formatAmountWithCommas(
    Number(accountBalances.wallet)
  );

  useEffect(() => {
    const container = document.getElementById(
      "withdraw-account-cards-container"
    );
    const handleScroll = () => {
      if (container) {
        setScrollPosition(container.scrollLeft);
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    const container = document.getElementById(
      "withdraw-account-cards-container"
    );
    if (container) {
      container.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    const container = document.getElementById(
      "withdraw-account-cards-container"
    );
    if (container) {
      container.scrollLeft += 150;
    }
  };

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
  };

  const handleWithdrawClick = (accountType: string, amount: number) => {
    setDefaultWithdrawFrom(accountType);
    setInitialAmount(amount); // Set the initial amount
    setIsWithdrawModalOpen(true);
  };

  return (
    <div
      ref={bottomRef}
      className="px-6 max-w-full animate-floatIn"
    >
      <div className="mb-5 flex items-center">
        <div>
          <Title>Withdraw</Title>
          <Subtitle>Move money between your accounts or to your bank.</Subtitle>
        </div>
        <div className="ml-auto flex items-center">
          <span
            className="mr-2"
            style={{ letterSpacing: 2, color: "grey", fontSize: 13 }}
          >
            {showBalances ? "HIDE" : "SHOW"} BALANCES{" "}
          </span>
          <span
            onClick={handleToggleBalances}
            style={{
              cursor: "pointer",
              transition: "color 3s ease",
              fontSize: 29,
            }}
          >
            {showBalances ? (
              <Visibility
                style={{
                  color: "#4C28BC",
                  transition: "color 3s ease",
                  fontSize: 29,
                }}
              />
            ) : (
              <VisibilityOff
                style={{ color: "grey", transition: "color 0.3s ease" }}
              />
            )}
          </span>
        </div>
      </div>
      <div
        className="rounded-lg p-4 sm:p-6 mb-4"
        style={{
          backgroundColor: "#DCD1FF",
          color: "black",
          fontFamily: "karla",
          fontSize: 14,
        }}
      >
        <p
          className="overflow-auto"
          style={{ wordWrap: "break-word" }}
        >
          WITHDRAWAL PROTOCOL: Kindly note the protocols for withdrawal. 10%
          charge for instant withdrawal from Savings. 15% charge if withdrawing
          instantly from Investments. 5% charge on completed property sales.
          Free withdrawal from Wallet. But to avoid charges, write a withdrawal
          request using Message Admin and receive your funds in 30 days
          (Savings) and 90 days (Investments).
        </p>
      </div>
      <Section>MY ACCOUNTS</Section>
      <div className="relative">
        <div
          id="withdraw-account-cards-container"
          className="flex gap-4 mt-2 overflow-x-auto w-full"
        >
          <AccountCard
            icon="save-outline"
            label="SAVINGS"
            rate="10% charge"
            currency="₦"
            amount={showBalances ? formattedSavings : "****"}
            rateColor="#F97316"
            buttonText="Withdraw"
            buttonIcon="arrow-down-outline"
            onButtonClick={() =>
              handleWithdrawClick("Savings", accountBalances.savings)
            } // Pass the amount
          />
          <AccountCard
            icon="trending-up-outline"
            label="INVESTMENTS"
            rate="15% charge"
            currency="₦"
            amount={showBalances ? formattedInvestment : "****"}
            rateColor="#F97316"
            buttonText="Withdraw"
            buttonIcon="arrow-down-outline"
            onButtonClick={() =>
              handleWithdrawClick("Investment", accountBalances.investment)
            } // Pass the amount
          />
          <AccountCard
            icon="home-outline"
            label="PROPERTY"
            rate="5% charge"
            currency=""
            amount={
              showBalances ? formatAmount(accountBalances.properties) : "**"
            }
            rateColor="#F97316"
            buttonText="Sell Property"
            buttonIcon="arrow-down-outline"
          />
          <AccountCard
            icon="wallet-outline"
            label="WALLET"
            rate="Free"
            currency="₦"
            amount={showBalances ? formattedWallet : "****"}
            rateColor="#43FF8E"
            buttonText="Withdraw"
            buttonIcon="arrow-down-outline"
            onButtonClick={() =>
              handleWithdrawClick("Wallet", accountBalances.wallet)
            } // Pass the amount
          />
        </div>

        {showLeftButton && (
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg"
            onClick={scrollLeft}
            style={{ marginLeft: -25 }}
          >
            <IoIosArrowBack className="text-gray-600" />
          </button>
        )}
        {showRightButton && (
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg"
            onClick={scrollRight}
            style={{ marginRight: -25 }}
          >
            <IoIosArrowForward className="text-gray-600" />
          </button>
        )}
      </div>

      <Divider
        className="my-4 bg-gray-100"
        style={{ marginTop: 20, marginBottom: 20 }}
      />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div
          className="md:col-span-3"
          style={{ alignSelf: "flex-start" }}
        >
          <RecentTransactionsSection />
        </div>
        <div className="md:col-span-3">
          <Referrals />
        </div>

        <div className="md:col-span-6">
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <div className="mb-4 mt-3">
              <Image
                src="/images/ReferAndEarn500.png"
                alt="Refer and earn"
                width={720}
                height={720}
                className="w-full h-auto rounded-lg"
              />

              <div className="flex justify-center mt-4">
                <PrimaryButton
                  className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
                  onClick={handleShareClick} // Update the onClick handler
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
                  Referral ID: {userInfo?.email}
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
                      <IonIcon
                        icon={copyOutline}
                        onClick={handleCopyClick}
                      />
                    )}
                  </span>
                </Subtitle>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        defaultWithdrawFrom={defaultWithdrawFrom}
      />
    </div>
  );
};

export default WithdrawPage;
