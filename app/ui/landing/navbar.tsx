"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import { CircularProgress } from "@mui/material";
import { IonIcon } from "@ionic/react";
import { arrowDownOutline } from "ionicons/icons";
import MenuIcon from "@mui/icons-material/Menu";
import { ClassNames } from "@emotion/react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHostelsHovered, setIsHostelsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleDownloadClick = () => {
    setIsDownloading(true);

    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };

  const handleLoginClick = () => {
    setIsLoggingIn(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleCreateAccountClick = () => {
    setIsCreatingAccount(true);

    // Simulate create account process
    setTimeout(() => {
      setIsCreatingAccount(false);
    }, 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
        setIsSidebarOpen(false);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-[#fff] w-full fixed top-0 left-0 right-0 z-50 shadow-md">
      <nav className="mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
        <div className="flex flex-row items-center justify-between py-4" style={{ marginRight: 90 }}>
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
              width={130}
              height={130}
            />
          </Link>

          <div
            className={`transition-all ease-in flex items-center lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
              isOpen ? "visible flex" : "hidden invisible"
            } transition-all ease-in`}
          >
            <Link
              onClick={() => setIsOpen(true)}
              href="/"
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              style={{ margin: 0 }}
            >
              HOME
            </Link>

            <div
              onMouseEnter={() => setIsHostelsHovered(true)}
              onMouseLeave={() => setIsHostelsHovered(false)}
              className="relative"
              style={{ margin: 0 }}
            >
              <Link
                onClick={() => setIsOpen(true)}
                href="/about"
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
                style={{ alignItems: "center", marginBottom: -20 }}
              >
                OUR HOSTELS
              </Link>

              {isHostelsHovered && (
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10">
                  {isDownloading ? (
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F5FF] hover:text-[#4c28bc] rounded-lg">
                      <IonIcon icon={arrowDownOutline} style={{ marginRight: 5, marginBottom: -2 }} />
                      Downloading...
                      <CircularProgress size={20} color="inherit" />
                    </div>
                  ) : (
                    <a
                      href="/MyFundPackages.pdf"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F5FF] hover:text-[#4c28bc] rounded-lg"
                      download="MyFundPackages.pdf"
                      onClick={handleDownloadClick}
                    >
                      <IonIcon icon={arrowDownOutline} style={{ marginRight: 5, marginBottom: -2 }} />
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
              style={{ margin: 0 }}
            >
              BLOG
            </Link>
            <Link
              onClick={() => setIsOpen(true)}
              href="/about"
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              style={{ margin: 0 }}
            >
              ABOUT
            </Link>
            <Link
              onClick={() => setIsOpen(true)}
              href="/faq"
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-nexa font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              style={{ margin: 0 }}
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
            <Link href="/login">
              <PrimaryButton
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
                onClick={handleLoginClick}
                background="#fff"
                color="#4C28BC"
                borderWidth="2px"
                borderColor="#4C28BC"
                hoverColor="#351265"
                hoverBackgroundColor="#FBFAFF"
                hoverBorderWidth="2px"
                hoverBorderColor="#351265"
                startIcon={
                  isLoggingIn ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <svg
                      fill="currentColor"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 21"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Arrow Right</title>
                      <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                    </svg>
                  )
                }
              >
                {isLoggingIn ? "LOG IN..." : "LOG IN"}
              </PrimaryButton>
            </Link>

            <Link href="/register">
              <PrimaryButton
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
                onClick={handleCreateAccountClick}
                background="#4C28BC"
                hoverBackgroundColor="#351265"
                borderColor="#4C28BC"
                hoverBorderColor="#351265"
                color="#fff"
                hoverColor="white"
              >
                   {isCreatingAccount ? (
                  <>
                   <CircularProgress size={17} color="inherit" style={{ marginRight: 10 }} />
                    CREATE FREE ACCOUNT
                  </>
                ) : (
                  "CREATE FREE ACCOUNT"
                )}
              </PrimaryButton>
            </Link>
          </div>

          <div className="relative flex items-center lg:hidden">
            <button
              className="text-[#4c28bc] text-2xl p-1"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
