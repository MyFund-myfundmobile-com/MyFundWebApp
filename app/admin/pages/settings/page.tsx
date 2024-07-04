"use client";
import React, { useState } from 'react';
import Title from '@/app/components/title';
import Subtitle from '@/app/components/subtitle';
import Section from '@/app/components/section';
import { Divider } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { IonIcon } from '@ionic/react';
import { personOutline, callOutline, mailOutline, cashOutline } from 'ionicons/icons';
import { PrimaryButton } from '@/app/components/Buttons/MainButtons';
import Image from 'next/image';

const SettingsPage: React.FC = () => {



  return (
    <div className="px-6 max-w-full animate-floatIn">
      {/* PROFILE SECTION */}
      <Section>PROFILE</Section>
      <div className="flex flex-col lg:flex-row mb-4 mt-5">
        <div className="flex flex-col lg:flex-row lg:w-1/3 items-start">
          {/* Profile Image */}
          <div className="relative">
            <Image src="/images/DrTsquare.png" width={120} height={120} alt="Profile" className="w-36 h-36 rounded-full border-2 border-purple-400" />
            <div className="absolute bottom-0 right-0 bg-purple1 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <Edit className="text-white" />
            </div>
          </div>
          {/* Name and Email */}
          <div className="ml-4 mt-4 lg:mt-0">

            <Title><span style={{ color: '#BB9CE8', fontSize: 20, letterSpacing: 0.1 }}>Admin<br/></span> Tolulope</Title>
            <Subtitle>tolulopeahmed@gmail.com</Subtitle>
          </div>
        </div>
        
        {/* Vertical Divider */}
        <div className="hidden lg:block h-auto mx-6 border-l border-gray-200"></div>

        {/* User Details */}
        <div className="flex flex-col lg:w-2/3 ml-0 lg:ml-6 mt-4 lg:mt-0">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={personOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">Full Name</p>
                <p className="font-semibold font-proxima text-purple1">Tolulope Ahmed</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={callOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">Mobile Number</p>
                <p className="font-semibold font-proxima text-purple1">+2348033924595</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={mailOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">Email/Username</p>
                <p className="font-semibold font-proxima text-purple1">tolulopeahmed@gmail.com</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto mb-2 p-2 border border-purple-400 rounded flex items-center">
              <IonIcon icon={cashOutline} className="mr-2 text-gray-600" />
              <div>
                <p className="text-sm italic font-karla text-gray-600">Financial Level</p>
                <p className="font-semibold font-proxima text-purple1">Level 3: SURPLUS</p>
              </div>
            </div>
          </div>
          {/* Update Profile Button */}
          <div className="flex justify-center mt-4">
            <PrimaryButton
              className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
              onClick={() => console.log("Update Profile Clicked")}
              background="#4C28BC"
              hoverBackgroundColor="#351265"
              color="#fff"
              hoverColor="#fff"
              style={{ width: '95%', letterSpacing: 0.5 }}
            >
              UPDATE PROFILE
            </PrimaryButton>
          </div>
        </div>
      </div>

      <Divider className="my-4 bg-gray-100" />

   
     
    </div>
  );
};

export default SettingsPage;
