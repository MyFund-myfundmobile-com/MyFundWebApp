"use client";

// Layout component (Layout.tsx)
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';
import HomePage from '../pages/home/page'; // Import the HomePage component

const Layout = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState(window.innerWidth < 768);

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

  

  return (
    <div className="flex h-screen w-full">
      <Sidebar onToggle={handleSidebarToggle} isRetracted={isSidebarRetracted} />
      <div className={`flex-grow flex flex-col transition-all duration-300 ${isSidebarRetracted ? 'ml-16' : 'ml-80'} w-full`}>
        <Header isSidebarRetracted={isSidebarRetracted} />
        <main className="flex-grow pt-16 bg-gray-100 overflow-y-auto w-full" style={{ backgroundColor: '#F7F5FF' }}>
          <HomePage /> {/* Render the homepage within the layout */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
