"use client";
import React from 'react';
import Section from '@/app/components/section';
import { FaArrowUp, FaArrowDown, FaPiggyBank, FaCoins, FaDollarSign } from 'react-icons/fa';

interface Transaction {
  description: string;
  date: string;
  time: string;
  transaction_id: string;
  amount: number;
  type: 'credit' | 'debit';
}

const iconMapping: { [key: string]: React.ElementType } = {
  QuickSave: FaPiggyBank,
  AutoSave: FaCoins,
  QuickInvest: FaDollarSign,
  AutoInvest: FaDollarSign,
  Withdrawal: FaArrowDown,
  FUNAAB: FaArrowUp,
  ReferralReward: FaDollarSign,
};

const recentTransactions: Transaction[] = [
  { description: 'Withdrawal', date: '2024-06-01', time: '09:30', transaction_id: '123456', amount: 1000, type: 'credit' as 'credit' },
  { description: 'Withdrawal', date: '2024-06-02', time: '10:45', transaction_id: '123457', amount: 2000, type: 'credit' as 'credit' },
  { description: 'ReferralReward', date: '2024-06-03', time: '11:15', transaction_id: '123458', amount: 1500, type: 'credit' as 'credit' },
  { description: 'Withdrawal', date: '2024-06-04', time: '12:30', transaction_id: '123459', amount: 500, type: 'debit' as 'debit' },
  { description: 'ReferralReward', date: '2024-06-05', time: '14:00', transaction_id: '123460', amount: 750, type: 'credit' as 'credit' },
].slice(0, 5); // Limit to 5 transactions

const WithdrawalTransactionsSection: React.FC = () => {
  return (
    <section className="mt-4">
      <Section>WITHDRAWAL TRANSACTIONS</Section>
      <div className="overflow-x-auto">
        {recentTransactions.map((transaction, index) => {
          const Icon = iconMapping[transaction.description] || FaArrowDown;
          return (
            <div key={index} className="flex mt-2 items-center justify-between bg-white rounded-lg p-2 mb-2 transition-colors duration-300 hover:bg-gray-100 text-sm">
              {/* Start icon */}
              <div className="mr-3 ml-3">
                <Icon className={transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'} size={18} />
              </div>
              {/* Description, Date & Time, Transaction ID */}
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ marginBottom: -3, fontSize: 14 }}>{transaction.description}</div>
                <div className="text-xs text-gray-500 mt-1" style={{ fontSize: 8, marginTop: -5 }}>{transaction.date} | {transaction.time}</div>
                <div className="text-xs text-gray-400 mt-1" style={{ fontSize: 8, marginTop: -5 }}>ID: {transaction.transaction_id}</div>
              </div>
              {/* Amount */}
              <div className={`text-sm font-medium ${transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'}`}>
                {transaction.type === 'debit' ? '-' : '+'}₦{transaction.amount.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WithdrawalTransactionsSection;
