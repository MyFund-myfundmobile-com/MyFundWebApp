"use client";
import React, { useEffect } from "react";
import Section from "@/app/components/section";
import { IonIcon } from "@ionic/react"; // Correct import for IonIcon
import { RootState } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";
import iconMapping from "./iconMapping";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Transaction {
  description: string;
  date: string;
  time: string;
  transaction_id: string;
  amount: number;
  type: "credit" | "debit";
  status: "pending" | "confirmed";
}

const RecentTransactionsSection: React.FC = () => {
  const { userTransactions, isLoading } = useSelector((state: RootState) => ({
    userTransactions: state.auth.userTransactions.slice(0, 5),
    isLoading: state.auth.isLoading, // Assuming you have an isLoading flag
  }));

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserTransactions(token));
    }
  }, [dispatch, token]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options).replace(",", "   |");
  };

  return (
    <section className="mt-4">
      <Section>MY RECENT TRANSACTIONS</Section>
      <div className="overflow-x-auto">
        {isLoading
          ? // Skeleton loader
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex mt-2 items-center justify-between bg-white rounded-lg p-2 mb-2 transition-colors duration-300 hover:bg-gray-100 text-sm"
              >
                {/* Start icon */}
                <div className="flex items-start p-2 bg-[#f7f5ff] rounded-lg border border-gray-300">
                  <Skeleton circle={true} height={28} width={28} />
                </div>
                {/* Description, Date & Time, Transaction ID */}
                <div className="flex-1 ml-3">
                  <div
                    className="text-sm font-semibold"
                    style={{
                      marginBottom: -2,
                      marginTop: 2,
                      fontSize: 17,
                      color: "#4c28BC",
                      fontFamily: "Karla",
                      letterSpacing: "-1.5px",
                    }}
                  >
                    <Skeleton width={150} />
                  </div>
                  <div
                    className="text-xs text-gray-400 mt-1"
                    style={{ fontSize: 8, marginTop: -5, fontFamily: "Karla" }}
                  >
                    <Skeleton width={100} />
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{
                      fontSize: 8,
                      marginTop: -5,
                      color: "#4c28BC",
                      fontFamily: "Karla",
                    }}
                  >
                    <Skeleton width={60} />
                  </div>
                </div>
                {/* Amount */}
                <div
                  className="text-sm font-medium"
                  style={{ fontFamily: "Karla" }}
                >
                  <Skeleton width={80} />
                </div>
              </div>
            ))
          : userTransactions.map((transaction, index) => {
              const iconName =
                iconMapping[transaction.description] || "arrow-down-outline";
              const isFailed = transaction.description
                .toLowerCase()
                .includes("failed");
              const amountClass = isFailed
                ? "text-red-600"
                : transaction.status === "pending" ||
                  transaction.description.toLowerCase().includes("pending")
                ? "text-gray-400"
                : transaction.type === "debit"
                ? "text-red-600"
                : "text-green-600";
              const iconClass = isFailed
                ? "text-red-600"
                : transaction.status === "pending" ||
                  transaction.description.toLowerCase().includes("pending")
                ? "text-gray-400"
                : transaction.type === "debit"
                ? "text-red-600"
                : "text-green-600";
              return (
                <div
                  key={index}
                  className="flex mt-2 items-center justify-between bg-white rounded-lg p-2 mb-2 transition-colors duration-300 hover:bg-gray-100 text-sm"
                >
                  {/* Start icon */}
                  <div
                    className={`flex items-start p-2 bg-[#f7f5ff] rounded-lg border border-gray-300 ${iconClass}`}
                  >
                    <IonIcon icon={iconName} style={{ fontSize: "30px" }} />
                  </div>
                  {/* Description, Date & Time, Transaction ID */}
                  <div className="flex-1 ml-3">
                    <div
                      className="text-sm font-semibold"
                      style={{
                        marginBottom: -2,
                        marginTop: 2,
                        fontSize: 17,
                        color: "#4c28BC",
                        fontFamily: "Karla",
                        letterSpacing: "-1.5px",
                      }}
                    >
                      {transaction.description}
                    </div>
                    <div
                      className="text-xs text-gray-400 mt-1"
                      style={{
                        fontSize: 8,
                        marginTop: -5,
                        fontFamily: "Karla",
                      }}
                    >
                      {formatDate(transaction.date)}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{
                        fontSize: 8,
                        marginTop: -5,
                        color: "#4c28BC",
                        fontFamily: "Karla",
                      }}
                    >
                      ID: {transaction.transaction_id}
                    </div>
                  </div>
                  {/* Amount */}
                  <div
                    className={`text-sm font-medium ${amountClass}`}
                    style={{ fontFamily: "Karla" }}
                  >
                    <span style={{ fontSize: "9px" }}>₦</span>
                    <span
                      style={{
                        letterSpacing: "-1px",
                        fontFamily: "Karla",
                        fontSize: "18px",
                      }}
                    >
                      {
                        Number(transaction.amount)
                          .toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          .split(".")[0]
                      }
                    </span>

                    <span style={{ fontSize: "9px", letterSpacing: "-1px" }}>
                      .{Number(transaction.amount).toFixed(2).split(".")[1]}
                    </span>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default RecentTransactionsSection;
