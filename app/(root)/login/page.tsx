"use client"; // Ensure this component is treated as a Client Component

import { cookieCreate } from "@/actions/user.actions";
import { IonIcon } from "@ionic/react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import {
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  mailOutline,
} from "ionicons/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo, setUserToken } from "../../../Redux store/actions";
import { AppDispatch, initStore } from "../../../Redux store/store";
import styles from "../../../components/landing/Header.module.css";
import CustomSnackbar from "../../../components/snackbar";
import Subtitle from "../../../components/subtitle";
import Testimonials from "../../../components/testimonials";
import Title from "../../../components/title";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const isButtonDisabled = !email.includes("@") || password.length < 4;

  const buttonBackgroundColor = isLoading
    ? "green"
    : isButtonDisabled
    ? "grey"
    : "#4C28BC";

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

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
      );

      setIsLoading(false);

      if (response.status === 200) {
        const { access } = response.data;

        if (access) {
          console.log("access", access);
          await cookieCreate("userToken", access);
          await initStore();
          dispatch(setUserToken(access));
          dispatch(fetchUserInfo(access)); // Ensure this is dispatched

          setOpenSnackbar(true);
          setSnackbarSeverity("success");
          setSnackbarMessage("Login successful! Loading...");

          playLoginSound();

          router.push("/app");
        } else {
          setOpenSnackbar(true);
          setSnackbarSeverity("error");
          setSnackbarMessage(
            "Login failed. Please ensure you entered the correct username/password."
          );
        }
      } else {
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Login failed. Please ensure you entered the correct username/password."
        );
      }
    } catch (error: any) {
      // Assert error type as 'any'
      setIsLoading(false);
      setOpenSnackbar(true);
      setSnackbarSeverity("error");

      if (axios.isAxiosError(error)) {
        // Check if error is an AxiosError
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
      } else {
        setSnackbarMessage("An unexpected error occurred. Please try again.");
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
    <section className="bg-customPurple animate-floatIn">
      <div className="bg-customPurple grid md:h-screen md:grid-cols-2">
        <div className="bg-[#F7F5FF] flex flex-col items-center justify-center">
          <div className="max-w-xl px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
            <Title>
              <span style={{ color: "#BB9CE8" }}>Welcome</span> Back
            </Title>
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
                  className="block h-9 w-full border border-black bg-[#fff] px-3 py-6 pl-14 text-3x1 text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
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
                  className="block h-9 w-full border border-black bg-[#fff] px-3 py-6 pl-14 text-3x1 text-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C28BC]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-right text-sm mb-4">
                <Link
                  href="/requestPasswordReset"
                  className="text-sm text-[#4C28BC]"
                >
                  Forgot Password?
                </Link>
              </div>

              <div
                className={`${styles.buttonContainer} flex mb-4 justify-center items-center`}
              >
                <button
                  className="mr-5 inline-block rounded-xl px-8 py-4 text-center cursor-pointer font-semibold text-white"
                  style={{
                    boxShadow: "6px 6px #351265",
                    backgroundColor: buttonBackgroundColor,
                  }}
                  onClick={handleLogin}
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
            <p className="text-sm text-[#636262]">
              New to MyFund?{" "}
              <Link
                href="/register"
                className="text-sm font-bold text-purple1"
              >
                Create Free Account
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-customPurple rounded-lg animate-floatIn">
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
