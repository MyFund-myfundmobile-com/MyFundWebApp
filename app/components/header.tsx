import React from 'react';
import 'tailwindcss/tailwind.css';
import { IonIcon } from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons';

interface HeaderProps {
  isSidebarRetracted: boolean;
  activeItem: string; // Add this prop
}

const Header: React.FC<HeaderProps> = ({ isSidebarRetracted, activeItem }) => { // Destructure the new prop
  return (
    <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-10 transition-all duration-300" style={{ paddingLeft: isSidebarRetracted ? '4rem' : '20rem' }}>
      <div className="flex justify-between items-center p-4">
        <div className="text-center text-sm font-nexa flex-grow uppercase" style={{ letterSpacing: '0.5rem', fontSize: '12px', color: 'lightgrey' }}>
          {activeItem} {/* Display the active item */}
        </div>
        <div className="absolute right-4 top-4">
          <IonIcon icon={notificationsOutline} className="text-purple1 text-2xl mr-4" style={{ color: '#4C28BC'}}/>
        </div>
      </div>
    </div>
  );
};

export default Header;
