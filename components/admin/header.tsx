"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { IoIosNotificationsOutline } from "react-icons/io";

const Header: React.FC = () => {
  const pathname = usePathname().split("/")[2];

  return (
    <div
      className="bg-white shadow-md z-10 transition-all duration-300"
      style={{}}
    >
      <div className="flex justify-between items-center p-4">
        <div className=" tracking-custom1 text-center text-[12px] font-nexa text-gray-400 flex-grow uppercase">
          {pathname}
        </div>
        <div className="absolute right-4 top-4">
          <IoIosNotificationsOutline className="text-purple1 text-2xl mr-4" />
        </div>
      </div>
    </div>
  );
};

export default Header;
