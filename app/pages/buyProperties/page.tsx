"use client";
import React, { useState, useEffect } from "react";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import Section from "@/app/components/section";
import AccountCard from "@/app/components/accountCard";
import { Divider } from "@mui/material";
import BuyPropertyModal from "./modals/buyPropertyModal";
import { Img } from "react-image";
import { useLocation } from "react-router-dom"; // Import useLocation
import RecentTransactionsSection from "../home/recentTransactions";
import TopSaversSection from "../home/topSavers";
import WealthMapSection from "../home/wealthMap";
import { RootState } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/app/components/modal";
import { AppDispatch } from "@/app/Redux store/store";

const properties = [
  {
    image: "/images/amethyst.png",
    name: "K&Q Hostels, FUNAAB",
    description: "At Harmony Estate, opp. FUNAAB",
    availableUnits: "Selfcon: 26 units",
    cost: "N5,000,000/unit",
    roi: "N450,000 p.a.",
  },
  {
    image: "/images/funaab.png",
    name: "Amethyst Residences",
    description: "Near Main Campus Gate",
    availableUnits: "Selfcon: 10 units",
    cost: "N4,500,000/unit",
    roi: "N400,000 p.a.",
  },
  {
    image: "/images/myfundhostel.jpeg",
    name: "MyFund Hostel",
    description: "Behind the Cafeteria",
    availableUnits: "Shared Room: 20 units",
    cost: "N3,000,000/unit",
    roi: "N350,000 p.a.",
  },
  {
    image: "/images/phase2.png",
    name: "Phase 2 Hostels",
    description: "Beside Sports Complex",
    availableUnits: "Studio: 15 units",
    cost: "N4,000,000/unit",
    roi: "N380,000 p.a.",
  },
  {
    image: "/images/phase3.jpeg",
    name: "Phase 3 Apartments",
    description: "Engineering Block",
    availableUnits: "1 Bedroom: 18 units",
    cost: "N5,500,000/unit",
    roi: "N420,000 p.a.",
  },
  // {
  //   image: "/images/phase4.png",
  //   name: "Phase 4 Apartments",
  //   description: "Sports Complex",
  //   availableUnits: "Selfcon: 12 units",
  //   cost: "N6,000,000/unit",
  //   roi: "N500,000 p.a.",
  // },
];

const BuyPropertiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false); // For Sell Properties Modal

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const accountBalances = useSelector(
    (state: RootState) => state.auth.accountBalances
  );

  useEffect(() => {
    // Ensure page scrolls to the top on mobile when the page mounts
    if (window.innerWidth < 900) {
      window.scrollTo(0, 0); // Scroll to top
    }
  }, []);

  useEffect(() => {
    if (location.state?.buyPropertyModalActive) {
      setIsModalOpen(true);
    }
  }, [location.state]);

  const formatAmount = (amount: number) => {
    return amount < 10 ? `0${amount}` : `${amount}`;
  };

  const [selectedProperty, setSelectedProperty] = useState<{
    image: string;
    title: string;
    cost: number;
    earnings: number;
  } | null>(null);

  const handleOpenModal = (property: {
    image: string;
    name: string;
    description: string;
    availableUnits: string;
    cost: string;
    roi: string;
  }) => {
    setSelectedProperty({
      image: property.image,
      title: property.name,
      cost: parseFloat(property.cost.replace("N", "").replace(/,/g, "")),
      earnings: parseFloat(property.roi.replace("N", "").replace(/,/g, "")),
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSellButtonClick = () => {
    if (accountBalances.properties === 0) {
      setIsSellModalOpen(true);
    } else {
      console.log("Sell Properties Clicked");
    }
  };

  const handleSellModalClose = () => {
    setIsSellModalOpen(false);
  };

  return (
    <div className="px-6 w-full animate-floatIn overflow-x-hidden">
      <Title>Own</Title>
      <Subtitle>Buy properties and earn lifetime rental income.</Subtitle>
      <div className="mb-8 mt-4">
        <Img
          src="/images/ownership2.png"
          width={900}
          height={900}
          alt="Ownership"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <Section>MY PROPERTIES</Section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div
          className="relative"
          style={{
            flex: "1 1 auto",
            transform: "scale(1.40)",
            transformOrigin: "top left",
            marginBottom: 60,
          }}
        >
          <AccountCard
            icon="save-outline"
            label="MY PROPERTIES"
            rate="yearly rent"
            rateColor="#43FF8E"
            currency=""
            amount={formatAmount(accountBalances.properties)}
            buttonText="Sell Properties"
            buttonIcon="home-outline"
            onButtonClick={handleSellButtonClick}
          />
        </div>

        {properties.map((property, index) => (
          <AccountCard
            key={index}
            icon="home-outline"
            label={property.name}
            rate={property.roi}
            currency="₦"
            amount={property.cost}
            buttonText="Buy Now"
            buttonIcon="home-outline"
            style={{
              // backgroundImage: "url(/images/icb2.png)"
              color: "#4c28Bc",
            }}
            isPropertyCard
            propertyDetails={{
              name: property.name,
              description: property.description,
              availableUnits: property.availableUnits,
              cost: property.cost,
              roi: property.roi,
            }}
            image={property.image}
            onButtonClick={() => handleOpenModal(property)}
          />
        ))}
      </div>
      <Divider
        className="my-4 bg-gray-100"
        style={{ marginTop: 20, marginBottom: 20 }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-4">
          <RecentTransactionsSection />
        </div>
        <div className="md:col-span-4">
          <TopSaversSection />
        </div>
        <div className="md:col-span-4">
          <WealthMapSection />
        </div>
      </div>

      {selectedProperty && (
        <BuyPropertyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          property={selectedProperty}
        />
      )}

      {isSellModalOpen && (
        <Modal
          isOpen={isSellModalOpen}
          onClose={handleSellModalClose}
          header="Sell Property"
          body="You are yet to acquire a property."
          buttonText="Close"
          zIndex={1000}
          onButtonClick={handleSellModalClose}
        />
      )}
    </div>
  );
};

export default BuyPropertiesPage;
