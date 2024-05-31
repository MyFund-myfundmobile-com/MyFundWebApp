import {
  AcademicCapIcon,
  ArchiveBoxIcon,
  BanknotesIcon,
  HandThumbUpIcon,
  PrinterIcon,
  SparklesIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { IoEyeOutline, IoBusinessOutline } from 'react-icons/io5';


const Facts = () => {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32 flex flex-col items-center">
        {" "}
        <h1 className="mb-4 text-3xl md:text-5xl font-proxima font-bold text-center">
          What We{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Offer
          </span>
        </h1>
        <div className="mb-6 w-full lg:w-3/4 md:mb-10 lg:mb-12 font-product-sans text-center">
          <p className="text-lg text-[#636262]">
          MyFund helps working- and retiring-class people save towards properties. Unlike the currently available solutions, MyFund offers lifetime rental income via our national hostel project.
          </p>
        </div>{" "}
        {/* Component */}{" "}
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-20 lg:grid-cols-2">
          {" "}
          {/* Image Div */}{" "}
          <div className="h-full max-h-[560px] w-[85%] md:left-0 md:w-[95%] lg:w-full">
            <Image
              src="/images/landlord.jpg"
              alt=""
              className="z-10 mx-auto block h-full w-full max-w-[800px] rotate-[3.5deg] rounded-2xl object-cover"
              width={500}
              height={500}
            />
          </div>{" "}
          {/* Features Div */}{" "}
          <div className="md:mx-w-auto grid h-full w-full max-w-[720px] gap-2 sm:grid-cols-2 md:gap-8">
            {" "}
            {/* Feature Item */}{" "}
            <div className="flex flex-col p-2">
              <div className="relative mb-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] [box-shadow:rgb(0,_0,_0)_0px_3px]">
                <IoEyeOutline className="relative z-[1] inline-block h-6" />
                <div className="absolute z-0 h-8 w-8 rounded-full border border-[#DCD1FF] bg-[#DCD1FF]"></div>
              </div>
              <p className="mb-4 font-semibold">Vision</p>
              <p className="text-sm text-[#636262]">
                To become the go-to platform in the country for the working-class people for real estate investments with 1 million financially free families by 2035.
              </p>
            </div>
            {/* Feature Item */}
            <div className="flex flex-col p-2">
              <div className="relative mb-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] [box-shadow:rgb(0,_0,_0)_0px_3px]">
                <IoBusinessOutline className="relative z-[1] inline-block h-6" />
                <div className="absolute z-0 h-8 w-8 rounded-full border border-[#DCD1FF] bg-[#DCD1FF]"></div>
              </div>
              <p className="mb-4 font-semibold">Mission</p>
              <p className="text-sm text-[#636262]">
                To provide working- and retiring-class people the opportunity to earn passive income from real estate.
              </p>
            </div>
{" "}
            {/* Feature Item */}{" "}
            <div className="flex flex-col p-2">
              <div className="relative mb-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] [box-shadow:rgb(0,_0,_0)_0px_3px]">
                <BanknotesIcon className="relative z-[1] inline-block h-6" />
                <div className="absolute z-0 h-8 w-8 rounded-full border border-[#DCD1FF] bg-[#DCD1FF]"></div>
              </div>
              <p className="mb-4 font-semibold">Lifetime Rental Income</p>
              <p className="text-sm text-[#636262]">
                Earn lifetime rental income from owning fractions of any of our hostels across campuses across the country by growing your funds on the platform towards it</p>
            </div>{" "}


            {/* Feature Item */}{" "}
              <div className="flex flex-col p-2">
              <div className="relative mb-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] [box-shadow:rgb(0,_0,_0)_0px_3px]">
              <ArchiveBoxIcon className="relative z-[1] inline-block h-6" />
                <div className="absolute z-0 h-8 w-8 rounded-full border border-[#DCD1FF] bg-[#DCD1FF]"></div>
              </div>
              <p className="mb-4 font-semibold">Monthly Cashflow Game</p>
              <p className="text-sm text-[#636262]">
                The free monthly cashflow game stengthens our community to learn to become financially free with fake money. And each month we get a new winner that we spotlight on our platforms. Join us every second Sunday of the month, 8pm on Google Meet.
              </p>
            </div>{" "}
            {/* <div className="flex flex-col p-2">
              <div className="relative mb-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] [box-shadow:rgb(0,_0,_0)_0px_3px]">
                <PrinterIcon className="relative z-[1] inline-block h-6" />
                <div className="absolute z-0 h-8 w-8 rounded-full border border-[#DCD1FF] bg-[#DCD1FF]"></div>
              </div>
              <p className="mb-4 font-semibold">Publishing Services</p>
              <p className="text-sm text-[#636262]">
                Express yourself more excellently. Get your books published
                within a month and other materials in record time anywhere in
                Nigeria.
              </p>
            </div>{" "}
            {/* Feature Item */}{" "}
            {/* <div className="flex flex-col p-2">
              <div className="relative mb-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] [box-shadow:rgb(0,_0,_0)_0px_3px]">
                <HandThumbUpIcon className="relative z-[1] inline-block h-6" />
                <div className="absolute z-0 h-8 w-8 rounded-full border border-[#DCD1FF] bg-[#DCD1FF]"></div>
              </div>
              <p className="mb-4 font-semibold">Quality</p>
              <p className="text-sm text-[#636262]">
                Our vision is centered around delivering excellence in every
                endeavor, ensuring that every service we provide meets the
                highest standards.
              </p>
            </div>{" "}
            {/* Feature Item */}{" "}
            {/* <div className="flex flex-col p-2">
              <div className="relative mb-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-solid border-[#9b9b9b] [box-shadow:rgb(0,_0,_0)_0px_3px]">
                <ArchiveBoxIcon className="relative z-[1] inline-block h-6" />
                <div className="absolute z-0 h-8 w-8 rounded-full border border-[#DCD1FF] bg-[#DCD1FF]"></div>
              </div>
              <p className="mb-4 font-semibold">Resource</p>
              <p className="text-sm text-[#636262]">
                We leverage a diverse array of resources, including cutting-edge
                technology, expert knowledge, to deliver efficient and effective
                solutions.
              </p>
            </div>  */}
            


          </div>
        </div>
      </div>
    </section>
  );
};

export default Facts;
