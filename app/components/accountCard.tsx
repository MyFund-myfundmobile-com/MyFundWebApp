"use client";
import React, { useState, useEffect } from "react";
import {
  IoSaveOutline,
  IoWalletOutline,
  IoTrendingUpOutline,
  IoHomeOutline,
  IoArrowDownOutline,
} from "react-icons/io5";
import { Img } from "react-image";

interface AccountCardProps {
  icon:
    | "save-outline"
    | "wallet-outline"
    | "trending-up-outline"
    | "home-outline";
  label: string;
  rate: string;
  currency: React.ReactNode;
  amount: string;
  buttonText: string;
  buttonIcon:
    | "save-outline"
    | "wallet-outline"
    | "trending-up-outline"
    | "home-outline"
    | "arrow-down-outline";
  style?: React.CSSProperties;
  isPropertyCard?: boolean;
  propertyDetails?: {
    name: string;
    description: string;
    availableUnits: string;
    cost: string;
    roi: string;
  };
  image?: string;
  onButtonClick?: () => void;
  rateColor?: string; // Add this prop
}

const AccountCard: React.FC<AccountCardProps> = ({
  icon,
  label,
  rate,
  currency,
  amount,
  buttonText,
  buttonIcon,
  style,
  isPropertyCard,
  propertyDetails,
  image,
  onButtonClick,
  rateColor,
}) => {
  const [whole, decimal] = amount.split(".");

  const iconComponents: Record<string, JSX.Element> = {
    "save-outline": <IoSaveOutline size={16} className="text-gray-500 mr-2" />,
    "wallet-outline": (
      <IoWalletOutline size={16} className="text-gray-500 mr-2" />
    ),
    "trending-up-outline": (
      <IoTrendingUpOutline size={16} className="text-gray-500 mr-2" />
    ),
    "home-outline": <IoHomeOutline size={16} className="text-gray-500 mr-2" />,
  };

  const buttonIconComponents: Record<string, JSX.Element> = {
    "save-outline": (
      <IoSaveOutline
        size={16}
        className="mr-1 mt--1"
        style={{ marginTop: -3 }}
      />
    ),
    "wallet-outline": (
      <IoWalletOutline
        size={16}
        className="mr-1 mt--1"
        style={{ marginTop: -3 }}
      />
    ),
    "trending-up-outline": (
      <IoTrendingUpOutline
        size={16}
        className="mr-1 mt--1"
        style={{ marginTop: -3 }}
      />
    ),
    "home-outline": (
      <IoHomeOutline size={16} className="mr-1" style={{ marginTop: -3 }} />
    ),
    "arrow-down-outline": (
      <IoArrowDownOutline
        size={16}
        className="mr-1"
        style={{ marginTop: -3 }}
      />
    ), // Add the down arrow icon
  };

  let amountColor = "text-white"; // Default color
  switch (label) {
    case "SAVINGS":
      amountColor = "text-white";
      break;
    case "INVESTMENTS":
      amountColor = "text-yellow-400";
      break;
    case "PROPERTIES":
      amountColor = "text-yellow-400";
      break;
    case "WALLET":
      amountColor = "text-[#43FF8E]";
      break;
    default:
      break;
  }

  const [showAmount, setShowAmount] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAmount(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`relative flex-grow min-w-[250px] ${
        isPropertyCard ? "max-w-[450px]" : "max-w-[300px]"
      } bg-cover rounded-lg p-4 flex flex-col justify-between`}
      style={{
        ...style,
        backgroundImage: "url(/images/icb2.png)",
        height: isPropertyCard ? "240px" : "160px",
      }}
    >
      {isPropertyCard ? (
        <div className="flex h-full">
          <div className="w-4/5 h-full overflow-hidden">
            <Img
              width={80}
              height={80}
              src={image ?? "/images/Profile1.png"} // Fallback image
              alt={propertyDetails?.name ?? "Default Alt Text"} // Fallback alt text
              className="object-cover w-full h-full rounded-l-lg"
              style={{ aspectRatio: "1 / 1", width: "100%", height: "100%" }}
            />
          </div>
          <div
            className="flex flex-col justify-between p-3 w-1/2 bg-cover bg-no-repeat"
            style={{ backgroundImage: "url(/images/icb2.png)" }}
          >
            <div>
              <div className="flex mb-2">
                <span
                  className="text-sm text-white font-proxima"
                  style={{ fontSize: 14 }}
                >
                  {propertyDetails?.name}
                </span>
              </div>
              <div className="text-white">
                <p style={{ fontSize: 9 }}>{propertyDetails?.description}</p>
                <p className="text-gray-400" style={{ fontSize: 9 }}>
                  {propertyDetails?.availableUnits}
                </p>
                <br />
                <p className="text-purple-200" style={{ fontSize: 13 }}>
                  {propertyDetails?.cost}
                </p>
                <p className="text-green-400" style={{ fontSize: 13 }}>
                  {propertyDetails?.roi}
                </p>
              </div>
            </div>
            <button
              className="absolute bottom-3 right-3 flex items-center bg-purple-400 text-white rounded-md py-1 px-2 font-productSans whitespace-nowrap transition-all duration-300 transform hover:scale-105 hover:bg-purple-500"
              onClick={onButtonClick}
            >
              {buttonIconComponents[buttonIcon]}
              <span className="text-sm">{buttonText}</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`overflow-hidden ${
              showAmount
                ? "opacity-100 transition-opacity duration-500"
                : "opacity-0"
            }`}
          >
            <div className="flex items-center mb-2">
              {iconComponents[icon]}
              <span className="text-sm text-gray-400 font-karla">
                {label}{" "}
                <span className={rateColor} style={{ color: rateColor }}>
                  @{rate}
                </span>
              </span>
            </div>
            <div className="flex items-baseline overflow-hidden text-ellipsis whitespace-nowrap">
              <span
                className="text-sm text-gray-400 font-karla tracking-tighter"
                style={{ alignSelf: "flex-start", marginTop: 7 }}
              >
                {currency}
              </span>
              <span
                className={`text-6xl font-karla tracking-tighter ${amountColor}`}
                style={{ letterSpacing: -4, whiteSpace: "nowrap" }}
              >
                {whole}
              </span>
              {decimal && (
                <span className="text-lg text-gray-400 font-karla tracking-tighter">
                  .{decimal}
                </span>
              )}
            </div>
          </div>
          <button
            className="absolute bottom-3 right-3 flex items-center bg-purple-400 text-white rounded-md py-1 px-2 font-productSans whitespace-nowrap transition-all duration-300 transform hover:scale-105 hover:bg-purple-500"
            onClick={onButtonClick}
          >
            {buttonIconComponents[buttonIcon]}
            <span className="text-sm">{buttonText}</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AccountCard;
