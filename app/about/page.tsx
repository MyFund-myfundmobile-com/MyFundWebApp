"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Title from "../components/title";
import Subtitle from "../components/subtitle";
import Divider from "@mui/material/Divider";

const AboutPage = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: "Our Mission",
      content:
        "To provide working- and retiring-class people the opportunity to earn passive income from real estate.",
      image: "/images/onedown.png", // Add relevant images for the slideshow
      position: "left",
    },
    {
      title: "Our Vision",
      content:
        "To become the go-to platform in the country for the working-class people for real estate investments with 1 million financially free families by 2045.",
      image: "/images/Profile1.png", // Update with actual images
      position: "right",
    },
    {
      title: "Strategy",
      content:
        "Raising a family of landlords by providing fractional ownership investments via our national real-estate project.",
      image: "/images/Profile1.png", // Update with actual images
      position: "left",
    },
    {
      title: "Unique Flavour (USP)",
      content:
        "MyFund helps working-class people save towards properties. Unlike the currently available solutions, MyFund offers lifetime rental income via our national hostel project regardless of their location.",
      image: "/images/Profile1.png", // Update with actual images
      position: "right",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 9000); // Change slide every 9 seconds
    return () => clearInterval(timer); // Cleanup on component unmount
  }, [slides.length]);

  useEffect(() => {
    document.body.style.backgroundColor = "#351265"; // Set background color
    return () => {
      document.body.style.backgroundColor = ""; // Reset background on unmount
    };
  }, []);

  return (
    <div className="bg-customPurple mt-60 flex flex-col items-center justify-center">
      {/* Slideshow Section */}
      <div className="max-w-4xl mt-60 px-5 py-10 text-center">
        {slides[slideIndex].position === "left" ? (
          <div className="flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="text-white max-w-md md:text-left">
              <Subtitle>{slides[slideIndex].title}</Subtitle>
              <Title style={{ color: "white" }}>
                {slides[slideIndex].content}
              </Title>
            </div>
            <Image
              style={{}}
              src={slides[slideIndex].image}
              alt={slides[slideIndex].title}
              width={320}
              height={320}
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Image
              src={slides[slideIndex].image}
              alt={slides[slideIndex].title}
              width={300}
              height={300}
            />
            <div className="text-white max-w-md md:text-right">
              <Subtitle>{slides[slideIndex].title}</Subtitle>
              <Title style={{ color: "white" }}>
                {slides[slideIndex].content}
              </Title>
            </div>
          </div>
        )}
      </div>

      <Divider
        className="my-12"
        style={{ backgroundColor: "white", height: "2px" }}
      />

      {/* Team Members Section */}
      <div className="max-w-6xl px-5 py-10 text-center">
        <Title>Meet Our Team</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-white">
              <Image
                src={member.image || "/images/Profile1.png"}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto"
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm">{member.role}</p>
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
    role: "CTO/Co-founder",
    image: "/images/mundi.png",
  },
  {
    name: "Onipede Samuel Oluwaseyi",
    role: "Video Marketing Executive",
    image: "/images/OnipedeSamuel.png",
  },
  {
    name: "Joseph Gideon (Chubi)",
    role: "Digital Marketing Executive (DME)",
    image: "/images/JosephGideon.png",
  },
  {
    name: "Ilesanmi Gbenga Possible",
    role: "Software Developer",
    image: "/images/Profile1.png",
  },
  {
    name: "Sumaiya Zulfikar",
    role: "Full Stack Developer",
    image: "/images/Profile1.png",
  },
  {
    name: "Toluwalase Adeniji",
    role: "Property Manager",
    image: "/images/Profile1.png",
  },
  {
    name: "Moradebuewaoluwa Adeniji",
    role: "Assistant Digital Marketing Executive",
    image: "/images/Profile1.png",
  },
  {
    name: "Timothy Damilola Olodude",
    role: "Digital Marketer/Real Estate Developer",
    image: "/images/Profile1.png",
  },
  {
    name: "Adeolu Akinyemi",
    role: "Adviser (CEO, Marvels Natural Ltd, Pastor and Wealth Creation Expert)",
    image: "/images/Profile1.png",
  },
  {
    name: "Timilehin Adebambo",
    role: "Acting Chief Technology Officer/Head of Tech",
    image: "/images/Profile1.png",
  },
  {
    name: "Samuel Ojedele",
    role: "Full Stack Developer",
    image: "/images/Profile1.png",
  },
  {
    name: "Mrs. Ayodele Olojede",
    role: "Adviser (Business and Finance Leader, Business Mentor for SMEs)",
    image: "/images/Profile1.png",
  },
];

export default AboutPage;
