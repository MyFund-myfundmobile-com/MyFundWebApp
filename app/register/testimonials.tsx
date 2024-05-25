"use client";
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      message: "MyFund is doing way better than all other savings app and here's why: None of them gives the returns MyFund does. The best of them gives 15% ROI max.",
      name: "Emmanuel Abolo",
      description: "Founder, Income Boomers, Ibadan",
      image: "/images/emmanuel.png"
    },
    {
      message: "It's been very transforming being a part of MyFund. The things I've learnt from the Wealth Leadership Academy about finance, I couldn't have learnt anywhere else.",
      name: "David Olusegun",
      description: "Fund Manager, Ogun",
      image: "/images/segun.png"
    },
    {
      message: "Ever since I've started this savings, it has really helped me pay more attention to my financial development. Thank you all for all you do.",
      name: "Emmanuel Ero Osas",
      description: "First-class graduate, UNIBEN, Benin",
      image: "/images/bukola.png"
    }
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000); // Rotate every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <div className="max-w-lg mx-auto py-12">
      <div className="relative rounded-full overflow-hidden w-32 h-32 mx-auto mb-6">
        <img
          src={currentTestimonial.image}
          alt={currentTestimonial.name}
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
  
  <p className="text-lg text-gray-800 ml-2">{currentTestimonial.message}</p>
</div>

        <p className="text-lg font-semibold text-purple-700">{currentTestimonial.name}</p>
        <p className="text-sm text-gray-600">{currentTestimonial.description}</p>
      </div>
    </div>
  );
};

export default Testimonials;
