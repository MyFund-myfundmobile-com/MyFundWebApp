"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import styles from './Header.module.css';
import { IoLogoApple, IoLogoAndroid } from 'react-icons/io5';
import { CircularProgress } from '@mui/material'; 



const Header = () => {

  const [downloading, setDownloading] = useState(false);

const handleDownload = () => {
  // Simulate downloading process
  setDownloading(true);
  setTimeout(() => {
    setDownloading(false);
  }, 4000); 
};



  return (
    <div className={`mx-auto w-full max-w-7xl px-5 py-8 md:px-10 md:py-16 lg:py-24"`}>
      <div className={`mt-10 grid grid-cols-1 gap-12 sm:gap-20 lg:grid-cols-2 items-center justify-center max-h-[100%] w-[100%] `}>
        <div className="max-w-[720px] lg:max-w-[842px]">
          <h1 className="mb-4 mt-20 text-4xl md:text-6xl font-proxima font-extrabold">
            The {' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              TRUE </span>
            Way to Save and Invest
          </h1>
          <div className="mb-6 max-w-[528px] md:mb-10 lg:mb-12 font-product-sans">
            <p className="text-xl text-[#636262]">
              Earn <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              20% p.a. </span> on your funds every January and July!
              <div className="mt-1" /> 
              Buy properties and <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              earn lifetime rent </span> via our hostels.
            </p>
          </div>
          <div className="flex flex-col">
          <div className={`${styles.buttonContainer} flex mb-4`}>
            {/* Conditionally render CircularProgress when downloading */}
            {downloading ? (
              <a
              download
              href="/myFund-Enterprise-App.apk"
              className="mr-5 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(76,_40,188)_6px_6px] md:mr-6"
              onClick={handleDownload} // Add onClick event to start downloading
            >
               <CircularProgress size={24} /> {" "}  Downloading MyFund Mobile App...
            </a>
             
            ) : (
              <a
                download
                href="/myFund-Enterprise-App.apk"
                className="mr-5 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(76,_40,188)_6px_6px] md:mr-6"
                onClick={handleDownload} // Add onClick event to start downloading
              >
                Download The Mobile App
              </a>
            )}
          </div>

            <div className={styles.buttonGroup}>
              <PrimaryButton
                className={`text-center w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-black hover:text-white ${styles.smallButton}`}
                onClick={() => console.log("Get it on iPhone button clicked")}
                background="#fff"
                color="#351265"
                borderWidth="2px"
                borderColor="silver"
                // hoverColor="#fff"
                // hoverBackgroundColor="black"
                // hoverBorderWidth="2px"
                // hoverBorderColor="#4C28BC"
                startIcon={<IoLogoApple className="h-6 w-6 mr-2" />}
              >
                Get it on iPhone
              </PrimaryButton>
              <PrimaryButton
                className={`text-center w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-black hover:text-white ${styles.smallButton}`}
                onClick={() => console.log("Get it on Android button clicked")}
                background="#fff"
                color="#351265"
                borderWidth="2px"
                borderColor="silver"
                // hoverColor="#fff"
                // hoverBackgroundColor="black"
                // hoverBorderWidth="2px"
                // hoverBorderColor="#4C28BC"
                startIcon={<IoLogoAndroid className="h-6 w-6 mr-2" />}
              >
                Get it on Android
              </PrimaryButton>
            </div>
            

            
          </div>
          
        </div>

        
            
        <div className={`mt-20 ml--30 relative left-4 h-full max-h-[1680px] max-w-[2680px] w-full lg:left-0 lg:w-full ${styles.heroImage}`}>
          <Image
            src="/images/hero1.png" // Only show hero1.png
            width={2900}
            height={1680}
            alt=""
            className="ml--10 relative h-full w-full max-w-none rounded-2xl object-cover border-1"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Header;

