import React, { useState, useEffect } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import AccountCard from '@/app/components/accountCard';
import { Divider } from '@mui/material';
import TopSaversSection from '../home/topSavers';
import RecentTransactionsSection from '../home/recentTransactions';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const WithdrawPage = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);
  const [showBalances, setShowBalances] = useState<boolean>(true);

  useEffect(() => {
    const container = document.getElementById('withdraw-account-cards-container');
    const handleScroll = () => {
      if (container) {
        setScrollPosition(container.scrollLeft);
        setShowLeftButton(container.scrollLeft > 0);
        setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth);
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    const container = document.getElementById('withdraw-account-cards-container');
    if (container) {
      container.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('withdraw-account-cards-container');
    if (container) {
      container.scrollLeft += 150;
    }
  };

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
  };

  return (
    <div className="px-6 max-w-full animate-floatIn">
      <div className="mb-5 flex items-center">
        <div>
        <Title>Withdraw</Title>
        <Subtitle>
          Move money between your accounts or to your bank.
        </Subtitle>
        </div>
        <div className="ml-auto flex items-center">
          <span className='mr-2' style={{ letterSpacing: 2, color: 'grey', fontSize: 13 }}>{showBalances ? 'HIDE' : 'SHOW'} BALANCES </span>
          <span onClick={handleToggleBalances} style={{ cursor: 'pointer', transition: 'color 3s ease', fontSize: 29 }}>
            {showBalances ? <Visibility style={{ color: '#4C28BC', transition: 'color 3s ease', fontSize: 29 }} /> : <VisibilityOff style={{ color: 'grey', transition: 'color 0.3s ease' }} />}
          </span>
        </div>
      </div>
      <Section>WITHDRAWAL PROTOCOL</Section>
      <div className="rounded-lg p-4 sm:p-6 mb-4" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'karla', fontSize: 14 }}>
        <p className="overflow-auto" style={{ wordWrap: 'break-word' }}>
          Kindly note the protocols for withdrawal. 10% charge for instant withdrawal from Savings. 15% charge if withdrawing instantly from Investments. 5% charge on completed property sales. Free withdrawal from Wallet. But to avoid charges, write a withdrawal request using Message Admin and receive your funds in 30 days (Savings) and 90 days (Investments).
        </p>
      </div>
      <Section>MY ACCOUNTS</Section>
      <div className="relative">
        <div id="withdraw-account-cards-container" className="flex gap-4 mt-2 overflow-x-auto w-full">
          <AccountCard
            icon="save-outline"
            label="SAVINGS"
            rate="13% p.a."
            currency="₦"
            amount={showBalances ? "1,234,567.89" : "****"}
            buttonText="Withdraw"
            buttonIcon="save-outline"
          />
          <AccountCard
            icon="trending-up-outline"
            label="INVESTMENTS"
            rate="20% p.a."
            currency="₦"
            amount={showBalances ? "2,345,678.90" : "****"}
            buttonText="Withdraw"
            buttonIcon="trending-up-outline"
          />
          <AccountCard
            icon="home-outline"
            label="PROPERTY"
            rate="yearly rent"
            currency=""
            amount={showBalances ? "02" : "**"}
            buttonText="Sell Property"
            buttonIcon="home-outline"
          />
          <AccountCard
            icon="wallet-outline"
            label="WALLET"
            rate="(My Earnings)"
            currency="₦"
            amount={showBalances ? "265,500.50" : "****"}
            buttonText="Withdraw"
            buttonIcon="wallet-outline"
          />
        </div>

        {showLeftButton && (
          <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg" onClick={scrollLeft} style={{ marginLeft: -25 }}>
            <IoIosArrowBack className="text-gray-600" />
          </button>
        )}
        {showRightButton && (
          <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg" onClick={scrollRight} style={{ marginRight: -25 }}>
            <IoIosArrowForward className="text-gray-600" />
          </button>
        )}
      </div>
   
      <Divider className="my-4 bg-gray-100" style={{marginTop: 20}}/>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-3">
          <Section>MY WITHDRAWALS</Section>
          <RecentTransactionsSection />
        </div>
        <div className="md:col-span-3">
          <Section>TOP SAVERS</Section>
          <TopSaversSection />
        </div>
        <div className="md:col-span-6">
          <Section>LATEST NEWS</Section>
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            {/* Feature some recent news here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
