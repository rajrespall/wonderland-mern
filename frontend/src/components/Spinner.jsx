import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "#0457a4" }} size={60} thickness={4} />
    </Box>
  );
};

export default Spinner;