import React, { useState } from 'react';
import { Divider, Tooltip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { menuOutline, personCircleOutline, walletOutline, trendingUpOutline, businessOutline, settingsOutline, chatbubbleOutline, logOutOutline, chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';

interface SidebarProps {
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isRetracted, setIsRetracted] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('DASHBOARD');

  const handleToggleSidebar = () => {
    setIsRetracted(!isRetracted);
    onToggle();
  };

  const handleMenuItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className={`bg-purple1 h-full p-4 flex flex-col justify-between fixed left-0 top-0 bottom-0 transition-all duration-300 ${isRetracted ? 'w-16' : 'w-64'} z-50`}>
      <div>
        <div className="flex items-center justify-between mt-5 mb-10">
          <IonIcon icon={menuOutline} className="text-white text-2xl cursor-pointer" onClick={handleToggleSidebar} />
          {!isRetracted && (
            <Tooltip title="Go to the home page" placement="right">
              <img src="/images/myfund.png" alt="MyFund Logo" className="w-26 h-8 mx-auto cursor-pointer" onClick={() => window.location.href = '/'} />
            </Tooltip>
          )}
        </div>

        <div className="text-white px-2 space-y-6 font-nexa">
          {[
            { icon: personCircleOutline, label: 'DASHBOARD' },
            { icon: walletOutline, label: 'SAVE' },
            { icon: trendingUpOutline, label: 'INVEST' },
            { icon: businessOutline, label: 'BUY PROPERTIES' },
            { icon: walletOutline, label: 'WITHDRAW' }
          ].map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${activeItem === item.label ? 'bg-[#F7F5FF] text-[#62028C] transform scale-105' : 'hover:bg-opacity-10 hover:bg-gray-300'}`} 
              onClick={() => handleMenuItemClick(item.label)}
            >
              <IonIcon icon={item.icon} className="text-2xl mr-4" />
              {!isRetracted && <span className="tracking-wide font-bold" style={{fontSize: 14}}>{item.label}</span>}
              {isRetracted && <span className="hidden">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-400 px-2">
        {!isRetracted && <Divider className="my-4 bg-gray-400 mb-80" style={{marginBottom: 30}}/>}

        {[
          { icon: settingsOutline, label: 'Settings' },
          { icon: chatbubbleOutline, label: 'Message Admin' },
          { icon: logOutOutline, label: 'Log Out', class: 'text-red-500' }
        ].map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${activeItem === item.label ? 'bg-[#F7F5FF] text-[#BF73FA] transform scale-105' : 'hover:bg-opacity-10 hover:bg-gray-300'}`}
            onClick={() => handleMenuItemClick(item.label)}
          >
            <IonIcon icon={item.icon} className={`text-xl mr-4 ${item.class || ''}`} />
            {!isRetracted && <span className="tracking-wide" style={{fontSize: 12}}>{item.label}</span>}
            {isRetracted && <span className="hidden">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* Retract/Expand Chevron Button */}
      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-purple1 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={handleToggleSidebar}>
        <IonIcon icon={isRetracted ? chevronForwardOutline : chevronBackOutline} className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default Sidebar;
