import React from 'react';
import Sidebar from '../components/Buttons/sidebar';
import Header from '../components/Buttons/header';

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600">
            Every January and July, you will earn 13% p.a. on your SAVINGS and 20% p.a. on your INVESTMENTS
            (credited to your wallet) until you have saved enough to buy properties and earn lifetime rent.
            So, keep growing your funds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
