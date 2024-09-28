"use client";
import React, { useState, useEffect } from "react";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Section from "@/components/section";
import AccountCard from "@/components/accountCard";
import { Divider, Tooltip } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import TopSaversSection from "@/components/app/topSavers";
import RecentSignups from "@/components/admin/recentSignups";
import RecentHouseOwners from "@/components/admin/recentHouseOwners";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  fetchUserInfo,
  updateWealthStage,
  fetchAllUsers,
} from "@/Redux store/actions";
import { AppDispatch } from "@/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux store/store";

import { useRouter, usePathname } from "next/navigation";

const calculateRate = (newUsersToday: number, newUsersPreviousDay: number) => {
  if (newUsersPreviousDay === 0) return "+100%"; // If there were no users yesterday.
  const rate =
    ((newUsersToday - newUsersPreviousDay) / newUsersPreviousDay) * 100;
  return `${rate >= 0 ? "+" : ""}${rate.toFixed(2)}%`;
};

const calculateRateForPeriod = (
  currentPeriod: number,
  previousPeriod: number
) => {
  if (previousPeriod === 0) return "+100%"; // Avoid division by zero.
  const rate = ((currentPeriod - previousPeriod) / previousPeriod) * 100;
  return `${rate >= 0 ? "+" : ""}${rate.toFixed(2)}%`;
};

const HomePage: React.FC = () => {
  const [rate, setRate] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showBalances, setShowBalances] = useState<boolean>(true);
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>("");
  const [getGreeting, setGetGreeting] = useState<string>("");

  const [selectedLabel, setSelectedLabel] = useState<string>("This Month");
  const [totalNewUsers, setTotalNewUsers] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const totalUsers = useSelector(
    (state: RootState) => state.auth.allUsers?.length || 0
  );
  const currentWealthStage = useSelector(
    (state: RootState) => state.auth.currentWealthStage
  );
  const allUsers = useSelector((state: RootState) => state.auth.allUsers);

  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const { push: navigate } = useRouter();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any);
      dispatch(fetchAllUsers(token) as any).finally(() => setLoading(false));
    }
  }, [dispatch, token]);

  useEffect(() => {
    console.log("All users have been fetched successfully:", totalUsers); // Add this line
  }, [totalUsers]);

  const totalNewUsersThisMonth = useSelector(
    (state: RootState) =>
      state.auth.allUsers?.filter((user) => {
        const joinedDate = new Date(user.date_joined);
        return (
          joinedDate.getFullYear() === new Date().getFullYear() &&
          joinedDate.getMonth() === 8 // September is month 8 (0-based index)
        );
      }).length || 0
  );

  const totalNewUsersThisWeek = useSelector(
    (state: RootState) =>
      state.auth.allUsers?.filter((user) => {
        const joinedDate = new Date(user.date_joined);
        const now = new Date();
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return joinedDate >= oneWeekAgo && joinedDate <= now;
      }).length || 0
  );

  console.log("Total new users this month:", totalNewUsersThisMonth);
  console.log("Total new users this week:", totalNewUsersThisWeek);
  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any);
      dispatch(fetchAllUsers(token) as any)
        .then(() => {
          console.log("All users fetched:", allUsers);
        })
        .finally(() => setLoading(false));
    }
  }, [dispatch, token, allUsers]);

  useEffect(() => {
    if (currentWealthStage) {
      dispatch(updateWealthStage(currentWealthStage));
    }
  }, [dispatch, currentWealthStage]);

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
  };

  const handleRangeUpdate = (label: string, count: number) => {
    const labelMapping: Record<string, string> = {
      daily: "Today",
      weekly: "This Week",
      monthly: "This Month",
      quarterly: "The Last 4 Months",
      last6months: "The Last 6 Months",
      lastYear: "The Last 1 Year",
    };

    setSelectedLabel(labelMapping[label]);
    setTotalNewUsers(count);
  };

  const handleEmailClick = () => {
    navigate("/admin/emails?isModalOpen=true");
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
    const greetings = ["Admin", "Exec", "Admin"];
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
    setGetGreeting(getGreeting);
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

  useEffect(() => {
    if (selectedLabel === "Today") {
      const todayUsers =
        allUsers?.filter((user) => {
          const joinDate = new Date(user.date_joined);
          const today = new Date();
          return (
            joinDate.getFullYear() === today.getFullYear() &&
            joinDate.getMonth() === today.getMonth() &&
            joinDate.getDate() === today.getDate()
          );
        }).length || 0;

      const previousDayUsers =
        allUsers?.filter((user) => {
          const joinDate = new Date(user.date_joined);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return (
            joinDate.getFullYear() === yesterday.getFullYear() &&
            joinDate.getMonth() === yesterday.getMonth() &&
            joinDate.getDate() === yesterday.getDate()
          );
        }).length || 0;

      setRate(calculateRate(todayUsers, previousDayUsers));
    } else if (selectedLabel === "This Week") {
      const now = new Date();
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - now.getDay());

      const lastWeekStart = new Date(startOfWeek);
      lastWeekStart.setDate(startOfWeek.getDate() - 7);

      const usersThisWeek =
        allUsers?.filter((user) => {
          const joinDate = new Date(user.date_joined);
          return joinDate >= startOfWeek && joinDate <= now;
        }).length || 0;

      const usersLastWeek =
        allUsers?.filter((user) => {
          const joinDate = new Date(user.date_joined);
          return joinDate >= lastWeekStart && joinDate < startOfWeek;
        }).length || 0;

      setRate(calculateRateForPeriod(usersThisWeek, usersLastWeek));
    }
    // Add similar calculations for "This Month", "Last 4 Months", etc.
  }, [selectedLabel, allUsers]);

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
            onClick={() => navigate("/admin/App/settings")}
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
          <Subtitle>
            {getGreeting}, Welcome to the MyFund Admin Page 👋🏼
          </Subtitle>
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

      <Section>SUMMARY</Section>

      <div className="relative">
        <div
          id="account-cards-container"
          className="flex gap-4 mt-2 overflow-x-auto w-full"
        >
          <AccountCard
            icon="save-outline"
            label={`NEW USERS ${selectedLabel.toUpperCase()}`}
            rate={rate}
            currency=""
            amount={showBalances ? totalNewUsers.toString() : "****"}
            buttonText="View List"
            buttonIcon="save-outline"
            style={{ transition: "opacity 0.3s ease" }}
          />

          <AccountCard
            icon="trending-up-outline"
            label="TOTAL USERS"
            rate="-2%"
            currency={
              loading ? (
                <CircularProgress
                  size={24}
                  className="mr-2"
                />
              ) : (
                ""
              )
            }
            amount={
              loading
                ? totalUsers.toString()
                : showBalances
                ? totalUsers.toString()
                : "****"
            }
            buttonText="View List"
            buttonIcon="trending-up-outline"
            style={{ transition: "opacity 0.3s ease" }}
          />

          <AccountCard
            icon="home-outline"
            label="TOTAL USER SAVINGS"
            rate="+3%"
            currency="₦"
            amount={showBalances ? "23,502,231.25" : "**"}
            buttonText="View Details"
            buttonIcon="home-outline"
            style={{ transition: "opacity 0.3s ease" }}
          />
          <AccountCard
            icon="wallet-outline"
            label="TOTAL USER INVESTMENTS"
            rate="+9%"
            currency="₦"
            amount={showBalances ? "23,560,200.50." : "****"}
            buttonText="View Details"
            buttonIcon="wallet-outline"
            style={{ transition: "opacity 0.3s ease" }}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="border border-gray-300 bg-[#dfd6fe] rounded-lg p-4">
          <RecentSignups onRangeUpdate={handleRangeUpdate} />
        </div>
        <div className="border border-gray-300 bg-[#dfd6fe] rounded-lg p-4">
          <TopSaversSection />
        </div>
        <div className="border border-gray-300 bg-[#dfd6fe] rounded-lg p-4">
          <RecentHouseOwners />
        </div>
      </div>

      <div className="fixed bottom-20 right-20 z-50 flex flex-col items-center">
        <Tooltip
          title="Send Emails"
          placement="top"
          arrow
        >
          <div
            className="relative group cursor-pointer"
            onClick={handleEmailClick}
          >
            <div className="w-16 h-16 rounded-full bg-purple-500 shadow-lg flex items-center justify-center transition-transform transform group-hover:scale-110 group-hover:bg-purple-700">
              <Image
                src="/images/email.png"
                alt="Email"
                width={42}
                height={42}
              />
            </div>
          </div>
        </Tooltip>
        <span className="text-xs font-karla italic text-gray-600 mt-2">
          Send Emails
        </span>
      </div>
    </div>
  );
};

export default HomePage;
