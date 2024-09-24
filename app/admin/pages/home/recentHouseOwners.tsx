import React from "react";
import Subtitle from "@/app/components/subtitle";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import Section from "@/app/components/section";

const RecentHouseOwners = () => {
  return (
    <div>
      <Section className="text-sm uppercase font-semibold text-gray-500">
        Recent House Owners
      </Section>
      <div
        className="flex justify-center items-center text-gray-500 h-full"
        style={{ minHeight: "250px" }}
      >
        {/* <CircularProgress size={24} className="mr-2" /> */}
        <Subtitle>New property owners will show up here...</Subtitle>
      </div>{" "}
    </div>
  );
};

export default RecentHouseOwners;
