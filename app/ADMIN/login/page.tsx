"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress } from '@mui/material'; 
import { IonIcon } from '@ionic/react';
import Testimonials from "@/app/register/testimonials";
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, arrowForwardOutline } from 'ionicons/icons';
import styles from '../ui/landing/Header.module.css';
import Link from "next/link";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        document.body.style.backgroundColor = '#351265';
        return () => {
          document.body.style.backgroundColor = ''; // Reset background color when component unmounts
        };
      }, []);
    const handleLogin = () => {
      // Add login logic here
    };
  
    return (
      <section className="bg-customPurple">
        <div className="bg-customPurple grid md:h-screen md:grid-cols-2">
          <div className="bg-[#F7F5FF] flex flex-col items-center justify-center">
            <div className="max-w-xl px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
              <h2 className="mb-1 text-purple1 tracking-tight font-proxima font-black md:mb-2 md:text-5xl">Admin Login</h2>
              <p className="mb-8 text-lg text-[#4C28Bc] font-karla tracking-tight md:mb-12 md:text-0.5x0.5">
                Earn 20% p.a. every January and July. {"\n"}
                Own properties and earn a lifetime rent. Jump right back in!
              </p>
              <form className="mx-auto mb-4 max-w-lg pb-4">
                <div className="relative mb-4">
                  <IonIcon
                    icon={mailOutline}
                    className="w-6 h-6 absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="block h-9 w-full border border-black bg-[#fff] px-3 py-6 pl-14 text-sm text-[#333333] rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <IonIcon
                    icon={lockClosedOutline}
                    className="w-6 h-6 absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                  />
                  <IonIcon
                    icon={passwordVisible ? eyeOutline : eyeOffOutline}
                    className="cursor-pointer absolute right-[5%] top-[26%] w-6 h-6 inline-block"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="block h-9 w-full border border-black bg-[#fff] px-3 py-6 pl-14 text-sm text-[#333333] rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-right mb-4">
                  <a href="#" className="text-sm text-[#276EF1]">Forgot Password?</a>
                </div>
                <div className={`${styles.buttonContainer} flex mb-4 justify-center items-center`}>
                  
                <Link href="/home">
                  <button
                    className="mr-5 inline-block rounded-xl px-8 py-4 text-center cursor-pointer font-semibold text-white"
                    style={{
                      boxShadow: '6px 6px #351265',
                      backgroundColor: isLoading ? 'black' : '#4C28BC'
                    }}
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <span>Logging In...</span>
                        <CircularProgress size={24} color="inherit" className="ml-2" />
                      </div>
                    ) : (
                      <span>
                        LOG IN
                        <svg
                          fill="currentColor"
                          className="h-4 w-4 ml-2 inline-block"
                          viewBox="0 0 20 21"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Arrow Right</title>
                          <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                        </svg>
                      </span>
                    )}
                  </button>
                </Link>


                </div>
              </form>
              <p className="text-[#636262]">
                New to MyFund?{" "}
                <a href="/register" className="text-[#276EF1]">Create Free Account</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-customPurple rounded-lg">
            <Testimonials />
          </div>
        </div>
      </section>
    );
  };
  
  export default LoginPage;