"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IonIcon } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { User } from "../Redux store/types";
import RecentTransactionsModal from "./app/modals/recentTransactionModal";
import { RootState } from "@/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "@/Redux store/actions";
import { AppDispatch } from "@/Redux store/store";

interface HeaderProps {
  isSidebarRetracted: boolean;
  activeItem: string;
  userInfo: User | null; // Add userInfo prop
}

const Header: React.FC = () => {
  const pathname = usePathname().split("/")[2];

  const [isModalOpen, setModalOpen] = useState(false);
  const { userTransactions } = useSelector((state: RootState) => ({
    userTransactions: state.auth.userTransactions,
  }));

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserTransactions(token));
    }
  }, [dispatch, token]);

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="bg-white shadow-md z-10 transition-all duration-300"
      style={{}}
    >
      <div className="flex justify-between items-center p-4">
        <div className=" tracking-custom1 text-center text-[12px] font-nexa text-gray-400 flex-grow uppercase">
          {pathname ?? "Dashboard"}
        </div>
        <div className="absolute right-4 top-4">
          <IonIcon
            icon={notificationsOutline}
            className="text-purple1 text-2xl mr-4"
            style={{ color: "#4C28BC" }}
            onClick={openModal}
          />
        </div>
      </div>
      <RecentTransactionsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transactions={userTransactions}
      />
    </div>
  );
};

export default Header;
