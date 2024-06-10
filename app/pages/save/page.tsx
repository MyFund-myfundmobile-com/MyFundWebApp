// Save page (SavePage.tsx)
"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import AccountCard from '@/app/components/accountCard';
import { Divider, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IonIcon } from '@ionic/react';
import { saveOutline, arrowUpOutline } from 'ionicons/icons';
import TopSaversSection from '../home/topSavers';
import RecentTransactionsSection from '../home/recentTransactions';

const SavePage = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(window.innerWidth < 900);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showBalances, setShowBalances] = useState<boolean>(true);

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

  const handleSidebarToggle = () => {
    setIsSidebarRetracted(!isSidebarRetracted);
  };

  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
  };

  const slides = [
    {
      icon: saveOutline,
      text: (
        <>
          Your Savings Goal: You should be saving <span className="font-bold text-green-500">NXXXXX/month</span> to reach <span className="font-bold text-green-500">N5000000</span> for your <span className="font-bold text-green-500">XXXXXX</span> investment in <span className="font-bold text-green-500">XX</span> years. And you are now <span className="font-bold text-green-500">XXX%</span> to success. Well done!
        </>
      ),
    },
    {
      icon: arrowUpOutline,
      text: (
        <>
          Top Saver: Congratulations firstname, you are currently one of the top savers in June. 🥳🍾🎉🎊 Keep saving to earn more rewards.
        </>
      ),
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, []);

  const renderSlides = () => (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full md:w-[90%] px-4 py-8" style={{ minWidth: '100%' }}>
            <div className="flex w-full items-start rounded-lg p-4 sm:p-6" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14 }}>
              <IonIcon icon={slide.icon} className="text-5xl text-purple-500 mr-4" />
              <div>{slide.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${index === currentSlide ? 'bg-purple-500' : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="px-6 w-full animate-floatIn overflow-x-hidden">
      <div className="mb-5 flex items-center">
        <div>
          <Title>Save</Title>
          <Subtitle>
            Earn <span className="font-bold text-green-500">13% p.a.</span> every January and July
          </Subtitle>
        </div>
        <div className="ml-auto flex items-center">
          {typeof window !== 'undefined' && window.innerWidth >= 900 && (
            <span className='mr-2' style={{ letterSpacing: 2, color: 'grey', fontSize: 13 }}>{showBalances ? 'HIDE' : 'SHOW'} BALANCE </span>
          )}
          <span onClick={handleToggleBalances} style={{ cursor: 'pointer', transition: 'color 3s ease', fontSize: 29 }}>
            {showBalances ? <Visibility style={{ color: '#4C28BC', transition: 'color 3s ease', fontSize: 29 }} /> : <VisibilityOff style={{ color: 'grey', transition: 'color 0.3s ease' }} />}
          </span>
        </div>
      </div>
      <div style={{ marginBottom: -30, marginTop: -40, alignSelf: 'flex-start', marginLeft: -5 }}>
        {renderSlides()}
      </div>
      <Section>MY SAVINGS ACCOUNT</Section>
      <div className="mb-8 relative mt-1" style={{ transform: 'scale(1.25)', transformOrigin: 'top left', marginBottom: 60 }}>
        <AccountCard
          icon="save-outline"
          label="SAVINGS"
          rate="13% p.a."
          currency="₦"
          amount={showBalances ? "2,300,000.50" : "****"}
          buttonText="QuickSave"
          buttonIcon="save-outline"
        />
      </div>
      <Divider className="my-4 bg-gray-100" style={{ marginTop: 20, marginBottom: 20 }} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-3" style={{ alignSelf: 'flex-start' }}>
          <RecentTransactionsSection />
        </div>
        <div className="md:col-span-3">
          <TopSaversSection />
        </div>
        <div className="md:col-span-6">
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <Section>MEET TOPSAVER...</Section>
            {/* Feature a recent top saver here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavePage;
