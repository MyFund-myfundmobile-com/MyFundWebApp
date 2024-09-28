"use client";
import React from "react";
import Modal from "@/components/modal";
import { IonIcon } from "@ionic/react"; // Import IonIcon
import iconMapping from "../iconMapping";

// Assuming UserTransaction is defined somewhere
interface UserTransaction {
  description: string;
  date: string;
  transaction_id: string;
  amount: number;
  type: "credit" | "debit";
  status: "pending" | "confirmed"; // Ensure this matches
}

interface RecentTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: UserTransaction[]; // Make sure this matches
}

const RecentTransactionsModal: React.FC<RecentTransactionsModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="All Transactions"
      body={
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <ul className="space-y-3">
            {transactions.map((transaction, index) => {
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
                  <div
                    className={`flex items-start p-2 rounded-lg border border-gray-300 ${iconClass}`}
                  >
                    <IonIcon
                      icon={iconName}
                      style={{ fontSize: "30px" }}
                    />
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
          </ul>
        </div>
      }
      buttonText="Close"
      onButtonClick={onClose}
      zIndex={1000}
    />
  );
};

export default RecentTransactionsModal;
