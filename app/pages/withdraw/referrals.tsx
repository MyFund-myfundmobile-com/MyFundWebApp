import React from 'react';
import Section from '@/app/components/section';
import { FaArrowUp, FaArrowDown, FaPiggyBank, FaCoins, FaDollarSign } from 'react-icons/fa';
import { IonIcon } from '@ionic/react';
import { checkmarkCircleOutline, ellipsisHorizontalCircleOutline } from 'ionicons/icons';

interface Transaction {
  description: string;
  date: string;
  time: string;
  transaction_id: string;
  amount: number;
  type: 'credit' | 'debit';
}

// const iconMapping: { [key: string]: React.ElementType } = {
//   QuickSave: FaPiggyBank,
//   AutoSave: FaCoins,
//   QuickInvest: FaDollarSign,
//   AutoInvest: FaDollarSign,
//   Withdrawal: FaArrowDown,
//   FUNAAB: FaArrowUp,
//   ReferralReward: FaDollarSign,
//   'ReferralReward Pending': FaDollarSign,
// };

const createTransaction = (
  description: string,
  date: string,
  time: string,
  transaction_id: string,
  amount: number,
  type: 'credit' | 'debit'
): Transaction => ({
  description,
  date,
  time,
  transaction_id,
  amount,
  type,
});

const recentTransactions: Transaction[] = [
  createTransaction('tolulopeahmed', '2024-06-01', '09:30', '123456', 1000, 'credit'),
  createTransaction('finetolus (Pending)', '2024-06-02', '10:45', '123457', 2000, 'credit'),
  createTransaction('adeolaadolu (Pending)', '2024-06-03', '11:15', '123458', 1500, 'credit'),
  createTransaction('opeyemiadeyemo', '2024-06-04', '12:30', '123459', 500, 'debit'),
  createTransaction('posssible', '2024-06-05', '14:00', '123460', 750, 'credit'),
].slice(0, 5); // Limit to 5 transactions

const Referrals: React.FC = () => {
  return (
    <section className="mt-4">
      <Section>MY REFERRALS</Section>
      <div className="overflow-x-auto">
        {recentTransactions.map((transaction, index) => {
          const isPending = transaction.description.includes('Pending');
          const statusIcon = isPending ? ellipsisHorizontalCircleOutline : checkmarkCircleOutline;
          const statusColor = isPending ? 'text-gray-400' : 'text-green-600';

          return (
            <div
              key={index}
              className="flex mt-2 items-center justify-between bg-white rounded-lg p-2 mb-2 transition-colors duration-300 hover:bg-gray-100 text-sm"
            >
              {/* Description, Date & Time, Transaction ID */}
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ marginBottom: -3, fontSize: 14 }}>
                  {transaction.description}
                </div>
                <div className="text-xs text-gray-500 mt-1" style={{ fontSize: 8, marginTop: -5 }}>
                  {transaction.date} | {transaction.time}
                </div>
                <div className="text-xs text-gray-400 mt-1" style={{ fontSize: 8, marginTop: -5 }}>
                  ID: {transaction.transaction_id}
                </div>
              </div>
              {/* Amount */}
              <div className={`text-sm font-medium ${transaction.description.includes('Pending') ? 'text-gray-400' : 'text-green-600'}`}>
                {transaction.type === 'debit' ? '-' : '+'}₦{transaction.amount.toLocaleString()}
              </div>
              {/* Status */}
              <div className="ml-4">
                <IonIcon icon={statusIcon} className={statusColor} size="small" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Referrals;
