"use client";
import React, { useState, useEffect } from "react";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import Section from "@/app/components/section";
import AccountCard from "@/app/components/accountCard";
import { Divider, Switch } from "@mui/material";
import TopSaversSection from "../home/topSavers";
import { saveOutline, arrowUpOutline } from "ionicons/icons";
import RecentTransactionsSection from "../home/recentTransactions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IonIcon } from "@ionic/react";
import QuickSaveModal from "./modals/quickSaveModal";
import AutoSaveModal from "./modals/autoSaveModal";
import { useLocation } from "react-router-dom"; // Import useLocation
import Image from "next/image";
import { RootState } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";

const SavePage = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(
    window.innerWidth < 900
  );
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showBalances, setShowBalances] = useState<boolean>(true);
  const [isAutoSaveOn, setIsAutoSaveOn] = useState<boolean>(false);
  const [isQuickSaveModalOpen, setIsQuickSaveModalOpen] =
    useState<boolean>(false);
  const [isAutoSaveModalOpen, setIsAutoSaveModalOpen] =
    useState<boolean>(false); // State for AutoSave modal
  const [amount, setAmount] = useState<string>(""); // State for selected amount
  const location = useLocation(); // Initialize useLocation

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const accountBalances = useSelector(
    (state: RootState) => state.auth.accountBalances
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any); // Dispatch fetchUserInfo action with type assertion to any
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (location.state?.quickSaveModalActive) {
      setIsQuickSaveModalOpen(true); // Open modal if quickSaveModalActive is true
    } else if (location.state?.autoSaveModalActive) {
      setIsAutoSaveModalOpen(true); // Open modal if quickSaveModalActive is true
    }
  }, [location.state]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsSidebarRetracted(true);
      } else {
        setIsSidebarRetracted(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 7000);

    return () => clearInterval(slideInterval);
  });

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
  };

  const toggleAutoSave = () => {
    setIsAutoSaveOn(!isAutoSaveOn);
    // Optionally open AutoSave modal automatically on toggle
    if (!isAutoSaveOn) {
      setIsAutoSaveModalOpen(true);
    }
  };

  const handleOpenQuickSaveModal = (presetAmount = "") => {
    setAmount(presetAmount);
    setIsQuickSaveModalOpen(true);
  };

  // Function to get the current month
  const getCurrentMonthName = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date();
    return monthNames[date.getMonth()];
  };

  const currentMonth = getCurrentMonthName();
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    });
  };

  const roundToSignificantFigures = (amount: number, sf: number) => {
    if (amount === 0) return 0;
    const factor = Math.pow(10, sf - Math.floor(Math.log10(amount)) - 1);
    return Math.round(amount * factor) / factor;
  };

  const nearestThousand = (amount: number) => {
    return Math.round(amount / 1000) * 1000;
  };

  const roundedGoalAmount = roundToSignificantFigures(
    nearestThousand(Number(userInfo.savings_goal_amount)),
    3
  );

  const slides = [
    {
      icon: saveOutline,
      text: (
        <>
          Your Savings Goal: You should be saving{" "}
          <span className="font-bold text-green-700">
            {formatCurrency(
              roundToSignificantFigures(
                Number(userInfo.savings_goal_amount) /
                  (Number(userInfo.time_period) * 12),
                3
              )
            )}
          </span>{" "}
          every month to reach{" "}
          <span className="font-bold text-green-700">
            {formatCurrency(roundedGoalAmount)}
          </span>{" "}
          for your{" "}
          <span className="font-bold text-green-700">
            {userInfo.preferred_asset}
          </span>{" "}
          investment in{" "}
          <span className="font-bold text-green-700">
            {Number(userInfo.time_period).toFixed(0)}
          </span>{" "}
          years. And you are now{" "}
          {/* <span className="font-bold text-green-500">{`${percentage(0).toFixed(
            1
          )}%`}</span>{" "} */}
          to success. Well done!
        </>
      ),
    },
    {
      icon: arrowUpOutline,
      text: (
        <>
          Top Saver: Congratulations {userInfo.firstName}, you are currently one
          of the top savers in {currentMonth}. 🥳🍾🎉🎊 Keep saving to earn more
          rewards.
        </>
      ),
    },
  ];

  const renderSlides = () => (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full md:w-[90%] px-4 py-8"
            style={{ minWidth: "100%" }}
          >
            <div
              className="flex w-full items-start rounded-lg p-4 sm:p-6"
              style={{
                backgroundColor: "#DCD1FF",
                color: "black",
                fontFamily: "Karla",
                fontSize: 14,
              }}
            >
              <IonIcon
                icon={slide.icon}
                className="text-5xl text-purple-500 mr-4"
              />
              <div>{slide.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentSlide ? "bg-purple-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );

  const presetAmounts = [5000, 10000, 15000, 20000, 40000, 100000];

  return (
    <div className="px-6 w-full animate-floatIn overflow-x-hidden">
      <div className="mb-5 flex items-center">
        <div>
          <Title>Save</Title>
          <Subtitle>
            Earn <span className="font-bold text-green-500">13% p.a.</span>{" "}
            every January and July
          </Subtitle>
        </div>
        <div className="ml-auto flex items-center">
          {typeof window !== "undefined" && window.innerWidth >= 900 && (
            <span
              className="mr-2"
              style={{ letterSpacing: 2, color: "grey", fontSize: 13 }}
            >
              {showBalances ? "HIDE" : "SHOW"} BALANCE{" "}
            </span>
          )}
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
        style={{
          marginBottom: -30,
          marginTop: -40,
          alignSelf: "flex-start",
          marginLeft: -5,
        }}
      >
        {renderSlides()}
      </div>
      <div className="flex items-center">
        <Section>MY SAVINGS ACCOUNT</Section>
      </div>
      <div
        className="flex flex-wrap md:flex-nowrap items-start"
        style={{ alignContent: "flex-start", alignItems: "flext-start" }}
      >
        <div
          className="relative"
          style={{
            flex: "1 1 auto",
            transform: "scale(1.25)",
            transformOrigin: "top left",
            marginBottom: 60,
          }}
        >
          <AccountCard
            icon="save-outline"
            label="SAVINGS"
            rate="13% p.a."
            currency="₦"
            amount={showBalances ? `${accountBalances.savings}` : "****"}
            buttonText="QuickSave"
            buttonIcon="save-outline"
            onButtonClick={() => handleOpenQuickSaveModal()} // Pass the function here without preset amount
          />
          {/* AutoSave Toggle using MUI Switch */}
          <div className="absolute bottom-2 left-2 flex items-center">
            <Switch
              checked={isAutoSaveOn}
              onChange={toggleAutoSave}
              color="default"
              inputProps={{ "aria-label": "toggle autosave" }}
              sx={{
                "& .MuiSwitch-thumb": {
                  color: isAutoSaveOn ? "#43FF8E" : "silver",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: isAutoSaveOn ? "#0AA447" : "grey",
                },
              }}
            />
            <span
              className={`text-gray-500 ml-1 font-karla ${
                isAutoSaveOn ? "text-green-500" : ""
              }`}
              style={{ fontSize: 12 }}
            >
              {isAutoSaveOn ? "AutoSave is ON" : "AutoSave is OFF"}
            </span>
          </div>
        </div>

        <div
          className="mt-4 md:mt-0 border rounded-lg p-2 animate-floatIn"
          style={{ flex: "1 1 auto" }}
        >
          <Section style={{ marginTop: -1, marginBottom: 1 }}>
            ADD MONEY TO YOUR ACCOUNT
          </Section>
          <div className="grid grid-cols-2 gap-2">
            {presetAmounts.map((preset, index) => (
              <button
                key={index}
                className="bg-[#DCD1FF] text-black rounded-md font-productSans whitespace-nowrap transform active:scale-95 active:bg-purple-600 active:text-white"
                style={{ height: "50px" }}
                onClick={() => handleOpenQuickSaveModal(preset.toString())} // Open modal with preset amount
              >
                {preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Divider
        className="my-4 bg-gray-100"
        style={{ marginTop: 20, marginBottom: 20 }}
      />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-3" style={{ alignSelf: "flex-start" }}>
          <RecentTransactionsSection />
        </div>
        <div className="md:col-span-3">
          <TopSaversSection />
        </div>
        <div className="md:col-span-6">
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <Section>MEET OUR MOST RECENT TOP SAVER...</Section>
            <div className="mb-4 mt-3">
              <Image
                width={720}
                height={720}
                src="/images/topsaver.png"
                alt="Refer and earn"
                className="w-full h-auto rounded-lg"
              />
              <div className="flex justify-center mt-4"></div>
            </div>
          </div>
        </div>
      </div>

      <QuickSaveModal
        isOpen={isQuickSaveModalOpen}
        onClose={() => setIsQuickSaveModalOpen(false)}
        initialAmount={amount}
        className="animate-floatIn"
      />
      <AutoSaveModal
        isOpen={isAutoSaveModalOpen}
        onClose={() => setIsAutoSaveModalOpen(false)}
        className="animate-floatIn"
      />
    </div>
  );
};

export default SavePage;
