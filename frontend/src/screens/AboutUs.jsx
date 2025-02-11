import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, AppBar, Toolbar, CssBaseline } from "@mui/material";
import Logo from "../assets/logo_red.png"; 
import Spinner from "../components/Spinner";
import Feedback from "../components/Feedback";

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        
        <AppBar 
        position="static" 
        sx={{ 
          width: '95%',
          marginTop: '20px',
          backgroundColor: "rgba(176, 200, 227, 0.2)",
          boxShadow: "none",
          borderRadius: '40px' }}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: 3,
            }}
          >
            <Box>
              <img src={Logo} alt="Wonderland Logo" style={{ height: "35px" }} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Button
                sx={{
                  fontWeight: 'bold', 
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  color: "#0457a4",
                  "&:hover": { color: "#fcf230" },
                 }}
              >
                Institutions
              </Button>
              <Button
                sx={{
                  fontWeight: 'bold', 
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  color: "#0457a4",
                  "&:hover": { color: "#fcf230" },
                }}
              >
                About Us
              </Button>
             
            </Box>
          </Toolbar>
        </AppBar>
       
        <Feedback />
      </Box>
    </>
  );
};

export default AboutUs;
