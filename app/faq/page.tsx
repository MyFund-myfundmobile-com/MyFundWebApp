"use client";
import Link from "next/link";
import FAQs from "@/data/faqs";
import { useState } from "react";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setIsOpen] = useState(false);

  return (
    <div className="mb-6 w-full border-b-[2px] border-[#dfdfdf] p-8">
      <div className="flex cursor-pointer justify-between w-full">
        <p className="text-xl font-bold">{question}</p>
        <div
          className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center"
          onClick={() => setIsOpen((state) => !state)}
        >
          <div className="absolute h-5 w-0.5 bg-purple1"></div>
          <div className="h-0.5 w-5 bg-purple1"></div>
        </div>
      </div>
      <p
        className={`my-4 transition-all ease-in ${
          open ? "opacity-100 visible" : "opacity-0 hidden"
        }`}
      >
        {answer}
      </p>
    </div>
  );
};

const FAQ = () => {
  return (
    <section>
      {" "}
      {/* FAQ Container */}{" "}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {" "}
        {/* FAQ Title */}{" "}
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <p className="text-sm font-bold uppercase text-purple1">FAQS</p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#647084]">
            These are the common questions our users ask and the best solutions to them </p>
        </div>{" "}
        {/* FAQ Content */}{" "}
        <div className="mb-12 flex flex-col items-center">
          {FAQs.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
        {/* FAQ Text */}{" "}
        <p className="text-center">
          Can’t find the answer you’re looking for? Reach out to our{" "}
          <Link className="text-purple1" href="#">
            customer support team
          </Link>
          .
        </p>
      </div>
    </section>
  );
};
export default FAQ;
