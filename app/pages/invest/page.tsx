"use client";
import React, { useState, useEffect } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import AccountCard from '@/app/components/accountCard';
import { Divider, Switch } from '@mui/material';
import { trendingUpOutline, arrowUpOutline } from 'ionicons/icons';
import RecentTransactionsSection from '../home/recentTransactions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import { IonIcon } from '@ionic/react';
import { arrowDownOutline } from 'ionicons/icons';
import { CircularProgress } from '@mui/material';
import QuickInvestModal from './modals/quickInvestModal';
import AutoInvestModal from './modals/autoInvestModal';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Image from 'next/image';
import TopInvestorsSection from '../home/topInvestors';


const InvestPage = () => {
  const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(window.innerWidth < 900);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showBalances, setShowBalances] = useState<boolean>(true);
  const [isAutoInvestOn, setIsAutoInvestOn] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [amount, setAmount] = useState<string>(''); 
  const [showQuickInvestModal, setShowQuickInvestModal] = useState<boolean>(false);
  const [showAutoInvestModal, setShowAutoInvestModal] = useState<boolean>(false);
  const location = useLocation(); // Initialize useLocation


  useEffect(() => {
    if (location.state?.quickInvestModalActive) {
      setShowQuickInvestModal(true); // Open modal if quickSaveModalActive is true
    }  else if (location.state?.autoInvestModalActive) {
      setShowAutoInvestModal(true); // Open modal if quickSaveModalActive is true
    }
  }, [location.state]);



  const handleDownloadClick = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      const link = document.createElement('a');
      link.href = '/MyFundPackages.pdf';
      link.download = 'MyFundPackages.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 5000);
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

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, );


  const handleOpenQuickInvestModal = (presetAmount = '') => {
    setAmount(presetAmount);
    setShowQuickInvestModal(true);
  };


  const handleToggleBalances = () => {
    setShowBalances(!showBalances);
  };

  const toggleAutoInvest = () => {
    setIsAutoInvestOn(!isAutoInvestOn);
    // Optionally open AutoSave modal automatically on toggle
    if (!isAutoInvestOn) {
      setShowAutoInvestModal(true);
    }
  };

  const slides = [
    {
      icon: trendingUpOutline,
      text: (
        <>
          BETTER THAN SAVINGS: Earn at least <span className="font-bold text-green-500">20% p.a. every January and July</span> sponsoring any of our National Hostel Projects at multiples of N100,000
        </>
      ),
    },
    {
      icon: arrowUpOutline,
      text: (
        <>
          Top Investor: Congratulations firstname, you are currently one of the top investors in June. 🥳🍾🎉🎊 Keep investing to earn more rewards.
        </>
      ),
    },
  ];

  const renderSlides = () => (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-300 ease-in-out md:w-[100%]" style={{ transform: `translateX(-${currentSlide * 100}%)`, width: '100%', minWidth: '100%' }}>
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full md:w-[100%] px-4 py-8" style={{ minWidth: '100%' }}>
            <div className="flex w-full md:w-[100%] items-start rounded-lg p-4 sm:p-6" style={{ backgroundColor: '#DCD1FF', color: 'black', fontFamily: 'Karla', fontSize: 14, width: '100%' }}>
              <IonIcon icon={slide.icon} className="text-5xl text-purple-500 mr-4" />
              <div>{slide.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-0 left-0 right-0 flex justify-center" style={{ marginTop: -25, marginBottom: 20 }}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${index === currentSlide ? 'bg-purple-500' : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>
    </div>
  );

  const presetAmounts = [100000, 200000, 500000, 1000000, 2000000, 5000000];

  return (
    <div className="px-6 w-full animate-floatIn overflow-x-hidden">
      <div className="mb-5 flex items-center">
        <div>
          <Title>Sponsor</Title>
          <Subtitle>
            Earn <span className="font-bold text-green-500">20% p.a.</span> every 6 months investing multiples of N100,000
          </Subtitle>
        </div>
        <div className="ml-auto flex items-center">
          <span className='mr-2' style={{ letterSpacing: 2, color: 'grey', fontSize: 13 }}>{showBalances ? 'HIDE' : 'SHOW'} BALANCE </span>
          <span onClick={handleToggleBalances} style={{ cursor: 'pointer', transition: 'color 3s ease', fontSize: 29 }}>
            {showBalances ? <Visibility style={{ color: '#4C28BC', transition: 'color 3s ease', fontSize: 29 }} /> : <VisibilityOff style={{ color: 'grey', transition: 'color 0.3s ease' }} />}
          </span>
        </div>
      </div>
      <div style={{ marginBottom: -30, marginTop: -40, alignSelf: 'flex-start', marginLeft: -5 }}>
        {renderSlides()}
      </div>
      <div className="flex items-center">
        <Section>MY INVESTMENT ACCOUNT</Section>
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-start" style={{ alignContent: 'flex-start', alignItems: 'flex-start' }}>
        <div className="relative" style={{ flex: '1 1 auto', transform: 'scale(1.25)', transformOrigin: 'top left', marginBottom: 60 }}>
          <AccountCard
            icon="save-outline"
            label="INVESTMENT"
            rate="20% p.a."
            currency="₦"
            amount={showBalances ? "11,500,000.50" : "****"}
            buttonText="QuickInvest"
            buttonIcon="save-outline"
            onButtonClick={() => handleOpenQuickInvestModal()} // Pass the function here without preset amount
          />
          {/* AutoInvest Toggle */}
          <div className="absolute bottom-2 left-2 flex items-center">
            <Switch
              checked={isAutoInvestOn}
              onChange={toggleAutoInvest}
              color="default"
              inputProps={{ 'aria-label': 'toggle autoinvest' }}
              sx={{
                '& .MuiSwitch-thumb': {
                  color: isAutoInvestOn ? '#43FF8E' : 'silver',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: isAutoInvestOn ? '#0AA447' : 'grey',
                },
              }}
            />
            <span className={`text-gray-500 font-karla ${isAutoInvestOn ? 'text-green-500' : ''}`} style={{ fontSize: 12 }}>{isAutoInvestOn ? 'AutoInvest is ON' : 'AutoInvest is OFF'}</span>
          </div>
        </div>

        <div className="mt-4 md:mt-0 border rounded-lg p-2 animate-floatIn" style={{ flex: '1 1 auto' }}>
          <Section style={{ marginTop: -1, marginBottom: 1 }}>TOP UP YOUR INVESTMENT</Section>
          <div className="grid grid-cols-2 gap-2">
            {presetAmounts.map((preset, index) => (
              <button
                key={index}
                className="bg-[#DCD1FF] text-black rounded-md font-productSans whitespace-nowrap transform active:scale-95 active:bg-purple-600 active:text-white"
                style={{ height: '50px' }}
                onClick={() => handleOpenQuickInvestModal(preset.toString())} // Open modal with preset amount
              >
                {preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Divider className="my-4 bg-gray-100" style={{ marginTop: 20, marginBottom: 20 }} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-3" style={{ alignSelf: 'flex-start' }}>
          <RecentTransactionsSection />
        </div>
        <div className="md:col-span-3">
          <TopInvestorsSection />
        </div>
        <div className="md:col-span-6">
          <div className="bg-white p-4 rounded-lg shadow-md h-full" style={{alignItems: 'flex-start', alignContent: 'flex-start'}}>
            <Section>SPONSOR ONGOING PROJECTS TO EARN HIGHER ROI...</Section>
            <div className="mb-4 mt-3">
              <Image width={720} height={720} src="/images/sponsorship.png" alt="Refer and earn" className="w-full h-auto rounded-lg" />
              <div className="flex justify-center mt-4">
                <PrimaryButton
                  className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
                  onClick={handleDownloadClick}
                  background="#4C28BC"
                  hoverBackgroundColor="#351265"
                  color="#fff"
                  hoverColor="#fff"
                  startIcon={isDownloading ? <CircularProgress size={24} style={{ color: '#fff', marginRight: 8 }} /> : <IonIcon icon={arrowDownOutline} className="text-4xl text-purple-500 animate-bounce" />}
                  style={{ width: '95%', letterSpacing: 0.5 }}
                >
                  {isDownloading ? 'Downloading...' : 'DOWNLOAD SPONSORSHIP PACKAGE'}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <QuickInvestModal isOpen={showQuickInvestModal} onClose={() => setShowQuickInvestModal(false)} initialAmount={amount} />
      <AutoInvestModal isOpen={showAutoInvestModal} onClose={() => setShowAutoInvestModal(false)} />
    </div>
  );
};

export default InvestPage;

