"use client";

import React, { useEffect, useState } from "react";
import Title from "@/app/components/title";
import Subtitle from "@/app/components/subtitle";
import { Divider } from "@mui/material";
import Section from "@/app/components/section";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopSaversData } from "@/app/Redux store/actions";
import { RootState } from "@/app/Redux store/store";
import { FaTrophy, FaArrowUp } from "react-icons/fa";
import { AppDispatch } from "@/app/Redux store/store";

interface Saver {
  id: number;
  firstName: string;
  profilePicture: string;
}

const TopSaversSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const token = useSelector((state: RootState) => state.auth.token);

  const topSaversData = useSelector(
    (state: RootState) => state.auth.topSaversData
  );
  const userPercentage = useSelector(
    (state: RootState) => state.auth.userPercentage
  );
  const userEmail = useSelector(
    (state: RootState) => state.auth.userInfo.email
  );

  const [currentMonth, setCurrentMonth] = useState<string>("");

  useEffect(() => {
    if (token) {
      dispatch(fetchTopSaversData(token));
    }

    // Get the current month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const current = new Date();
    setCurrentMonth(monthNames[current.getMonth()]);
  }, [dispatch, token]);

  const topSavers: Saver[] =
    topSaversData?.top_savers?.slice(0, 10).map((saver) => ({
      id: saver.id,
      firstName: saver.first_name,
      profilePicture: saver.profile_picture,
    })) || [];

  // Find user's position
  const userPosition =
    topSaversData?.top_savers?.findIndex(
      (saver) => saver.email === userEmail
    ) ?? -1;

  return (
    <section className="border border-gray-300 bg-white p-4 rounded-lg w-full h-[calc(10*4rem)]">
      {" "}
      {/* Ensure height accommodates 10 savers */}
      <Section style={{ marginTop: -1 }}>
        TOP SAVERS IN {currentMonth.toUpperCase()}
      </Section>
      <div style={{ marginTop: 10 }}>
        {userPosition === -1 && (
          <Subtitle
            className="rounded-lg p-2 sm:p-4 grid grid-cols-[auto,1fr] items-start overflow-hidden bg-[#f7f5ff] text-[12px]"
            style={{ fontSize: 16 }}
          >
            You&apos;re yet to save this month. Save to see your position in the
            list of top savers.
          </Subtitle>
        )}
        {userPosition !== -1 && userPercentage !== undefined && (
          <Subtitle style={{ fontSize: 16 }}>
            {userPercentage.toFixed(0)}% to the top
          </Subtitle>
        )}
        {userPosition !== -1 && userPosition < 3 && (
          <div
            className="rounded-lg p-2 sm:p-4 grid grid-cols-[auto,1fr] items-start overflow-hidden bg-[#f7f5ff] text-[12px]"
            style={{ letterSpacing: "-0.4px" }}
          >
            <FaTrophy
              className="w-8 h-8 mr-3 self-center"
              style={{ color: "gold" }}
            />
            <p className="overflow-auto" style={{ wordWrap: "break-word" }}>
              <span className="font-karla text-gray-700">
                Congrats! You are one of the top savers in {currentMonth}!
                🥳🍾🎉🎊 Keep saving to stay at the top.
              </span>
            </p>
          </div>
        )}
        {userPosition !== -1 && userPosition >= 3 && (
          <div
            className="rounded-lg p-2 sm:p-4 grid grid-cols-[auto,1fr] items-start overflow-hidden bg-[#f7f5ff] font-karla text-[12px]"
            style={{ letterSpacing: "-0.4px" }}
          >
            <FaArrowUp
              className="w-8 h-8 mr-3 self-center"
              style={{ color: "green" }}
            />
            <p className="overflow-auto" style={{ wordWrap: "break-word" }}>
              Hey{" "}
              {
                topSaversData?.top_savers.find(
                  (saver) => saver.email === userEmail
                )?.first_name
              }
              , you&apos;re{" "}
              <span className="font-karla text-green-700">
                {userPercentage?.toFixed(0)}%
              </span>
              from being one of the top savers in {currentMonth}. Keep growing
              your savings to earn a spot in the top ranks.
            </p>
          </div>
        )}

        <Subtitle style={{ marginTop: 10, marginBottom: 1, fontSize: 13 }}>
          My Position
        </Subtitle>
        <Title style={{ color: "silver", marginTop: 0, fontSize: 70 }}>
          {userPosition === -1 ? (
            <span className="ml-5">-</span>
          ) : (
            `${userPosition + 1}${
              userPosition + 1 === 1
                ? "st"
                : userPosition + 1 === 2
                ? "nd"
                : userPosition + 1 === 3
                ? "rd"
                : "th"
            }`
          )}
        </Title>
      </div>
      <Divider className="my-4 bg-silver mb-8" style={{ marginBottom: 25 }} />
      <ul className="space-y-3">
        {topSavers.map((saver, index) => (
          <li
            key={saver.id}
            className="flex items-center space-x-3 justify-between" // Align trophies to end
            style={{ height: "3rem" }} // Adjust height for consistency
          >
            <span
              className="text-lg font-nexa"
              style={{ textAlign: "center", alignSelf: "center" }}
            >
              {index + 1}
              {index === 0 && <span className="ml-1"></span>}
              {index === 1}
              {index === 2}
              {index > 2}
            </span>
            <Image
              src={saver.profilePicture || "/images/Profile1.png"}
              alt={saver.firstName}
              width={index === 0 ? 50 : 40} // Larger profile picture for the top saver
              height={index === 0 ? 50 : 40}
              className="w-12 h-12 rounded-full object-cover" // Larger size for the top saver
            />
            <span className="text-base font-product-sans">
              {saver.firstName}
            </span>
            <div className="flex-grow" /> {/* Push trophies to the end */}
            {index === 0 && <FaTrophy className="text-yellow-500" />}
            {index === 1 && <FaTrophy className="text-gray-400" />}
            {index === 2 && <FaTrophy className="text-orange-500" />}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopSaversSection;
