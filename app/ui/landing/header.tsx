"use client";

import { useState } from "react";
import { Img } from "react-image";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import styles from "./Header.module.css";
import { IoLogoApple, IoLogoAndroid, IoCheckmarkCircle } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
import { IonIcon } from "@ionic/react";
import { shieldCheckmarkOutline } from "ionicons/icons";
import { Tooltip } from "@mui/material";
import Section from "@/app/components/section";

const Header = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadingPlatform, setDownloadingPlatform] = useState<string | null>(
    null
  );

  const handleDownload = (platform: string) => {
    setDownloading(true);
    setDownloadingPlatform(platform);
    setTimeout(() => {
      setDownloading(false);
      setDownloadingPlatform(null);
    }, 4000);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-10 md:py-16 lg:py-24">
      <div className="mt-10 grid grid-cols-1 gap-12 sm:gap-20 lg:grid-cols-2 items-center justify-center max-h-[100%] w-[100%] animate-floatIn">
        <div className="max-w-[720px] lg:max-w-[842px] animate-floatIn">
          <h1 className="mb-4 mt-20 text-4xl md:text-6xl font-proxima font-bold tracking-tighter animate-float-up animate-floatIn">
            <span>
              The{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                TRUE{" "}
              </span>
            </span>
            <span>Way to</span>

            <div className="flex items-center">
              <h1 className="font-proxima font-black text-6xl md:text-6xl text-customPurple ml-2">
                Save
              </h1>
              <span className="text-4xl md:text-6xl font-proxima font-bold ml-2">
                &
              </span>
              <h1 className="font-proxima font-black text-6xl md:text-6xl text-customPurple ml-2">
                Invest&nbsp;
              </h1>
              <IonIcon
                icon={shieldCheckmarkOutline}
                className="text-green-500 text-6xl md:text-6xl"
              />
            </div>
          </h1>
          <div className="mb-6 animate-floatIn max-w-[528px] md:mb-10 lg:mb-12 font-product-sans animate-fade-left-delay">
            <p className="text-xl text-[#636262]">
              <IoCheckmarkCircle className="inline text-green-500 mr-2" />
              Earn{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                20% p.a.
              </span>{" "}
              on your funds every January and July!
              <div className="mt-1" />
              <IoCheckmarkCircle className="inline text-green-500 mr-2" />
              Buy properties and{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                earn lifetime rent
              </span>{" "}
              via our hostels.
            </p>
          </div>
          <div className="flex flex-col">
            <div className={`${styles.buttonContainer} flex mb-4`}>
              <a
                href="/register"
                className="mr-5 inline-block rounded-xl px-8 py-4 text-center font-bold text-white justify-center"
                style={{
                  boxShadow: "6px 6px #351265",
                  backgroundColor:
                    downloading && downloadingPlatform === "app"
                      ? "green"
                      : "#4C28BC",
                }}
                onClick={() => handleDownload("app")}
              >
                {downloading && downloadingPlatform === "app" ? (
                  <>
                    CREATE FREE ACCOUNT...
                    <CircularProgress
                      size={16}
                      className="ml-2"
                      style={{ color: "white" }}
                    />
                  </>
                ) : (
                  "CREATE FREE ACCOUNT"
                )}
              </a>
            </div>

            <div className={styles.buttonGroup}>
              <PrimaryButton
                className={`text-center animate-floatIn w-auto rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-gray-200 hover:shadow-lg transition-shadow ${styles.smallButton}`}
                onClick={() => handleDownload("iphone")}
                background="#fff"
                color="grey"
                borderWidth="2px"
                borderColor="silver"
                startIcon={<IoLogoApple className="h-6 w-6 mr-2" />}
              >
                <a
                  download
                  href="https://play.google.com/store/apps/details?id=com.tolulopeahmed.MyFundMobile&hl=en-US&ah=8tHkpMJsIEBoT8L1QltL5TBTQ68"
                >
                  {downloading && downloadingPlatform === "iphone" ? (
                    <>
                      Get it on iPhone...
                      <CircularProgress size={16} className="ml-2" />
                    </>
                  ) : (
                    "Get it on iPhone"
                  )}
                </a>
              </PrimaryButton>

              <PrimaryButton
                className={`text-center w-auto animate-floatIn rounded-lg px-4 py-3 font-product-sans font-bold text-sm text-gray-400 hover:bg-gray-200 hover:shadow-lg transition-shadow ${styles.smallButton}`}
                onClick={() => handleDownload("android")}
                background="#fff"
                color="grey"
                borderWidth="2px"
                borderColor="silver"
                startIcon={<IoLogoAndroid className="h-6 w-6 mr-2" />}
              >
                <a
                  download
                  href="https://play.google.com/store/apps/details?id=com.tolulopeahmed.MyFundMobile&hl=en-US&ah=8tHkpMJsIEBoT8L1QltL5TBTQ68"
                >
                  {downloading && downloadingPlatform === "android" ? (
                    <>
                      Get it on Android...
                      <CircularProgress size={16} className="ml-2" />
                    </>
                  ) : (
                    "Get it on Android"
                  )}
                </a>
              </PrimaryButton>
            </div>
          </div>
          <div className="mt-10 flex justify-start items-center">
            <div className="logo-container">
              <div className="scroll">
                <Img
                  src="/images/tef.png"
                  alt="TEF"
                  className="h-12 w-auto object-contain logo"
                />
                <Img
                  src="/images/fgn.png"
                  alt="FGN"
                  className="h-12 w-auto object-contain logo"
                />
                <Img
                  src="/images/ocn.png"
                  alt="OCN"
                  className="h-12 w-auto object-contain logo"
                />
                <Img
                  src="/images/fate2.png"
                  alt="FATE"
                  className="h-12 w-auto object-contain logo"
                />
                {/* Duplicate the logos for continuous scrolling */}
                <Img
                  src="/images/tef.png"
                  alt="TEF"
                  className="h-12 w-auto object-contain logo"
                />
                <Img
                  src="/images/fgn.png"
                  alt="FGN"
                  className="h-12 w-auto object-contain logo"
                />
                <Img
                  src="/images/ocn.png"
                  alt="OCN"
                  className="h-12 w-auto object-contain logo"
                />
                <Img
                  src="/images/fate.png"
                  alt="FATE"
                  className="h-12 w-auto object-contain logo"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-20 ml--30 relative left-4 h-full max-h-[1400px] animate-floatIn max-w-[2680px] w-full lg:left-0 lg:w-full ${styles.heroImage}`}
        >
          <Img
            src="/images/hero.png" // Only show hero1.png
            width={2900}
            height={1400}
            alt=""
            className="ml--10 relative h-full w-full max-w-none rounded-2xl object-cover border-1"
          />
        </div>
      </div>
      {/* Floating WhatsApp Icon with Tooltip */}
      {/* Floating WhatsApp Icon with Tooltip */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-center">
        <Tooltip title="Live Chat Admin" placement="top" arrow>
          <a
            href="http://wa.me/+2349032719396"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-500 rounded-full shadow-lg transition-transform duration-300 hover:scale-125 hover:bg-green-600"
            style={{ boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)" }}
          >
            <Img
              src="/images/whatsapp.png"
              alt="WhatsApp"
              className="w-10 h-10"
            />
          </a>
        </Tooltip>
        <span className="text-xs font-karla italic text-gray-600 mt-2">
          Chat Admin...
        </span>
      </div>
    </div>
  );
};

export default Header;
