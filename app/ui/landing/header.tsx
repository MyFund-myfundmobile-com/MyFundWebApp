import Image from "next/image";

const Header = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-10 md:py-16 lg:py-24">
      {" "}
      {/* Component */}{" "}
      <div className="grid grid-cols-1 gap-12 sm:gap-20 lg:grid-cols-2 items-center justify-center">
        {" "}
        {/* Heading Div */}{" "}
        <div className="max-w-[720px] lg:max-w-[842px]">
          <h1 className="mb-4 text-4xl md:text-6xl font-proxima font-bold">
            Grow Your Funds,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Acquire Assets
            </span>
          </h1>
          <div className="mb-6 max-w-[528px] md:mb-10 lg:mb-12 font-product-sans">
            <p className="text-xl text-[#636262]">
              Let's help you achieve what we've achieved and assist others in
              reaching their goals.
              <div className="mt-1" />
              Grow your funds to the millions with MyFund.
            </p>
          </div>{" "}
          {/* Button Wrap */}{" "}
          <div className="flex">
            <a
              download
              href="/myFund-Enterprise-App.apk"
              className="mr-5 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(76,_40,188)_6px_6px] md:mr-6"
            >
              Download the App
            </a>
            {/* <a
              href="#"
              className="flex max-w-full flex-row items-center rounded-xl border border-solid border-purple1 px-6 py-3 font-semibold text-purple1 [box-shadow:rgb(76,_40,188)_6px_6px]"
            >
              <p className="text-black">Download the App</p>
            </a> */}
          </div>
        </div>{" "}
        {/* Image Div */}{" "}
        <div className="relative left-4 h-full max-h-[660px] w-[85%] lg:left-0 lg:w-full">
          <Image
            src="/images/hero.png"
            width={600}
            height={600}
            alt=""
            className="relative h-full w-full max-w-[800px] -rotate-[3.5deg] rounded-2xl object-cover border-1"
          />
          <div className="absolute bottom-0 left-4 right-0 top-4 -z-10 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
