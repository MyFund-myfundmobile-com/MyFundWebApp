import React from "react";
import { Box } from "@mui/material";

// Modify the prop type to include React.PropsWithChildren
const SettingsExtension: React.FC<
  React.PropsWithChildren<{ selectedMenu: string }>
> = ({ selectedMenu, children }) => {
  return (
    <Box
      className="border bg-white rounded-lg p-2 animate-floatIn "
      sx={{ boxShadow: 3 }} // Material-UI shadow level 3
    >
      {children}
    </Box>
  );
};

export default SettingsExtension;
