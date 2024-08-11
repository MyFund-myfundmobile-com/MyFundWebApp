"use client";
import React, { useEffect, useState, useMemo } from "react";
import Section from "@/app/components/section";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import { Img } from "react-image";
import { RootState } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, updateWealthStage } from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import { IonIcon } from "@ionic/react";
import { trendingUpOutline } from "ionicons/icons";
import Modal from "@/app/components/modal";
import Image from "next/image";

const WealthMapSection = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const accountBalances = useSelector(
    (state: RootState) => state.auth.accountBalances
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const handleLearnMore = () => {
    const imageSrc = `/images/wealthMap.png`;
    console.log("Setting modal image source to:", imageSrc);
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [dispatch, token]);

  const wealthStages = useMemo(
    () => [
      {
        stage: 1,
        text: "Debt",
        description: "Your income is less than your expenses",
        condition:
          accountBalances.savings === 0 && accountBalances.investment === 0,
      },
      {
        stage: 2,
        text: "No Debt",
        description: "Your income is equal to your expenses",
        condition:
          accountBalances.savings > 0 && accountBalances.investment === 0,
      },
      {
        stage: 3,
        text: "Surplus",
        description: "Your income is greater than your expenses",
        condition:
          accountBalances.savings > 0 &&
          accountBalances.investment > 0 &&
          accountBalances.properties === 0,
      },
      {
        stage: 4,
        text: "Savings",
        description: "You have cash flow, and your savings are growing.",
        condition:
          accountBalances.savings + accountBalances.investment >= 250000,
      },
      {
        stage: 5,
        text: "Millions",
        description: "You have a cash asset and are ready for true investment",
        condition:
          accountBalances.savings + accountBalances.investment >= 1000000,
      },
      {
        stage: 6,
        text: "Assets",
        description: "You have acquired one or more properties",
        condition:
          accountBalances.properties > 0 && accountBalances.wallet < 300000,
      },
      {
        stage: 7,
        text: "Passive Income",
        description: "You have earned your first rental income",
        condition:
          accountBalances.wallet >= 300000 && accountBalances.properties > 0,
      },
      {
        stage: 8,
        text: "Financially Free",
        description: "Your passive income is greater than your living expenses",
        condition:
          accountBalances.wallet >= 500000 && accountBalances.properties > 0,
      },
      {
        stage: 9,
        text: "You're Financially Free indeed",
        description:
          "Your wallet is at least N1000000, and you have properties",
        condition:
          accountBalances.wallet >= 1000000 && accountBalances.properties > 0,
      },
    ],
    [accountBalances]
  );

  // const currentStage = useMemo(() => {
  //   return (
  //     wealthStages.find((stage) => stage.condition) || {
  //       stage: 0,
  //       text: "Calculating...",
  //       description: "Calculating your financial status...",
  //     }
  //   );
  // }, [wealthStages]);

  const currentStage = useMemo(() => {
    if (!accountBalances) {
      return {
        stage: 0,
        text: "Calculating...",
        description: "Calculating your financial status...",
      };
    }
    return (
      wealthStages.find((stage) => stage.condition) || {
        stage: 0,
        text: "Calculating...",
        description: "Calculating your financial status...",
      }
    );
  }, [wealthStages, accountBalances]);

  // Dispatch the current stage to the Redux store
  useEffect(() => {
    dispatch(updateWealthStage(currentStage));
  }, [dispatch, currentStage]);

  return (
    <section className="border border-gray-300 bg-white p-4 rounded-lg relative">
      <Section style={{ marginTop: -1 }}>MY FINANCIAL STATUS</Section>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,5fr] gap-4 mt-4 font-karla">
        <div style={{ position: "relative", marginTop: 10 }}>
          <Subtitle style={{ marginTop: -5, marginBottom: 1, fontSize: 13 }}>
            Level{" "}
            <span className="font-proxima font-bold">{currentStage.stage}</span>
          </Subtitle>
          <Title
            style={{ color: "silver", position: "absolute", marginTop: 0 }}
          >
            {currentStage.text}
          </Title>
          <Subtitle style={{ marginBottom: -35, marginTop: 61, fontSize: 12 }}>
            <div className="border border-gray-300 p-2 rounded-lg">
              {currentStage.description}
            </div>
          </Subtitle>
        </div>
        <div>
          <Image
            width="240"
            height="240"
            src={
              currentStage.stage === 0
                ? `/images/9steps0.png`
                : `/images/9steps${currentStage.stage}.png`
            }
            alt="Wealth Map"
            className="w-full h-auto rounded-lg object-cover"
          />

          <PrimaryButton
            className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm mt-7 mb-7"
            onClick={handleLearnMore}
            background="#4C28BC"
            hoverBackgroundColor="#351265"
            color="#fff"
            hoverColor="#fff"
            startIcon={
              <IonIcon
                icon={trendingUpOutline}
                style={{ fontSize: "31px", marginRight: 5 }}
              />
            }
            style={{ width: "95%", letterSpacing: 0.5, marginBottom: -10 }}
          >
            Learn More
          </PrimaryButton>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          header="Wealth Map"
          body={
            <div className="relative w-full h-full">
              <Img
                src={modalImageSrc || `/images/9steps10.png`}
                alt="Wealth Map"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                className="w-full h-full"
              />
            </div>
          }
          buttonText="Go back"
          onButtonClick={handleCloseModal}
          zIndex={50}
          className="w-full h-full max-w-screen max-h-screen p-4"
        />
      </div>
    </section>
  );
};

export default WealthMapSection;
