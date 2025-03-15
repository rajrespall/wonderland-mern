import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import Spinner from "../components/Spinner";
import Feedback from "../components/Feedback";
import NavigationBar from "../components/NavigationBar";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400); 
  }, []);

  if (loading) {
    return <Spinner />; 
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: 'rgba(4, 87, 164, 0.1)',
        }}
      >
        <NavigationBar />
        <Feedback />
      </Box>
    </>
  );
};

export default AboutUs;