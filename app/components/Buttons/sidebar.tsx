import React, { useState } from 'react';
import { Avatar, Divider } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { menuOutline, personCircleOutline, walletOutline, trendingUpOutline, businessOutline, settingsOutline, chatbubbleOutline, logOutOutline, chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';

interface SidebarProps {
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isRetracted, setIsRetracted] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setIsRetracted(!isRetracted);
    onToggle();
  };

  return (
    <div className={`bg-purple1 h-full p-4 flex flex-col justify-between fixed left-0 top-0 bottom-0 transition-all duration-300 ${isRetracted ? 'w-16' : 'w-80'} z-20`}>
      <div>
        <div className="flex items-center justify-between mb-8">
          <IonIcon icon={menuOutline} className="text-white text-2xl cursor-pointer" onClick={handleToggleSidebar} />
          {!isRetracted && <img src="/images/myfund.png" alt="MyFund Logo" className="w-26 h-8 mx-auto" />}
        </div>

        <div className="flex flex-col items-center mb-8">
          <Avatar alt="User Profile Picture" className={`mb-2 transition-all duration-300 ${isRetracted ? 'w-10 h-10' : 'w-32 h-32'}`} />
          {!isRetracted && (
            <div className="text-center">
              <p className="text-white font-bold text-xl">Mary</p>
              <p className="text-sm text-gray-400">mary@myfundmobile.com</p>
            </div>
          )}
        </div>

        <div className="text-white px-2 space-y-6 font-product-sans">
          <div className="flex items-center mb-3">
            <IonIcon icon={personCircleOutline} className="text-2xl mr-3" />
            {!isRetracted && <span className="font-bold">DASHBOARD</span>}
          </div>
          <div className="flex items-center mb-3">
            <IonIcon icon={walletOutline} className="text-2xl mr-3" />
            {!isRetracted && <span className="font-bold">SAVE</span>}
          </div>
          <div className="flex items-center mb-3">
            <IonIcon icon={trendingUpOutline} className="text-2xl mr-3" />
            {!isRetracted && <span className="font-bold">INVEST</span>}
          </div>
          <div className="flex items-center mb-3">
            <IonIcon icon={businessOutline} className="text-2xl mr-3" />
            {!isRetracted && <span className="font-bold">BUY PROPERTIES</span>}
          </div>
          <div className="flex items-center mb-3">
            <IonIcon icon={walletOutline} className="text-2xl mr-3" />
            {!isRetracted && <span className="font-bold">WITHDRAW</span>}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-400 px-2">
        <div className="flex items-center mb-3">
          <IonIcon icon={settingsOutline} className="text-2xl mr-3" />
          {!isRetracted && <span className="font-bold">Settings</span>}
        </div>
        <div className="flex items-center mb-3">
          <IonIcon icon={chatbubbleOutline} className="text-2xl mr-3" />
          {!isRetracted && <span className="font-bold">Message Admin</span>}
        </div>
        <div className="flex items-center mb-3">
          <IonIcon icon={logOutOutline} className="text-2xl text-red-500 mr-3" />
          {!isRetracted && <span className="font-bold">Log Out</span>}
        </div>
        {!isRetracted && <Divider className="my-4 bg-gray-400" />}
      </div>

      {/* Retract/Expand Chevron Button */}
      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-purple1 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={handleToggleSidebar}>
        <IonIcon icon={isRetracted ? chevronForwardOutline : chevronBackOutline} className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default Sidebar;
