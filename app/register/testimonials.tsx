"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  message: string;
  name: string;
  description: string;
  image: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      message: "MyFund is doing way better than all other savings app and here's why: None of them gives the returns MyFund does. The best of them gives 15% ROI max.",
      name: "Emmanuel Abolo",
      description: "Founder, Income Boomers, Ibadan, Oyo State.",
      image: "/images/emmanuel.jpg"
    },
    {
      message: "It's been very transforming being a part of MyFund. The things I've learnt from the Wealth Leadership Academy about finance, I couldn't have learnt anywhere else.",
      name: "David Olusegun",
      description: "Fund Manager, Ogun State.",
      image: "/images/segun.png"
    },
    {
      message: "Ever since I've started this savings, it has really helped me pay more attention to my financial development. Thank you all for all you do.",
      name: "Emmanuel Ero Osas",
      description: "First-class graduate, UNIBEN, Benin.",
      image: "/images/emmanuel.png"
    },
    {
        message: "I'm happy I've been able to save my first million using MyFund. Even though most people save for particular targets, I just do it for the rainy days.",
        name: "Bukola Johnson",
        description: "Banker, Trade Service Professional, Lagos.",
        image: "/images/bukola.png"
      },
      {
        message: "MyFund helped me to be able to save enough to buy and own shares of the company. I wouldn't have been able to do it otherwise.",
        name: "Patrick Mundi",
        description: "Proprietor, French Everything, Ogun State.",
        image: "/images/mundi.png"
      }
  ];

  const [shuffledTestimonials, setShuffledTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    // Shuffle testimonials array when component mounts
    shuffleTestimonials();
  }, );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === shuffledTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000000); // Rotate every 15 seconds
    return () => clearInterval(interval);
  }, [shuffledTestimonials]);

  // Function to shuffle testimonials array
  const shuffleTestimonials = () => {
    const shuffledTestimonials = testimonials.sort(() => Math.random() - 0.5);
    setShuffledTestimonials(shuffledTestimonials);
  };

  const currentTestimonial = shuffledTestimonials[currentTestimonialIndex];

  // Check if currentTestimonial is defined before accessing its properties
  if (!currentTestimonial) {
    return null; // or handle the case where there is no testimonial to display
  }

  return (
    <div className="max-w-lg mx-auto py-12">
      <div className="relative rounded-full overflow-hidden w-32 h-32 mx-auto mb-6">
        <Image
          src={currentTestimonial.image}
          alt={currentTestimonial.name}
          width={360}
          height={360}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-center">
        <div className="flex items-center mb-2">
          <div className="mb-6 ml-2 flex h-14 w-14 items-center justify-center bg-[#276ef1] [box-shadow:rgb(171,_196,_245)_-8px_8px]">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 310 310"
                fill="#FFF"
              >
                <path d="M79 144.11c-6 0-11.37.28-16.19.8 8.02-32.82 27.27-48.06 55.31-60.35L103.1 50.31C75.18 62.56 56.9 76.59 43.81 95.82c-15.2 22.35-22.6 51.72-22.6 89.81v16.46c0 31.83.11 57.6 57.79 57.6 57.79 0 57.79-25.87 57.79-57.79 0-31.91.37-57.79-57.79-57.79zm152 0c-6 0-11.37.28-16.19.8 8.02-32.82 27.27-48.06 55.31-60.35L255.1 50.31c-27.92 12.25-46.2 26.28-59.29 45.51-15.2 22.35-22.6 51.72-22.6 89.81v16.46c0 31.83.11 57.6 57.79 57.6 57.79 0 57.79-25.87 57.79-57.79 0-31.91.37-57.79-57.79-57.79z"></path>
              </svg>
            </div>
          <p className="text-lg text-gray-400 ml-2 transition-opacity duration-1000 ease-in-out">{currentTestimonial.message}</p>
        </div>
        <p className="text-lg font-semibold text-purple-400">{currentTestimonial.name}</p>
        <p className="text-sm text-gray-500">{currentTestimonial.description}</p>
      </div>
    </div>
  );
};

export default Testimonials;
