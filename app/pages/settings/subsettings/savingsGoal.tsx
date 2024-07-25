"use client";
import React, { useState, useEffect } from "react";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import { IonIcon } from "@ionic/react";
import { arrowUpOutline, saveOutline } from "ionicons/icons";
import { Box } from "@mui/material";
import { PrimaryButton } from "@/app/components/Buttons/MainButtons";
import UpdateSavingsGoalModal from "../modals/updateSavingsGoalModal";
import { updateSavingsGoal } from "@/app/Redux store/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/Redux store/store";

const SavingsGoal: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [savingsPerMonth, setSavingsPerMonth] = useState(5000); // Example monthly savings amount
  const [amountNum, setAmountNum] = useState(1000000); // Example target amount
  const [preferredAsset, setPreferredAsset] = useState("Real Estate"); // Example preferred asset
  const [duration, setDuration] = useState(5); // Example duration in years
  const durationNum = duration;

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type

  const [savingsGoalMessage, setSavingsGoalMessage] = useState(
    `You should be saving ₦${savingsPerMonth.toLocaleString()} per month to reach ₦${amountNum.toLocaleString()} for your ${preferredAsset} investment in ${durationNum} ${
      durationNum > 1 ? "years" : "year"
    }. Keep saving to reach your goal.`
  );

  useEffect(() => {
    if (userInfo) {
      const { preferred_asset, savings_goal_amount, time_period } = userInfo;
      setPreferredAsset(preferred_asset || "Real Estate");
      setAmountNum(parseInt(savings_goal_amount) || 1000000);
      setDuration(parseInt(time_period) || 5);
      const calculatedSavingsPerMonth =
        parseInt(savings_goal_amount) / (parseInt(time_period) * 12);
      setSavingsPerMonth(
        Math.round(Number(calculatedSavingsPerMonth.toPrecision(3)))
      );
      setSavingsGoalMessage(
        `You should be saving ₦${calculatedSavingsPerMonth.toLocaleString()} per month to reach ₦${savings_goal_amount.toLocaleString()} for your ${preferred_asset} investment in ${time_period} ${
          parseInt(time_period) > 1 ? "years" : "year"
        }. Keep saving to reach your goal.`
      );
    }
  }, [userInfo]);

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  // Function to handle setting the updated savings goal message
  const setUpdatedSavingsGoal = (message: string) => {
    setSavingsGoalMessage(message);
  };

  // Function to handle updating the savings goal
  const handleUpdate = (
    newPreferredAsset: string,
    newAmount: number,
    newDuration: number
  ) => {
    setPreferredAsset(newPreferredAsset);
    setAmountNum(newAmount);
    setDuration(newDuration);

    const newSavingsPerMonth = newAmount / (newDuration * 12);
    const roundedSavingsPerMonth = Math.round(
      Number(newSavingsPerMonth.toPrecision(3))
    ); // Round to 3 significant figures
    setSavingsPerMonth(roundedSavingsPerMonth);

    const newSavingsGoalMessage = `You should be saving ₦${roundedSavingsPerMonth.toLocaleString()} per month to reach ₦${newAmount.toLocaleString()} for your ${newPreferredAsset} investment in ${newDuration} ${
      newDuration > 1 ? "years" : "year"
    }. Keep saving to reach your goal.`;
    setSavingsGoalMessage(newSavingsGoalMessage);

    // Dispatch the updated savings goal
    dispatch(
      updateSavingsGoal({
        preferred_asset: newPreferredAsset,
        savings_goal_amount: newAmount.toString(),
        time_period: newDuration.toString(),
      })
    );
  };

  return (
    <Box
      className="px-6 animate-floatIn max-w-full bg-[#F7F5FF]"
      style={{ padding: "36px", borderRadius: "8px", backgroundColor: "white" }}
    >
      <div className="flex justify-between items-center">
        <div>
          <Title style={{ marginTop: -15 }}>My Savings Goal</Title>
          <Subtitle style={{ marginTop: 1, paddingRight: 90 }}>
            {savingsGoalMessage}
          </Subtitle>
        </div>
        <div className="flex items-center">
          <IonIcon
            icon={saveOutline}
            className="text-purple1"
            style={{ fontSize: "32px" }}
          />
        </div>
      </div>

      <div
        className="rounded-lg p-4 mt-4 sm:p-6 grid grid-cols-1 items-center overflow-hidden text-center"
        style={{
          backgroundColor: "#DCD1FF",
          color: "black",
          fontFamily: "Karla",
          fontSize: 14,
          marginBottom: "16px",
        }}
      >
        <p className="overflow-auto" style={{ wordWrap: "break-word" }}>
          <span className="font-bold text-purple1">
            You should be saving...
          </span>
          <Title style={{ fontSize: 115, marginTop: 0, color: "#BB9CE8" }}>
            ₦{savingsPerMonth.toLocaleString()}
          </Title>

          <Title style={{ fontSize: 50, marginTop: -15, color: "grey" }}>
            per month
          </Title>
        </p>
      </div>

      {/* Update Savings Goal Button */}
      <div className="flex justify-center mt-4">
        <PrimaryButton
          className="text-center w-full lg:w-auto rounded-lg px-4 py-3 font-product-sans uppercase font-bold text-sm"
          onClick={handleOpenModal}
          background="#4C28BC"
          hoverBackgroundColor="#351265"
          color="#fff"
          hoverColor="#fff"
          startIcon={
            <IonIcon
              icon={arrowUpOutline}
              style={{ fontSize: "20px", marginRight: 8 }}
            />
          }
        >
          Update Savings Goal
        </PrimaryButton>
      </div>

      {/* Modal for updating savings goal */}
      <UpdateSavingsGoalModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        firstname={userInfo?.firstName}
        setUpdatedSavingsGoal={setUpdatedSavingsGoal}
        onUpdate={handleUpdate} // Pass handleUpdate function
      />
    </Box>
  );
};

export default SavingsGoal;
