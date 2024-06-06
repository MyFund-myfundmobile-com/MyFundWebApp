"use client";
import { useState, useEffect } from "react";
import React from "react";
import Testimonials from "./testimonials";
import axios from "axios";
import { AxiosError } from 'axios';
import styles from '../../ui/landing/Header.module.css';
import { CircularProgress } from '@mui/material'; 
import { IonIcon } from '@ionic/react';
import { personOutline, mailOutline, callOutline, lockClosedOutline, eyeOutline, eyeOffOutline, peopleOutline } from 'ionicons/icons';
import OTPModal from './OTPModal';
import { useRouter } from 'next/router'; // Import the useRouter hook

function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError !== undefined;
}

type IconType = 'user' | 'mail' | 'phone' | 'lock' | 'hearAbout';

const iconMap: { [key in IconType]: string } = {
  user: personOutline,
  mail: mailOutline,
  phone: callOutline,
  lock: lockClosedOutline,
  hearAbout: peopleOutline, 
};

const RegisterPage: React.FC = () => {

  useEffect(() => {
    document.body.style.backgroundColor = '#351265';
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []);

  const fields: { placeholder: string; name: string; type: string; icon: IconType }[] = [
    { placeholder: 'First Name', name: 'firstName', type: 'text', icon: 'user' },
    { placeholder: 'Last Name', name: 'lastName', type: 'text', icon: 'user' },
    { placeholder: 'Email Address', name: 'email', type: 'email', icon: 'mail' },
    { placeholder: 'Phone Number (e.g. 08034567890)', name: 'phone', type: 'text', icon: 'phone' },
    { placeholder: 'Referral Email (optional)', name: 'referral', type: 'email', icon: 'mail' },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    referral: "",
    howDidYouHear: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseOTPModal = () => {
    setShowOTPModal(false);
  };

  const handleSignup2 = () => {
    setShowOTPModal(true);
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await axios.post("/api/signup", formData);

      if (response.status === 201) {
        setIsLoading(false);
        setShowOTPModal(true);
        alert("Account created successfully!");
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);

      if (isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          setErrorMessage("Invalid input. Please check your details and try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      } else {
        setErrorMessage("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <section className="bg-customPurple">
      <div className="bg-customPurple grid md:h-screen md:grid-cols-2">
        <div className="bg-[#F7F5FF] flex flex-col items-center justify-center">
          <div className="max-w-xl px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
            <h2 className="mb-1 text-purple1 tracking-tight font-proxima font-black md:mb-2 md:text-5xl">Create Account</h2>
            <p className="mb-8 text-lg text-[#4C28Bc] font-karla tracking-tight md:mb-12 md:text-1">
              Earn 20% p.a. every January and July. {"\n"}
              Own properties and earn a lifetime rent. Signup here.
            </p>
            <form className="mx-auto mb-4 max-w-lg pb-4" name="wf-form-register" method="get">
              {fields.map(({ placeholder, name, type, icon }) => (
                <div key={name} className="relative mb-4">
                  <IonIcon
                    icon={iconMap[icon]}
                    className="w-6 h-6 text-[#4C28BC] absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                  />
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="block h-9 w-full border border-[#4C28BC] bg-[#fff] px-3 py-6 pl-14 text-sm text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
                    required={name !== 'referral'}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <div className="relative mb-4">
                <IonIcon
                  icon={iconMap['lock']}
                  className="w-6 h-6 text-[#4C28BC] absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                />
                <IonIcon
                  icon={passwordVisible ? eyeOutline : eyeOffOutline}
                  className="cursor-pointer text-[#4C28BC] absolute right-[5%] top-[26%] w-6 h-6 inline-block"
                  onClick={togglePasswordVisibility}
                />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="Password (min 8 characters)"
                  className="block h-9 w-full border border-[#4C28BC] bg-[#fff] px-3 py-6 pl-14 text-sm text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative mb-4">
                <IonIcon
                  icon={iconMap['hearAbout']}
                  className="w-6 h-6 text-[#4C28BC] absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                />
                <select
                  name="howDidYouHear"
                  required
                  className="block h-12 w-full border border-[#4C28BC] bg-[#fff] px-3 py-2 pl-14 pr-8 text-sm text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
                  defaultValue=""
                  onChange={handleInputChange}
                >
                  <option value="" style={{ color: '#999999' }}>
                    How did you hear about MyFund?
                  </option>
                  <option value="social_media">Social Media - Facebook, Instagram, etc.</option>
                  <option value="instant_messaging">Instant Messaging - WhatsApp, Telegram, etc.</option>
                  <option value="family_friend">Family and Friend</option>
                  <option value="google_search">Google Search</option>
                  <option value="recommended">Recommended</option>
                  <option value="cashflow_game">Cashflow Game</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <label className="mb-6 flex items-center pb-12 font-medium lg:mb-1">
                <input type="checkbox" name="checkbox" required />
                <span className="ml-4 inline-block cursor-pointer text-sm">
                  I agree with the{" "}
                  <a href="#" className="font-bold text-[#0b0b1f]">
                    Terms &amp; Conditions
                  </a>
                </span>
              </label>

              {errorMessage && <p className="text-red-500 mb-5">{errorMessage}</p>}

              <div className={`${styles.buttonContainer} flex mb-4 flex justify-center items-center `}>
                <a
                className="mr-5 inline-block rounded-xl bg-[#4C28BC] px-8 py-4 text-center  cursor-pointer font-semibold text-white"
                style={{ boxShadow: '6px 6px #351265' }}
                onClick={handleSignup2}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <span>CREATING ACCOUNT...</span>
                      <CircularProgress size={24} color="inherit" className="ml-2" />
                    </div>
                  ) : (
                    <span>CREATE FREE ACCOUNT</span>
                  )}
                </a>
              </div>
            </form>
            <p className="text-sm text-[#636262]">
              Already have an account?{" "}
              <a href="/login" className="text-sm font-bold text-purple1">
                Log in
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-customPurple rounded-lg">
          <Testimonials />
          <OTPModal email={formData.email} isOpen={showOTPModal} onClose={handleCloseOTPModal} />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
