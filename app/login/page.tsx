"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { IonIcon } from "@ionic/react";
import Testimonials from "../register/testimonials";
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from "ionicons/icons";
import Subtitle from "../components/subtitle";
import axios from "axios";
import CustomSnackbar from "../components/snackbar";
import { useDispatch } from "react-redux";
import { loginSuccess, fetchUserProfile } from "../store/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  ); // Severity for Snackbar

  /*


const handleLogin = async (credentials) => {
  const response = await axios.post('/login', credentials);
  const { token, userId } = response.data;

  dispatch(loginSuccess({ token, userId }));
  dispatch(fetchUserProfile(token));
};
  */

  useEffect(() => {
    document.body.style.backgroundColor = "#351265";
    return () => {
      document.body.style.backgroundColor = ""; // Reset background color when component unmounts
    };
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const payload = {
        username: email,
        password: password,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/`,
        payload
      ); // Adjust endpoint as per your API
      setIsLoading(false);

      // Assuming successful login returns a status code or data
      if (response.status === 200) {
        setOpenSnackbar(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Login successful!");
        playLoginSound(); // Function to play login sound
        setTimeout(() => {
          window.location.href = "/App"; // Redirect to the home page after login
        }, 1000); // Optional: Delay before redirecting
      } else {
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Login failed. Please ensure you entered the correct username/password."
        );
      }
    } catch (error: any) {
      // Use type assertion or any type for error
      setIsLoading(false);
      setOpenSnackbar(true);
      setSnackbarSeverity("error");

      if (error.message === "Network Error") {
        setSnackbarMessage(
          "No internet connection. Please check your network."
        );
      } else if (error.response && error.response.status === 401) {
        setSnackbarMessage("Invalid username or password. Please try again.");
      } else {
        setSnackbarMessage(
          "Wrong username or password. Please check and try again."
        );
      }
    }
  };

  const playLoginSound = () => {
    const audio = new Audio("/audios/warm_login.mp3");
    audio.play();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <section className="bg-customPurple">
      <div className="bg-customPurple grid md:h-screen md:grid-cols-2">
        <div className="bg-[#F7F5FF] flex flex-col items-center justify-center">
          <div className="max-w-xl px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
            <h2 className="mb-1 text-purple1 tracking-tight font-proxima font-black md:mb-2 md:text-5xl">
              <span style={{ color: "#BB9CE8" }}>Welcome</span> Back
            </h2>
            <Subtitle style={{ color: "#4C28BC", marginBottom: 25 }}>
              Earn 20% p.a. every January and July. {"\n"}
              Own properties and earn a lifetime rent. Jump right back in!
            </Subtitle>
            <form
              className="mx-auto mb-4 max-w-lg pb-4"
              onSubmit={(e) => e.preventDefault()}
            >
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
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="block h-9 w-full border border-black bg-[#fff] px-3 py-6 pl-14 text-sm text-[#333333] rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-right mb-4">
                <a
                  href="/requestPasswordReset"
                  className="text-sm text-[#276EF1]"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="flex mb-4 justify-center items-center">
                <button
                  className="mr-5 inline-block rounded-xl px-8 py-4 text-center cursor-pointer font-semibold text-white"
                  style={{
                    boxShadow: "6px 6px #351265",
                    backgroundColor: isLoading ? "black" : "#4C28BC",
                  }}
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <CircularProgress
                        size={20}
                        color="inherit"
                        className="mr-2"
                      />
                      <span>
                        LOGGING IN...
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
                      LOG ME IN
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
            <p className="text-[#636262]">
              New to MyFund?{" "}
              <a href="/register" className="text-[#276EF1]">
                Create Free Account
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-customPurple rounded-lg">
          <Testimonials />
        </div>
      </div>
      <CustomSnackbar
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </section>
  );
};

export default LoginPage;
