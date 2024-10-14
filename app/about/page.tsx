"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Title from "../components/title";
import Subtitle from "../components/subtitle";
import Divider from "@mui/material/Divider";
import { IonIcon } from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import Section from "../components/section";

const AboutPage = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: "Our Mission",
      content:
        "To provide working-class people the opportunity to earn passive income from real estate regardless of their location.",
      image: "/images/onedown.png",
    },
    {
      title: "Our Vision",
      content:
        "To become the go-to platform for real estate investments with 1 million financially free families by 2045.",
      image: "/images/Inauguration.png",
    },
  ];

  const milestones = [
    {
      year: 2021,
      description:
        "Prelaunched MyFund at the Wealth Leadership Academy with - 42 users.",
      image: "/images/wlapix2.png",
    },
    {
      year: 2022,
      description:
        "Certified as an independent financial organization. First 500 users.",
      image: "/images/innaugurated.png",
    },
    {
      year: 2023,
      description:
        "Launched the National Hostel Project starting with FUNAAB Hostels.",
      image: "/images/3dfunaab.png",
    },
    {
      year: 2024,
      description:
        "Launched Enterprise Mobile App and New Webapp. First 1000 users/downloads.",
      image: "/images/myfundmobile.png",
    },
  ];

  // Automatic slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 15000); // Change slide every 15 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  // Background color effect
  useEffect(() => {
    document.body.style.backgroundColor = "#351265"; // Set background color
    return () => {
      document.body.style.backgroundColor = ""; // Reset background on unmount
    };
  }, []);

  // Manual slide change
  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePreviousSlide = () => {
    setSlideIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="bg-customPurple flex flex-col items-center justify-center animate-floatIn">
      {/* Slideshow Section */}
      <div
        className="w-full px-20 py-10 text-center relative"
        style={{ marginTop: 150 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-5 md:space-y-0 md:space-x-10">
          <div
            className="text-white ml-10 mr-10 max-w-lg w-full md:text-left"
            style={{ marginTop: -80 }}
          >
            <Section
              className="uppercase"
              style={{ fontSize: 20, color: "silver" }}
            >
              {slides[slideIndex].title}
            </Section>
            <Title style={{ color: "#BB9CE8" }}>
              {slides[slideIndex].content}
            </Title>
          </div>
          <div
            className="w-full ml-10 mr-10 flex justify-center md:justify-end border border-gray-300 p-3 rounded-lg"
            style={{ borderRadius: 10 }}
          >
            <Image
              src={slides[slideIndex].image}
              alt={slides[slideIndex].title}
              width={1200}
              height={800}
              className="object-cover"
              style={{ borderRadius: 10 }}
            />
          </div>
        </div>
        {/* Chevron navigation buttons */}
        <div className="absolute top-1/2 left-5 transform -translate-y-1/2 cursor-pointer">
          <IonIcon
            icon={chevronForwardOutline}
            color={"#ffffff"}
            onClick={handlePreviousSlide}
          />
        </div>
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer">
          <IonIcon
            icon={chevronBackOutline}
            color={"#ffffff"}
            onClick={handleNextSlide}
          />
        </div>
      </div>

      <Divider
        className="my-12"
        style={{ backgroundColor: "white", height: "2px" }}
      />

      <div className="w-full px-20 py-10 text-center">
        <Title style={{ color: "silver" }}>Our Story</Title>
        <div className="hidden md:flex justify-between mt-10 p-2">
          {/* Web View */}
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="relative border border-silver rounded-lg p-4 w-1/4 flex flex-col items-center"
              style={{
                borderStyle: "dashed",
                borderWidth: "2px",
                borderColor: "grey",
              }} // Custom styles for thickness and dash length
            >
              {index > 0 && (
                <div className="absolute left-[-10px] top-1/2 p-2 transform -translate-y-1/2 w-[2px] bg-silver h-10" />
              )}
              <h2 className="text-white text-xl mb-2">{milestone.year}</h2>
              <Image
                src={milestone.image}
                alt={`Image for ${milestone.year}`}
                width={150} // Changed to be square
                height={150} // Changed to be square
                className="rounded-lg mb-2 object-cover w-full h-full" // Added w-full and h-full to cover the container
              />
              <p
                className="text-gray-300 text-center text-karla font-karla"
                style={{ letterSpacing: -0.5 }}
              >
                {milestone.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col items-start">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex items-start mb-10 border border-silver rounded-lg p-4 "
            >
              <div className="w-1 bg-customPurple h-full" />
              <div className="flex flex-col ml-4">
                <h2 className="text-white text-lg">{milestone.year}</h2>
                <div className="bg-customPurple p-2 rounded-lg">
                  <Image
                    src={milestone.image}
                    alt={`Image for ${milestone.year}`}
                    width={150} // Changed to be square
                    height={150} // Changed to be square
                    className="rounded-lg object-cover w-full h-full" // Added w-full and h-full to cover the container
                  />
                </div>
                <p className="text-gray-300 mt-2">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider
        className="my-12"
        style={{ backgroundColor: "white", height: "2px" }}
      />

      {/* Team Members Section */}
      <div className="w-full pl-20 pr-20 px-80 py-10 text-center">
        <Title style={{ color: "silver" }}>Meet Our Team</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-white border border-gray-300 p-3 rounded-lg"
              style={{ borderRadius: 10, backgroundColor: "#351265" }}
            >
              <Image
                src={member.image || "/images/icb.png"}
                alt={member.name}
                width={100}
                height={300}
                className="object-cover w-full h-80"
                style={{ borderRadius: 10 }}
              />
              <div className="mt-4 text-left">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm" style={{ color: "darkgrey" }}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Team members data
const teamMembers = [
  {
    name: "Tolulope Ahmed (Dr. Tee)",
    role: "CEO/Co-founder",
    image: "/images/DrTsquare.png",
  },
  {
    name: "Patrick Mundi",
    role: "Co-founder",
    image: "/images/mundi2.png",
  },
  {
    name: "Toluwalase Adeniji",
    role: "Property Manager",
    image: "/images/TLash.jpeg",
  },
  {
    name: "Timilehin Adebambo",
    role: "CTO",
    image: "/images/timi.jpg",
  },
  {
    name: "Joseph Gideon (Chubi)",
    role: "Digital Marketing Executive (DME)",
    image: "/images/chubi.png",
  },
  {
    name: "Moradebuewaoluwa Adeniji",
    role: "Assistant Digital Marketing Executive",
    image: "/images/morade..jpeg",
  },
  {
    name: "Ilesanmi Gbenga Possible",
    role: "Software Developer",
    image: "/images/possible1.jpeg",
  },
  {
    name: "Timothy Damilola Olodude",
    role: "Digital Marketer/Real Estate Developer",
    image: "/images/timothy...png",
  },
  {
    name: "Samuel Ojedele",
    role: "Full Stack Developer (intern)",
    image: "/images/samuel.jpeg",
  },
  {
    name: "Sumaiya Zulfikar",
    role: "Full Stack Developer (intern)",
    image: "/images/sumaiya.jpeg",
  },
  {
    name: "Tobiloba Bakare",
    role: "Full Stack Developer (intern)",
    image: "/images/tobi.jpeg",
  },
  {
    name: "Adeolu Akinyemi",
    role: "Adviser (CEO, Marvels Natural Ltd)",
    image: "/images/cm.jpeg",
  },
  {
    name: "Mrs. Ayodele Olojede",
    role: "Adviser (Business & Finance Leader)",
    image: "/images/Ayodele.jpeg",
  },
];

export default AboutPage;
