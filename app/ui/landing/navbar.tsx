"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
<div className="bg-[#fff] w-full fixed top-0 left-0 right-0 z-50 shadow-md">
<nav className="mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
<div className="flex flex-row items-center justify-between py-4"
         style={{marginRight: 70,}}
        >          
          <Link
            href="/"
            aria-current="page"
            className="bg-transparent leading-[0] text-[#333333] no-underline hover:outline-0 ml-20"
            aria-label="home"
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


            <div
              className={`transition-all ease-in flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
                isOpen ? "visible flex" : "hidden invisible"
              } transition-all ease-in`}
            >
              <Link
                onClick={() => setIsOpen(true)}
                href="/about"
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              >
                SAVE
              </Link>
              
              <Link
                onClick={() => setIsOpen(true)}
                href="/about"
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              >
                INVEST
              </Link>
              <Link
                onClick={() => setIsOpen(true)}
                href="/blog"
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              >
                WITHDRAW
              </Link>
              <Link
                onClick={() => setIsOpen(true)}
                href="/about"
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              >
                ABOUT
              </Link>
              <Link
                onClick={() => setIsOpen(true)}
                href="/faq"
                className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
              >
                FAQs
              </Link>
            </div>



            <div
        className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 ${
          isOpen ? "visible flex" : "hidden invisible"
        } transition-all ease-in`}
        style={{marginTop: 5, marginBottom: -15,}}
      >
    
        <Link href="/register">
          <PrimaryButton
            className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
            onClick={() => console.log("Sign Up button clicked")}
            background="#fff"
            color="#351265"
            borderWidth="2px"
            borderColor="#351265"
            hoverColor="#4C28BC"
            hoverBackgroundColor="#FBFAFF"
            hoverBorderWidth="2px"
            hoverBorderColor="#4C28BC"
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

        
        <Link href="/login">
          <PrimaryButton
            className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-[#F7F5FF] hover:text-[#4c28bc]"
            onClick={() => console.log("Create Free Account button clicked")}
            background="#351265"
            hoverBackgroundColor="#4C28BC"
            borderColor="#351265"
            hoverBorderColor="#4C28BC"
            color="#fff"
            hoverColor="#fff"
          >
            CREATE FREE ACCOUNT
          </PrimaryButton>
        </Link>
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
