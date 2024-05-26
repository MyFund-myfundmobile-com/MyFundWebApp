"use client";
import { useState } from "react";
import React from "react";
import Testimonials from "./testimonials";
import axios from "axios";
import { AxiosError } from 'axios';
import styles from '../ui/landing/Header.module.css';


function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError !== undefined;
}

const iconPath = {
  user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14.2c-2.67 0-8 1.34-8 4v1.8h16v-1.8c0-2.66-5.33-4-8-4z",
  mail: "M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.01L12 9 20 4v-1H4v1z",
  phone: "M6.654 2a1 1 0 0 0-.997.9l-.739 5.94a1 1 0 0 0 .278.872l2.746 2.746a1 1 0 0 0 1.414 0l1.707-1.707a1 1 0 0 1 1.414 0l4.58 4.58a1 1 0 0 1 0 1.414l-1.707 1.707a1 1 0 0 0 0 1.414l2.746 2.746a1 1 0 0 0 .872.278l5.94-.739a1 1 0 0 0 .9-.997V6.654a1 1 0 0 0-.9-.997l-5.94-.739a1 1 0 0 0-.872.278L15.16 8.54a1 1 0 0 1-1.414 0l-4.58-4.58a1 1 0 0 1 0-1.414L11.87 2.91a1 1 0 0 0-.278-.872L6.654 2z",
  lock: "M5 9a7 7 0 1 1 14 0v7a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4V9zm7-7a5 5 0 0 0-5 5v3h10V7a5 5 0 0 0-5-5z"
};

type IconType = keyof typeof iconPath;

const RegisterPage = () => {
  const fields: { placeholder: string; name: string; type: string; icon: IconType }[] = [
    { placeholder: 'First Name', name: 'firstName', type: 'text', icon: 'user' },
    { placeholder: 'Last Name', name: 'lastName', type: 'text', icon: 'user' },
    { placeholder: 'Email Address', name: 'email', type: 'email', icon: 'mail' },
    { placeholder: 'Phone Number', name: 'phone', type: 'text', icon: 'phone' },
    { placeholder: 'Password (min 8 characters)', name: 'password', type: 'password', icon: 'lock' },
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await axios.post("/api/signup", formData);

      if (response.status === 201) {
        setIsLoading(false);
        alert("Account created successfully!");
        // Optionally, redirect to a different page or display a success message
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
    <section className="bg-[#351265]">
      <div className="bg-[#351265] grid md:h-screen md:grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-white">
          <div className="max-w-xl px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
            <h2 className="mb-4 text-3xl font-bold md:mb-6 md:text-3xl">Create Account</h2>
            <p className="mb-8 text-lg text-[#636262] md:mb-12 md:text-0.5x0.5">
              Earn 20% p.a. every January and July. Own properties and earn a lifetime rent. Sign up here.
            </p>
            <form className="mx-auto mb-4 max-w-lg pb-4" name="wf-form-register" method="get">
              {fields.map(({ placeholder, name, type, icon }) => (
                <div key={name} className="relative mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                  >
                  <path d={iconPath[icon]} />
                  </svg>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333] rounded-md"
                    required={name !== 'referral'}
                  />
                </div>
              ))}
              <div className="relative mb-4">
              <select
                  name="hearAbout"
                  className="block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 text-sm text-[#333333] rounded-md"
                  required
                  defaultValue=""
                >
                  <option value="" disabled hidden>How did you hear about MyFund</option>
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

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <div className={`${styles.buttonContainer} flex mb-4 flex justify-center items-center `}>
              <a
                className="inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(76,_40,188)_6px_6px]"
                onClick={handleSignup}
                // disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </a>
              </div>


            </form>
            <p className="text-sm text-[#636262]">
              Already have an account?{" "}
              <a href="#" className="text-sm font-bold text-purple1">
                Log in
              </a>
            </p>
          </div>
        </div>

        
        <div className="flex flex-col items-center justify-center bg-[#F7F5FF] rounded-lg">
        <Testimonials />

        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
