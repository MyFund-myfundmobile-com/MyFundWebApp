"use client";
import React, { useState, useEffect } from "react";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Section from "@/components/section";
import AccountCard from "@/components/accountCard";
import { Divider, Tooltip } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Img } from "react-image";

const HomePage: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showBalances, setShowBalances] = useState<boolean>(true);
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>("");
  const [getGreeting, setGetGreeting] = useState<string>("");

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
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

  return (
    <div className="px-6 max-w-full animate-floatIn">
      <div className="flex items-center mb-4 mt-5 relative">
        <div className="relative">
          <Img
            src="/images/DrTsquare.png"
            width={120}
            height={120}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-purple-400"
          />
          <Tooltip
            title="My WealthMap"
            placement="right"
          >
            <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-proxima text-sm">
              3
            </div>
          </Tooltip>
        </div>
        <div className="ml-4">
          <Title>
            <span style={{ color: "#BB9CE8" }}>{greeting}</span> Tolulope,
          </Title>
          <Subtitle>{getGreeting}, Welcome to MyFund Admin Page 👋🏼</Subtitle>
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
            label="NEW USERS TODAY"
            rate="+3%"
            currency=""
            amount={showBalances ? "09" : "****"}
            buttonText="View List"
            buttonIcon="save-outline"
            style={{ transition: "opacity 0.3s ease" }}
          />
          <AccountCard
            icon="trending-up-outline"
            label="TOTAL USERS"
            rate="-2%"
            currency=""
            amount={showBalances ? "857" : "****"}
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div
          className="md:col-span-3"
          style={{ alignSelf: "flex-start" }}
        ></div>

        <div className="md:col-span-3"></div>

        <div className="md:col-span-6"></div>
      </div>
    </div>
  );
};

export default HomePage;
