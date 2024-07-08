"use client";

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

const Layout = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState(window.innerWidth < 768);
  const [activeItem, setActiveItem] = useState('DASHBOARD');

  const handleSidebarToggle = () => {
    setIsSidebarRetracted(!isSidebarRetracted);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsSidebarRetracted(true);
      } else {
        setIsSidebarRetracted(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuItemClick = (item: string) => { // Define the type for item
    setActiveItem(item);
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar onToggle={handleSidebarToggle} isRetracted={isSidebarRetracted} onMenuItemClick={handleMenuItemClick} />
      <div className={`flex-grow flex flex-col transition-all duration-300 ${isSidebarRetracted ? 'ml-16' : 'ml-80'} w-full`}>
        <Header isSidebarRetracted={isSidebarRetracted} activeItem={activeItem} />
        <main className="flex-grow pt-16 bg-gray-100 overflow-y-auto w-full" style={{ backgroundColor: '#F7F5FF' }}>
          <Outlet /> {/* This is where the nested routes will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
