// RecentTransactionsSection.tsx
"use client";
import React, { useEffect } from "react";
import Section from "@/app/components/section";
import { IonIcon } from "@ionic/react";
import { RootState } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";
import iconMapping from "./iconMapping";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Subtitle from "@/app/components/subtitle";
import RecentTransactionsModal from "./modals/recentTransactionsModal";

interface Transaction {
  description: string;
  date: string;
  transaction_id: string;
  amount: number;
  type: "credit" | "debit";
  status: "pending" | "confirmed";
}

const RecentTransactionsSection: React.FC = () => {
  const { userTransactions, isLoading } = useSelector((state: RootState) => ({
    userTransactions: state.auth.userTransactions,
    isLoading: state.auth.isLoading,
  }));

  const displayedTransactions = userTransactions.slice(0, 5);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch<AppDispatch>();
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
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex mt-2 items-center justify-between bg-white rounded-lg p-2 mb-2 transition-colors duration-300 hover:bg-gray-100 text-sm"
            >
              <div className="flex items-start p-2 bg-[#f7f5ff] rounded-lg border border-gray-300">
                <Skeleton circle={true} height={28} width={28} />
              </div>
              <div className="flex-1 ml-3">
                <div className="text-sm font-semibold">
                  <Skeleton width={150} />
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  <Skeleton width={100} />
                </div>
                <div className="text-xs mt-1">
                  <Skeleton width={60} />
                </div>
              </div>
              <div className="text-sm font-medium">
                <Skeleton width={80} />
              </div>
            </div>
          ))
        ) : displayedTransactions.length === 0 ? (
          <div
            className="flex justify-center items-center text-gray-500 h-full"
            style={{ minHeight: "250px" }}
          >
            <Subtitle>You are yet to make any transactions</Subtitle>
          </div>
        ) : (
          displayedTransactions.map((transaction, index) => {
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

            return (
              <div
                key={index}
                className="flex mt-2 items-center justify-between bg-white rounded-lg p-2 mb-2 transition-colors duration-300 hover:bg-gray-100 text-sm cursor-pointer"
                onClick={openModal}
              >
                <div
                  className={`flex items-start p-2 rounded-lg border border-gray-300`}
                >
                  <IonIcon icon={iconName} style={{ fontSize: "30px" }} />
                </div>
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
                </div>
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
          })
        )}
      </div>
      <div
        className="text-center bg-white"
        style={{
          marginTop: -5,
          marginBottom: 5,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <a
          href="#"
          className="text-sm uppercase font-semibold text-gray-500"
          style={{
            display: "inline-block", // Ensure it behaves like a block for padding
            lineHeight: "1.5", // Add line height to center text vertically within padding
            paddingTop: 5,
            paddingBottom: 5,
          }}
          onClick={openModal}
        >
          View All Transactions
        </a>
      </div>
      <RecentTransactionsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transactions={userTransactions as Transaction[]}
      />
    </section>
  );
};

export default RecentTransactionsSection;
