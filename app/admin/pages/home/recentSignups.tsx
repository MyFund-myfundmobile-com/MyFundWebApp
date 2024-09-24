import React, { useState, useEffect } from "react";
import { fetchUserInfo } from "@/app/Redux store/actions";
import { AppDispatch } from "@/app/Redux store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/Redux store/store";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { Img } from "react-image";
import Subtitle from "@/app/components/subtitle";

const RecentSignups: React.FC<{
  onRangeUpdate: (label: string, count: number) => void;
}> = ({ onRangeUpdate }) => {
  const allUsers = useSelector((state: RootState) => state.auth.allUsers) || [];
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<string>("weekly"); // Default to weekly

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token) as any);
      console.log("Fetching user info...");
      setLoading(false);
    }
  }, [dispatch, token]);

  // Updated helper function to parse date and time format "21 Sep. 2024 | 05:39PM"
  const parseUserDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split("|").map((part) => part.trim());
    const [day, month, year] = datePart.split(" ");

    const monthIndex = new Date(`${month} 1, 2000`).getMonth(); // Get month index
    const parsedDate = new Date(Number(year), monthIndex, Number(day));

    return { parsedDate, timePart }; // Return both date and time
  };

  const filterUsersByDateRange = (range: string) => {
    const now = new Date();
    const filteredUsers = allUsers.filter((user) => {
      const { parsedDate } = parseUserDate(user.date_joined);
      let rangeStart: Date;
      switch (range) {
        case "daily":
          rangeStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          break;
        case "weekly":
          rangeStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 7
          );
          break;
        case "monthly":
          rangeStart = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
          );
          break;
        case "quarterly":
          rangeStart = new Date(
            now.getFullYear(),
            now.getMonth() - 3,
            now.getDate()
          );
          break;
        case "last6months":
          rangeStart = new Date(
            now.getFullYear(),
            now.getMonth() - 6,
            now.getDate()
          );
          break;
        case "lastYear":
          rangeStart = new Date(
            now.getFullYear() - 1,
            now.getMonth(),
            now.getDate()
          );
          break;
        default:
          return false;
      }
      return parsedDate >= rangeStart;
    });

    console.log(`Fetched ${allUsers.length} users.`);
    console.log(
      `Filtered ${filteredUsers.length} users for the ${range} range.`
    );

    onRangeUpdate(range, filteredUsers.length);
    return filteredUsers;
  };

  const newUsers = filterUsersByDateRange(dateRange)
    .sort(
      (a, b) =>
        parseUserDate(b.date_joined).parsedDate.getTime() -
        parseUserDate(a.date_joined).parsedDate.getTime()
    )
    .slice(0, 5);

  const count = newUsers.length;

  return (
    <div className="flex flex-col">
      <FormControl
        variant="outlined"
        className="mb-4"
        style={{ backgroundColor: "white" }}
      >
        <InputLabel>NEW USERS</InputLabel>
        <Select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          label="Date Range"
          startAdornment={
            <InputAdornment position="start">
              <div
                style={{
                  backgroundColor: "#4c28Bc",
                  color: "white",
                  borderRadius: "50%",
                  padding: "5px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {count}
              </div>
            </InputAdornment>
          }
        >
          <MenuItem value="daily">TODAY</MenuItem>
          <MenuItem value="weekly">THIS WEEK</MenuItem>
          <MenuItem value="monthly">THIS MONTH</MenuItem>
          <MenuItem value="quarterly">THE LAST 4 MONTHS</MenuItem>
          <MenuItem value="last6months">THE LAST 6 MONTHS</MenuItem>
          <MenuItem value="lastYear">THE LAST 1 YEAR</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : newUsers.length === 0 ? (
        <div
          className="flex justify-center items-center text-gray-500 h-full"
          style={{ minHeight: "250px" }}
        >
          <CircularProgress size={24} className="mr-2" />
          <Subtitle>New users will show up here...</Subtitle>
        </div>
      ) : (
        newUsers.map((user, index) => {
          const { parsedDate, timePart } = parseUserDate(user.date_joined);
          return (
            <div
              key={user.id}
              className="flex mt-2 items-center justify-between bg-white rounded-lg p-2 mb-2 transition-colors duration-300 hover:bg-gray-100 text-sm"
            >
              {/* Profile Picture
              <Img
                alt={`${user.first_name} ${user.last_name}`}
                src={user.profile_picture || "/Profile1.png"}
                className="w-14 h-14 rounded-full border border-gray-300"
              /> */}

              <Img
                src={user.profile_picture || `/images/Profile1.png`}
                alt={user.profile_picture}
                width={index === 0 ? 50 : 40}
                height={index === 0 ? 50 : 40}
                className="w-12 h-12 rounded-full object-cover border border-gray-500"
              />

              {/* Name, Email, and Phone Number */}
              <div className="flex-1 ml-3">
                <div
                  className="text-sm font-semibold"
                  style={{
                    marginBottom: -2,
                    marginTop: -3,
                    fontSize: 20,
                    color: "#4c28BC",
                    fontFamily: "Karla",
                    letterSpacing: "-1.5px",
                  }}
                >
                  {user.first_name} {user.last_name}
                </div>
                <div
                  className="text-xs text-gray-400 mt-1"
                  style={{
                    fontSize: 13,
                    fontFamily: "Karla",
                    letterSpacing: "-1px",
                  }}
                >
                  <div>{user.email}</div> {/* Email on top */}
                  <div
                    style={{
                      fontSize: 12,
                      color: "#4c28BC",
                      fontFamily: "Karla",
                      marginTop: 4, // Added spacing between email and phone number
                      letterSpacing: "-1px",
                    }}
                  >
                    {user.phone_number}
                  </div>{" "}
                </div>
              </div>

              {/* Date and Time */}
              <div className="text-right">
                <span className="text-gray-600">
                  {parsedDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <br />
                <span className="text-gray-500 text-xs">{timePart}</span>
              </div>
            </div>
          );
        })
      )}
      <div
        className="text-center bg-white"
        style={{
          marginTop: -7,
          marginBottom: 5,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <a
          href="#"
          className="text-sm uppercase font-semibold text-gray-500"
          style={{
            display: "inline-block", // Ensure it behaves like a block for padding
            lineHeight: "1.5", // Add line height to center text vertically within padding
            paddingTop: 5,
            paddingBottom: 5,
          }}
          //   onClick={openModal}
        >
          View All USERS
        </a>
      </div>
    </div>
  );
};

export default RecentSignups;
