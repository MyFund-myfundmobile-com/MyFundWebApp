"use client";
import React, { useState, useEffect } from "react";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Section from "@/components/section";
import AccountCard from "@/components/accountCard";
import { Divider, Tooltip } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import QuickActionsSection from "@/components/app/quickActions";
import RecentTransactionsSection from "@/components/app/recentTransactions";
import TopSaversSection from "@/components/app/topSavers";
import WealthMapSection from "@/components/app/wealthMap";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RootState } from "@/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, updateWealthStage } from "@/Redux store/actions";
import { AppDispatch } from "@/Redux store/store";

const HomePage: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showBalances, setShowBalances] = useState<boolean>(true);
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>("");
  const [getGreeting, setGetGreeting] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const accountBalances = useSelector(
    (state: RootState) => state.auth.accountBalances
  );
  const currentWealthStage = useSelector(
    (state: RootState) => state.auth.currentWealthStage
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any); // Dispatch fetchUserInfo action with type assertion to any
    }
  }, [dispatch, token]);

  // Fetch the current wealth stage and dispatch it only once when the component mounts
  useEffect(() => {
    if (currentWealthStage) {
      dispatch(updateWealthStage(currentWealthStage));
    }
  }, [dispatch, currentWealthStage]);

  const formatAmount = (amount: number) => {
    return amount < 10 ? `0${amount}` : `${amount}`;
  };

  const formatAmountWithCommas = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formattedSavings = formatAmountWithCommas(
    Number(accountBalances.savings)
  );
  const formattedInvestment = formatAmountWithCommas(
    Number(accountBalances.investment)
  );
  const formattedWallet = formatAmountWithCommas(
    Number(accountBalances.wallet)
  );

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
  };

  const { push: navigate } = useRouter(); // Move useNavigate here

  const handleQuickSaveClick = () => {
    navigate("/app/save?quickSaveModalActive=true");
  };

  const handleQuickInvestClick = () => {
    navigate("/app/invest?quickInvestModalActive=true");
  };

  useEffect(() => {
    const container = document.getElementById("account-cards-container");
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
    const container = document.getElementById("account-cards-container");
    if (container) {
      container.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("account-cards-container");
    if (container) {
      container.scrollLeft += 150;
    }
  };

  useEffect(() => {
    const greetings = ["Hey", "Hi", "Hello"];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);
  }, []);

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        return "Good morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    };
    setGetGreeting(getGreeting());
  }, []);

  const getBadgeColorClass = (stage: number) => {
    switch (stage) {
      case 1:
        return "#dF0000";
      case 2:
        return "#aF0000";
      case 3:
        return "#FF5722";
      case 4:
        return "#BF9F00";
      case 5:
        return "#BFBF00";
      case 6:
        return "#9FBF00";
      case 7:
        return "#6FBF00";
      case 8:
        return "#3FBF00";
      case 9:
        return "#005F00";
      default:
        return "#4c28BC";
    }
  };

  const badgeColorClass = getBadgeColorClass(currentWealthStage.stage);

  return (
    <div className="px-6 max-w-full animate-floatIn">
      <div className="flex items-center mb-4 mt-5 relative">
        <div className="relative">
          <Image
            src={userInfo?.profile_picture || `/images/Profile1.png`}
            width={120}
            height={120}
            alt="Profile"
            className={`w-24 h-24 rounded-full border-2 border-${badgeColorClass} cursor-pointer`}
            style={{ borderColor: `${badgeColorClass}` }}
            onClick={() => navigate("/App/settings")}
          />
          <Tooltip
            title={`My Financial Status: Level ${
              currentWealthStage.stage
            }: ${currentWealthStage.text.toUpperCase()}`}
            placement="right"
          >
            <div
              className={`absolute top-1 right-1 text-white rounded-full w-5 h-5 flex items-center border-${badgeColorClass} justify-center font-proxima text-sm cursor-pointer`}
              style={{
                backgroundColor: badgeColorClass ? badgeColorClass : "#4c28BC",
              }}
            >
              {currentWealthStage.stage}
            </div>
          </Tooltip>
        </div>
        <div className="ml-4">
          <Title>
            <span style={{ color: "#BB9CE8" }}>{greeting}</span>{" "}
            {userInfo?.firstName && `${userInfo.firstName},`}
          </Title>
          <Subtitle>{getGreeting}, Welcome to MyFund 👋🏼</Subtitle>
        </div>

        <div className="ml-auto flex items-center">
          {typeof window !== "undefined" && window.innerWidth >= 900 && (
            <span
              className="mr-2"
              style={{ letterSpacing: 2, color: "grey", fontSize: 13 }}
            >
              {showBalances ? "HIDE" : "SHOW"} BALANCES{" "}
            </span>
          )}
          <span
            onClick={handleToggleBalances}
            style={{
              cursor: "pointer",
              transition: "color 1s ease",
              fontSize: 29,
            }}
          >
            {showBalances ? (
              <Visibility
                style={{
                  color: "#4C28BC",
                  transition: "color 1s ease",
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
        className="rounded-lg p-4 sm:p-6 grid grid-cols-[auto,1fr] items-start overflow-hidden"
        style={{
          backgroundColor: "#DCD1FF",
          color: "black",
          fontFamily: "karla",
          fontSize: 15,
        }}
      >
        <Image
          src="/images/logo..png"
          width={1280}
          height={1280}
          alt="MyFund Logo"
          className="w-12 h-12 mr-4 self-center"
        />
        <p
          className="overflow-auto"
          style={{ wordWrap: "break-word" }}
        >
          <span className="font-proxima font-bold text-purple1">
            Every January and July
          </span>
          , you will earn
          <span className="font-proxima font-bold"> 13% p.a.</span> on your
          SAVINGS and
          <span className="font-proxima font-bold"> 20% p.a.</span> on your
          INVESTMENTS (credited to your wallet) until you have saved enough to
          buy properties and earn lifetime rent. So, keep growing your funds.
        </p>
      </div>

      <Section>MY ACCOUNTS</Section>

      <div className="relative">
        <div
          id="account-cards-container"
          className="flex gap-4 mt-2 overflow-x-auto w-full"
        >
          <AccountCard
            icon="save-outline"
            label="SAVINGS"
            rate="13% p.a."
            currency="₦"
            amount={showBalances ? formattedSavings : "****"}
            buttonText="QuickSave"
            rateColor="#43FF8E"
            buttonIcon="save-outline"
            onButtonClick={handleQuickSaveClick}
          />
          <AccountCard
            icon="trending-up-outline"
            label="INVESTMENTS"
            rate="20% p.a."
            currency="₦"
            amount={showBalances ? formattedInvestment : "****"}
            buttonText="QuickInvest"
            rateColor="#43FF8E"
            buttonIcon="trending-up-outline"
            onButtonClick={handleQuickInvestClick}
          />
          <AccountCard
            icon="home-outline"
            label="PROPERTIES"
            rate="yearly rent"
            rateColor="#43FF8E"
            currency=""
            amount={
              showBalances ? formatAmount(accountBalances.properties) : "**"
            }
            buttonText="Buy Properties"
            buttonIcon="home-outline"
          />
          <AccountCard
            icon="wallet-outline"
            label="WALLET"
            rate="(My Earnings)"
            rateColor="#43FF8E"
            currency="₦"
            amount={showBalances ? formattedWallet : "****"}
            buttonText="Withdraw"
            buttonIcon="wallet-outline"
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
          <QuickActionsSection />
          <RecentTransactionsSection />
        </div>

        <div className="md:col-span-3">
          <TopSaversSection />
        </div>

        <div className="md:col-span-6">
          <WealthMapSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
