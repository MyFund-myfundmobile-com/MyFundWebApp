"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import { CircularProgress } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { arrowDownOutline } from 'ionicons/icons';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHostelsHovered, setIsHostelsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);


  const handleDownloadClick = () => {
    setIsDownloading(true);

    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024); 
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#fff] w-full fixed top-0 left-0 right-0 z-50 shadow-md">
      <nav className="mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
        <div className="flex flex-row items-center justify-between py-4" style={{ marginRight: 90 }}>
          
          {window.innerWidth >= 1024 || !isOpen ? (
            <Link
              href="/"
              aria-current="page"
              className="bg-transparent leading-[0] text-[#333333] no-underline hover:outline-0 ml-20"
              aria-label="home"
              style={{ marginRight: -190 }}
            >
              <Image
                src="/images/MyFundlogo.png"
                loading="lazy"
                alt="MyFund Logo"
                className="inline-block max-h-full max-w-full"
                width={140}
                height={140}
              />
            </Link>
          ) : null}

              <div
                className={`transition-all ease-in flex items-center lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
                  isOpen ? "visible flex" : "hidden invisible"
                } transition-all ease-in`}
              >
            <Link
              onClick={() => setIsOpen(true)}
              href="/"
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              style={{ margin: 0 }} // Add this style to remove any margin
            >
              HOME
            </Link>

            <div
              onMouseEnter={() => setIsHostelsHovered(true)}
              onMouseLeave={() => setIsHostelsHovered(false)}
              className="relative"
              style={{ margin: 0 }} // Add this style to remove any margin
            >
              <Link
                onClick={() => setIsOpen(true)}
                href="/about"
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
                style={{ alignItems: "center", marginBottom: -20 }} // Add this style to vertically align items
              >
                OUR HOSTELS
              </Link>

              {isHostelsHovered && (
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10">
                 {isDownloading ? (
                      <div 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F5FF] hover:text-[#4c28bc] rounded-lg"
                      >
                        <IonIcon icon={arrowDownOutline} />
                        <span className="ml-2 mr-2">Downloading...</span>
                        <CircularProgress size={20} color="inherit" />
                      </div>
                    ) : (
                      <a
                        href="/MyFundPackages.pdf"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F5FF] hover:text-[#4c28bc] rounded-lg"
                        download="MyFundPackages.pdf" // Add download attribute to force download
                        onClick={handleDownloadClick} // Call handleDownloadClick on click
                      >
                        Download Package
                      </a>
                    )}
                </div>
              )}
            </div>



            <Link
              onClick={() => setIsOpen(true)}
              href="http://medium.com/@myfundmobile"
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              style={{ margin: 0 }} // Add this style to remove any margin
            >
              BLOG
            </Link>
            <Link
              onClick={() => setIsOpen(true)}
              href="/about"
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              style={{ margin: 0 }} // Add this style to remove any margin
            >
              ABOUT
            </Link>
            <Link
              onClick={() => setIsOpen(true)}
              href="/faq"
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              style={{ margin: 0 }} // Add this style to remove any margin
            >
              FAQs
            </Link>
          </div>


          <div
            className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 ${
              isOpen ? "visible flex" : "hidden invisible"
            } transition-all ease-in`}
            style={{ marginTop: 5, marginBottom: -15 }}
          >
            {/* <Link href="/pages/login">
              <PrimaryButton
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
                onClick={() => console.log("Sign Up button clicked")}
                background="#fff"
                color="#4C28BC"
                borderWidth="2px"
                borderColor="#4C28BC"
                hoverColor="#351265"
                hoverBackgroundColor="#FBFAFF"
                hoverBorderWidth="2px"
                hoverBorderColor="#351265"
                startIcon={
                  <svg
                    fill="currentColor"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Arrow Right</title>
                    <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                  </svg>
                }
              >
                LOG IN
              </PrimaryButton>
            </Link>

            <Link href="/pages/register">
              <PrimaryButton
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
                onClick={() => console.log("Create Free Account button clicked")}
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                borderColor="#4C28BC"
                hoverBorderColor="#351265"
                color="#fff"
                hoverColor="#fff"
              >
                CREATE FREE ACCOUNT
              </PrimaryButton>
            </Link> */}

              <a
               download
               href="/myFund-Enterprise-App.apk">
              <PrimaryButton
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
                onClick={() => console.log("Create Free Account button clicked")}
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                borderColor="#4C28BC"
                hoverBorderColor="#351265"
                color="#fff"
                hoverColor="#fff"
                startIcon=""
              >
                DOWNLOAD THE MOBILE APP
              </PrimaryButton>
              </a>
          </div>







          <a
            href="#"
            className="absolute right-5 lg:hidden"
            onClick={() => setIsOpen((state: boolean) => !state)}
          >
            {isOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#160042"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#160042"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 12H20.25"
                  stroke="#160042"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3.75 6H20.25"
                  stroke="#160042"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3.75 18H20.25"
                  stroke="#160042"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
