"use client";
import React, { useEffect, useState } from "react"; // Added useEffect
import "tailwindcss/tailwind.css";
import { IonIcon } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { User } from "../Redux store/types"; // Import User type
import RecentTransactionsModal from "../pages/home/modals/recentTransactionsModal";
import { RootState } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";
import { menuOutline } from "ionicons/icons";

interface HeaderProps {
  isSidebarRetracted: boolean;
  activeItem: string;
  userInfo: User | null;
  handleToggleSidebar: () => void; // Add handleToggleSidebar prop
}

const Header: React.FC<HeaderProps> = ({
  isSidebarRetracted,
  activeItem,
  userInfo,
  handleToggleSidebar, // Destructure the new prop
}) => {
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="bg-white shadow-md fixed top-0 left-0 right-0 z-10 transition-all duration-300"
      style={{ paddingLeft: isSidebarRetracted ? "4rem" : "20rem" }}
    >
      <div className="flex justify-between items-center p-4">
        {isSidebarRetracted && (
          <IonIcon
            icon={menuOutline}
            className="text-purple1 text-2xl cursor-pointer"
            style={{ marginLeft: -50 }}
            onClick={handleToggleSidebar} // Call the prop function to toggle sidebar
          />
        )}
        <div
          className="text-center text-sm font-nexa flex-grow uppercase"
          style={{
            letterSpacing: "0.5rem",
            fontSize: "12px",
            color: "lightgrey",
          }}
        >
          {activeItem}
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
