"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import AccountCard from '@/app/components/accountCard';
import { Divider, Tooltip } from '@mui/material';


const HomePage = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarRetracted(!isSidebarRetracted);
  };

  return (
    <div className="flex h-screen overflow-hidden w-full mt-5" style={{marginLeft: -85}}>
      {/* Sidebar */}
      <Sidebar onToggle={handleSidebarToggle} />

      {/* Main Content Area */}
      <div className={`flex-grow flex flex-col transition-all duration-300 ${isSidebarRetracted ? 'ml-16' : 'ml-80'}`} style={{backgroundColor: 'blue'}}>
        {/* Header */}
        <Header isSidebarRetracted={isSidebarRetracted} />

        {/* Main Dashboard Content */}
        <main className="flex-grow pt-16 bg-gray-100 overflow-auto w-full " style={{backgroundColor: '#F7F5FF'}}>
          <div className="px-6 max-w-full">
            
            
          <div className="flex items-center mb-4 relative">
          {/* Profile Picture */}
          <div className="relative">
            <img src="/images/DrTsquare.png" alt="Profile" className="w-24 h-24 rounded-full border-2 border-purple-400" />
            <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-proxima text-sm">3</div>
          </div>

          <div className="ml-4">
            <Title>Hi Tolulope,</Title>
            <Subtitle>Good morning! Welcome to MyFund 👋🏼</Subtitle>
          </div>
        </div>


            {/* Property Container */}
    {/* Property Container */}
<div className="rounded-lg p-4 grid grid-cols-[auto,1fr] items-start" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'karla', fontSize: 14 }}>
  <img src="/images/logo..png" alt="MyFund Logo" className="w-12 h-12 mr-4 self-center" />
  <p className="overflow-auto">
    <span className="font-proxima font-bold text-purple1">Every January and July</span>, you will earn 
    <span className="font-proxima font-bold"> 13% p.a.</span> on your SAVINGS and 
    <span className="font-proxima font-bold"> 20% p.a.</span> on your INVESTMENTS
    (credited to your wallet) until you have saved enough to buy properties and earn lifetime rent.
    So, keep growing your funds.
  </p>
</div>


            {/* My Accounts Section */}
            <Section>MY ACCOUNTS</Section>

            {/* Account Cards */}
              <div className="flex gap-4 mt-2 overflow-x-auto overscroll-x-contain scrollbar-thin scrollbar-thumb-purple-400">
                <AccountCard 
                  icon="save-outline" 
                  label="SAVINGS" 
                  rate="13% p.a." 
                  currency="₦" 
                  amount="1,234,567.89" 
                  buttonText="QuickSave" 
                  buttonIcon="save-outline" 
                />
                <AccountCard 
                  icon="trending-up-outline" 
                  label="INVESTMENTS" 
                  rate="20% p.a." 
                  currency="₦" 
                  amount="2,345,678.90" 
                  buttonText="QuickInvest" 
                  buttonIcon="trending-up-outline" 
                />
                <AccountCard 
                  icon="home-outline" 
                  label="PROPERTIES" 
                  rate="yearly rent" 
                  currency="" 
                  amount="02" 
                  buttonText="Buy Properties" 
                  buttonIcon="home-outline" 
                />
                <AccountCard 
                  icon="wallet-outline" 
                  label="WALLET" 
                  rate="(My Earnings)" 
                  currency="₦" 
                  amount="265,500.50" 
                  buttonText="Withdraw" 
                  buttonIcon="wallet-outline" 
                />
              </div>

              <Divider className="my-4 bg-gray-100" style={{marginTop: 30, marginBottom: 30}}/>

          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
