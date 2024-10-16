"use client";
import { useState, useEffect } from "react";
import React from "react";
import Testimonials from "./testimonials";
import axios from "axios";
import styles from "../ui/landing/Header.module.css";
import { CircularProgress } from "@mui/material";
import { IonIcon } from "@ionic/react";
import {
  personOutline,
  mailOutline,
  callOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  peopleOutline,
} from "ionicons/icons";
import OTPModal from "./OTPModal";
import CustomSnackbar from "../components/snackbar";
import Title from "../components/title";
import Subtitle from "../components/subtitle";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

type IconType = "user" | "mail" | "phone" | "lock" | "hearAbout";

const iconMap: { [key in IconType]: string } = {
  user: personOutline,
  mail: mailOutline,
  phone: callOutline,
  lock: lockClosedOutline,
  hearAbout: peopleOutline,
};

const RegisterPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [referral, setReferral] = useState<string | undefined>(undefined);
  const [isReferralDisabled, setIsReferralDisabled] = useState(false);

  useEffect(() => {
    const referralParam = searchParams.get("referral");
    const referralEmail = referralParam ? String(referralParam) : undefined;
    setReferral(referralEmail);

    // Update formData when referral is fetched
    setFormData((prevData) => ({
      ...prevData,
      referral: referralEmail || "", // Set the referral email in formData
    }));

    // Set the referral input as disabled if it has a value
    setIsReferralDisabled(!!referralEmail);
  }, [searchParams]);

  useEffect(() => {
    document.body.style.backgroundColor = "#351265";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const fields: {
    placeholder: string;
    name: string;
    type: string;
    icon: IconType;
    value?: string;
    disabled?: boolean;
  }[] = [
    {
      placeholder: "*First Name",
      name: "firstName",
      type: "text",
      icon: "user",
    },
    { placeholder: "*Last Name", name: "lastName", type: "text", icon: "user" },
    {
      placeholder: "*Email Address",
      name: "email",
      type: "email",
      icon: "mail",
    },
    {
      placeholder: "*Phone Number (e.g. 08034567890)",
      name: "phone",
      type: "text",
      icon: "phone",
    },
    {
      placeholder: "Referral Email (optional)",
      name: "referral",
      type: "email",
      icon: "mail",
      value: referral || "", // Prefill only the referral field
      disabled: isReferralDisabled, // Disable if referral is prefilled from query param
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    referral: referral || "", // Prefill the referral email
    howDidYouHear: "",
  });

  const isButtonDisabled =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email.includes("@") ||
    !formData.phone ||
    formData.password.length < 8 ||
    !formData.howDidYouHear ||
    formData.howDidYouHear === ""; // howDidYouHear should be required

  const buttonBackgroundColor = isLoading
    ? "green"
    : isButtonDisabled
    ? "grey"
    : "#4C28BC";

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof typeof formData]: value, // Assert name is a key of formData
    }));
  };

  const handleCloseOTPModal = () => {
    setShowOTPModal(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        referral: formData.referral ? formData.referral : "no referral", // Use referral if provided, else empty
        password: formData.password,
        how_did_you_hear: formData.howDidYouHear || "", // Ensure howDidYouHear is sent
      };

      console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      console.log("How did you hear:", formData.howDidYouHear);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/`,
        payload
      );

      setIsLoading(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Account creation successfully initiated!");
      setSnackbarOpen(true);
      setShowOTPModal(true);
    } catch (error) {
      setIsLoading(false);
      let errorMsg = "Something went wrong. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          errorMsg = error.response.data.email
            ? "A user with this email already exists. If in doubt, click Forget Password on the login page"
            : "Please fill in all required fields to create your account.";
        } else if (error.response?.status === 500) {
          errorMsg = "Internal server error. Please try again later.";
        } else {
          errorMsg = error.response?.data.detail || errorMsg;
        }
      }
      setErrorMessage(errorMsg);
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMsg);
      setSnackbarOpen(true);
    }
  };

  return (
    <section className="bg-customPurple animate-floatIn">
      <div className="bg-customPurple grid md:h-screen md:grid-cols-2">
        <div className="bg-[#F7F5FF] flex flex-col items-center justify-center">
          <div className="max-w-xl px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
            {/* <h2 className="mb-1 text-purple1 tracking-tight font-proxima font-black md:mb-2 md:text-5xl">Create Account</h2> */}
            <Title>
              <span style={{ color: "#BB9CE8" }}>Create</span> Account
            </Title>
            {/* <p className="mb-8 text-lg text-[#4C28Bc] font-karla tracking-tight md:mb-12 md:text-1">
              Earn 20% p.a. every January and July. {"\n"}
              Own properties and earn a lifetime rent. Signup here.
            </p> */}

            <Subtitle style={{ color: "#4C28BC", marginBottom: 25 }}>
              Earn 20% p.a. every January and July. {"\n"}
              Earn lifetime rent from our hostels.
            </Subtitle>

            <form
              className="mx-auto mb-4 max-w-lg pb-4"
              name="wf-form-register"
              method="get"
              onSubmit={(e) => e.preventDefault()} // Prevent form submission
            >
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
                    className={`block h-9 w-full border border-black ${
                      name === "referral" ? "bg-gray-200" : "bg-[#fff]"
                    } px-3 py-6 pl-14 text-3x1 text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]`}
                    onChange={handleInputChange}
                    value={
                      name === "referral"
                        ? formData.referral
                        : formData[name as keyof typeof formData]
                    }
                    disabled={name === "referral" ? isReferralDisabled : false}
                  />
                </div>
              ))}

              <div className="relative mb-4">
                <IonIcon
                  icon={iconMap["lock"]}
                  className="w-6 h-6 text-[#4C28BC] absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                />
                <IonIcon
                  icon={passwordVisible ? eyeOutline : eyeOffOutline}
                  className="cursor-pointer text-[#4C28BC] absolute right-[5%] top-[26%] w-6 h-6 inline-block"
                  onClick={togglePasswordVisibility}
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="*Password (min 8 characters)"
                  className="block h-9 w-full border border-black bg-[#fff] px-3 py-6 pl-14 text-3x1 text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative mb-4">
                <IonIcon
                  icon={iconMap["hearAbout"]}
                  className="w-6 h-6 text-[#4C28BC] absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                />
                <select
                  name="howDidYouHear"
                  required
                  className="block h-12 w-full border border-black bg-[#fff] px-3 py-2 pl-14 pr-8 text-sm text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
                  defaultValue=""
                  onChange={handleInputChange}
                >
                  <option value="" style={{ color: "#999999" }}>
                    *How did you hear about MyFund?
                  </option>
                  <option value="SM">
                    Social Media - Facebook, Instagram, etc.
                  </option>
                  <option value="IMs">
                    Instant Messaging - WhatsApp, Telegram, etc.
                  </option>
                  <option value="FF">Family and Friend</option>
                  <option value="GS">Google Search</option>
                  <option value="REC">Recommended</option>
                  <option value="CFG">Cashflow Game</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <label className="mb-6 flex items-center pb-12 font-medium lg:mb-1">
                <span className="inline-block text-karla cursor-pointer text-xs">
                  By clicking Create Free Account, I agree with the{" "}
                  <a
                    href="/terms"
                    className="font-bold text-[#0b0b1f]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms &amp; Conditions
                  </a>
                </span>
              </label>

              <div
                className={`${styles.buttonContainer} flex mb-4 justify-center items-center `}
              >
                <button
                  className="mr-5 inline-block rounded-xl px-8 py-4 text-center cursor-pointer font-semibold text-white"
                  style={{
                    boxShadow: "6px 6px #351265",
                    backgroundColor: buttonBackgroundColor,
                  }}
                  onClick={handleSignup}
                  disabled={isButtonDisabled}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <CircularProgress
                        size={20}
                        color="inherit"
                        className="mr-2"
                      />
                      <span>
                        CREATING ACCOUNT...
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
                    </div>
                  ) : (
                    <span>
                      CREATE ACCOUNT
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
        <div className="flex flex-col items-center justify-center bg-customPurple rounded-lg animate-floatIn">
          <Testimonials />

          <OTPModal
            email={formData.email}
            password={formData.password}
            isOpen={showOTPModal}
            onClose={handleCloseOTPModal}
          />
        </div>
      </div>

      {/* Snackbar component for displaying success or error messages */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </section>
  );
};

export default RegisterPage;
