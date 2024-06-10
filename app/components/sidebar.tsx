import React, { useState, useEffect } from 'react';
import { Divider, Tooltip, CircularProgress } from '@mui/material';
import { IonIcon } from '@ionic/react';
import {
  menuOutline, personCircleOutline, walletOutline, trendingUpOutline,
  businessOutline, settingsOutline, chatbubbleOutline, logOutOutline,
  chevronForwardOutline, chevronBackOutline
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';

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
  }, [initialRetracted]);

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
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        break;
      case 'DASHBOARD':
        navigate('/App/home'); // Navigate to the homepage
        break;
      case 'SAVE':
        navigate('/App/save'); // Navigate to the save page
        break;
      case 'INVEST':
        navigate('/App/invest'); // Navigate to the invest page
        break;
      case 'WITHDRAW':
        navigate('/App/withdraw'); // Navigate to the withdraw page
        break;
      case 'BUY PROPERTIES':
        navigate('/App/buyProperties'); // Navigate to the buy properties page
        break;
      default:
        break;
    }
  };

  return (
    <div className={`bg-purple1 h-full p-4 flex flex-col justify-between fixed left-0 top-0 bottom-0 transition-all duration-300 ${isRetracted ? 'w-12' : 'w-64'} z-50`}>
      <div>
        <div className="flex items-center justify-between mt-5 mb-10">
          <IonIcon icon={menuOutline} className="text-white text-2xl cursor-pointer" onClick={handleToggleSidebar} />
          {!isRetracted && (
            <Tooltip title="Go to the home page" placement="right">
              <img src="/images/myfund.png" alt="MyFund Logo" className="w-26 h-8 mx-auto cursor-pointer" onClick={() => navigate('/App/home')} />
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
          { icon: chatbubbleOutline, label: 'Message Admin' },
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
    </div>
  );
};

export default Sidebar;
