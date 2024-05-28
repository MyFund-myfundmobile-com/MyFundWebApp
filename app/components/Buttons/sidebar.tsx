import React from 'react';
import { Avatar, Divider } from '@mui/material';
import { personCircleOutline, homeOutline, walletOutline, trendingUpOutline, businessOutline, settingsOutline, chatbubbleOutline, logOutOutline } from 'ionicons/icons'; // Import icons from Ionicons

const Sidebar: React.FC = () => {
  return (
    <div className="bg-purple1 h-full w-64 p-4 flex flex-col justify-between">
      <div>
        <img src="/images/myfund.png" alt="MyFund Logo" className="w-20 h-20 mb-4" />
        <Avatar alt="User Profile Picture" className="w-12 h-12 mb-2" />
        <p className="text-white font-bold">First Name</p>
        <p className="text-sm text-white">email@example.com</p>
        <Divider className="my-4" />
        <div className="text-white">
          <div className="flex items-center mb-3">
            <ion-icon icon={homeOutline} className="mr-2"></ion-icon>
            <span>MyFund</span>
          </div>
          <div className="flex items-center mb-3">
            <ion-icon icon={walletOutline} className="mr-2"></ion-icon>
            <span>SAVE</span>
          </div>
          <div className="flex items-center mb-3">
            <ion-icon icon={trendingUpOutline} className="mr-2"></ion-icon>
            <span>INVEST</span>
          </div>
          <div className="flex items-center mb-3">
            <ion-icon icon={businessOutline} className="mr-2"></ion-icon>
            <span>BUY PROPERTIES</span>
          </div>
          <div className="flex items-center mb-3">
            <ion-icon icon={walletOutline} className="mr-2"></ion-icon>
            <span>WITHDRAW</span>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-400">
        <Divider className="my-4" />
        <div className="flex items-center mb-3">
          <ion-icon icon={settingsOutline} className="mr-2"></ion-icon>
          <span>Settings</span>
        </div>
        <div className="flex items-center mb-3">
          <ion-icon icon={chatbubbleOutline} className="mr-2"></ion-icon>
          <span>Message Admin</span>
        </div>
        <div className="flex items-center mb-3">
          <ion-icon icon={logOutOutline} className="mr-2 text-red-500"></ion-icon>
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
