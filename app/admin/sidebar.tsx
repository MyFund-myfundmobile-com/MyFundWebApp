"use client";

import React, { useState, useEffect } from 'react';
import { Divider, Tooltip, CircularProgress } from '@mui/material';
import { IonIcon } from '@ionic/react';
import {
  menuOutline, personCircleOutline, walletOutline, trendingUpOutline,
  businessOutline, settingsOutline, chatbubbleOutline, logOutOutline,
  chevronForwardOutline, chevronBackOutline,
  personCircleSharp, mailOutline, statsChartOutline, documentTextOutline
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../pages/settings/modals/logoutModals';
import Image from 'next/image';


interface SidebarProps {
  onToggle: () => void;
  isRetracted: boolean;
  onMenuItemClick: (item: string) => void; // Add this prop
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, isRetracted: initialRetracted, onMenuItemClick }) => { // Destructure the new prop
  const [isRetracted, setIsRetracted] = useState<boolean>(initialRetracted);
  const [activeItem, setActiveItem] = useState<string>('DASHBOARD');
  const [lastSelectedItem, setLastSelectedItem] = useState<string>('DASHBOARD');
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsRetracted(initialRetracted);
    if (initialRetracted) {
      setActiveItem('');
    } else {
      setActiveItem(lastSelectedItem);
    }
  }, [initialRetracted, lastSelectedItem]);

  const handleToggleSidebar = () => {
    if (isRetracted) {
      setActiveItem(lastSelectedItem);
    } else {
      setLastSelectedItem(activeItem);
    }
    setIsRetracted(!isRetracted);
    onToggle();
  };

  const handleMenuItemClickInternal = (item: string) => { // Renamed to avoid naming conflict
    setActiveItem(item); // Set the active item
    setLastSelectedItem(item);
    onMenuItemClick(item); // Call the function passed from Layout
    if (window.innerWidth < 900) {
      setIsRetracted(true);
      onToggle();
    }

    // Navigate after setting the active item
    switch (item) {
      case 'Log Out':
        setIsLoggingOut(true);
        break;
      case 'DASHBOARD':
        navigate('/admin/App/home'); // Navigate to the homepage
        break;
        case 'USERS':
          navigate('/admin/App/users'); // Navigate to the emails page
          break;
      case 'ADMINS':
            navigate('/admin/App/users'); // Navigate to the emails page
            break;
      case 'EMAILS':
        navigate('/admin/App/emails'); // Navigate to the emails page
        break;
      case 'TRANSACTIONS':
        navigate('/admin/App/transactions'); // Navigate to the transactions page
        break;
  
      case 'Settings':
        navigate('/admin/App/settings'); // Navigate to the transactions page
        break;  
      default:
        break;
    }
  };

  return (
    <div className={`bg-customPurple h-full p-4 flex flex-col justify-between fixed left-0 top-0 bottom-0 transition-all duration-300 ${isRetracted ? 'w-12' : 'w-64'} z-50`}>
      <div>
        <div className="flex items-center justify-between mt-5 mb-10">
          <IonIcon icon={menuOutline} className="text-white text-2xl cursor-pointer" onClick={handleToggleSidebar} />
          {!isRetracted && (
            <Tooltip title="Go to the home page" placement="right">
              <Image src="/images/myfund.png" width='104' height='32' alt="MyFund Logo" className="w-26 h-8 mx-auto cursor-pointer" onClick={() => window.location.href ="/"} />
              </Tooltip>
          )}
        </div>

        <div className="text-white px-2 space-y-6 font-nexa">
          {[
            { icon: personCircleSharp, label: 'DASHBOARD' },
            { icon: personCircleOutline, label: 'USERS' },
            { icon: mailOutline, label: 'ADMINS' },
            { icon: mailOutline, label: 'EMAILS' },
            { icon: trendingUpOutline, label: 'TRANSACTIONS' },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${activeItem === item.label ? 'bg-[#F7F5FF] text-[#9C1CB0] transform scale-110 font-black' : 'hover:bg-opacity-10 hover:bg-gray-300'}`}
              onClick={() => handleMenuItemClickInternal(item.label)}
            >
              <IonIcon icon={item.icon} className="text-2xl mr-4" />
              {!isRetracted && <span className="tracking-wide" style={{ fontSize: 14 }}>{item.label}</span>}
              {isRetracted && <span className="hidden">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-100 px-2">
        {!isRetracted && <Divider className="my-4 bg-gray-400 mb-80" style={{ marginBottom: 30 }} />}

        {[
          { icon: settingsOutline, label: 'Settings' },
          { icon: logOutOutline, label: 'Log Out', class: 'text-red-500' }
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center mb-3 px-4 py-2 cursor-pointer rounded transition-transform duration-300 ${activeItem === item.label ? 'bg-[#F7F5FF] text-[#BF73FA] transform scale-105 font-bold' : 'hover:bg-opacity-10 hover:bg-gray-300'}`}
            onClick={() => handleMenuItemClickInternal(item.label)}
          >
            {isLoggingOut && item.label === 'Log Out' ? (
              <>
                <CircularProgress size={20} className="mr-4" />
                <span className="tracking-wide" style={{ fontSize: 12 }}>Logging Out...</span>
              </>
            ) : (
              <>
                <IonIcon icon={item.icon} className={`text-xl mr-4 ${item.class || ''}`} />
                {!isRetracted && <span className="tracking-wide" style={{ fontSize: 12 }}>{item.label}</span>}
                {isRetracted && <span className="hidden">{item.label}</span>}
              </>
            )}
          </div>
        ))}
      </div>

      <div
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-purple1 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 hover:bg-customPurple hover:scale-110"
        onClick={handleToggleSidebar}
      >
        <IonIcon icon={isRetracted ? chevronForwardOutline : chevronBackOutline} className="text-white text-2xl" />
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLoggingOut}
        onClose={() => setIsLoggingOut(false)}
      />
    </div>
  );
};

export default Sidebar;
