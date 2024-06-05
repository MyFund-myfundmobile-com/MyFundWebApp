"use client";

import React, { useState } from 'react';
import Sidebar from '../components/Buttons/sidebar';
import Header from '../components/Buttons/header';

const HomePage = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarRetracted(!isSidebarRetracted);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar onToggle={handleSidebarToggle} />

      {/* Main Content Area */}
      <div className={`flex-grow flex flex-col transition-all duration-300 ${isSidebarRetracted ? 'ml-16' : 'ml-80'}`}>
        {/* Header */}
        <Header isSidebarRetracted={isSidebarRetracted} />

        {/* Main Dashboard Content */}
        <main className="flex-grow pt-16 bg-gray-100 overflow-auto">
          <div className="px-6 max-w-full">
            <h1 className="text-5xl  mb-1 mt-4 tracking-tight font-proxima font-bold text-purple1">Dashboard</h1>
            <p className="text-gray-600 font-karla tracking-tight" style={{fontSize: 15, color:'grey'}}>
              Every January and July, you will earn 13% p.a. on your SAVINGS and 20% p.a. on your INVESTMENTS
              (credited to your wallet) until you have saved enough to buy properties and earn lifetime rent.
              So, keep growing your funds.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
