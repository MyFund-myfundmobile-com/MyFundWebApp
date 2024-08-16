"use client";
import React from "react";
import { useSelector } from "react-redux";
import Section from "@/components/section";
import { IonIcon } from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";

interface Transaction {
  description: string;
  date: string;
  time: string;
  transaction_id: string;
  amount: number;
  type: "credit" | "debit";
}

const Referrals: React.FC = () => {
  // Fetch transactions from the Redux store and default to an empty array if undefined
  const transactions: Transaction[] = useSelector(
    (state: any) => state.transactions || []
  );

  // Check if transactions are defined and filter to only include completed referrals
  const completedReferrals = transactions?.filter(
    (transaction) => !transaction.description.includes("Pending")
  );

  return (
    <section className="mt-4">
      <Section>MY REFERRALS ({completedReferrals.length})</Section>
      <div className="overflow-x-auto">
        {completedReferrals.map((transaction, index) => (
          <div
            key={index}
            className="flex mt-2 items-center justify-between bg-white rounded-lg p-2 mb-2 transition-colors duration-300 hover:bg-gray-100 text-sm"
          >
            <div className="flex-1">
              <div
                className="text-sm font-semibold"
                style={{ marginBottom: -3, fontSize: 14 }}
              >
                {transaction.description}
              </div>
              <div
                className="text-xs text-gray-500 mt-1"
                style={{ fontSize: 8, marginTop: -5 }}
              >
                {transaction.date} | {transaction.time}
              </div>
              <div
                className="text-xs text-gray-400 mt-1"
                style={{ fontSize: 8, marginTop: -5 }}
              >
                ID: {transaction.transaction_id}
              </div>
            </div>
            <div className="ml-4">
              <IonIcon
                icon={checkmarkCircleOutline}
                className="text-green-600"
                size="small"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Referrals;
