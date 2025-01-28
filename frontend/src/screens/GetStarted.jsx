import React from "react";
import { Box, Button, Typography, Container, Paper, CssBaseline } from "@mui/material";
import Background from "../assets/bg_getstarted.png";
import Logo from "../assets/logo_red.png"; 
import Squirrel from "../assets/sq_twohands.png"; 

const GetStarted = () => {
  return (
    <>
    <CssBaseline />
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        padding: 10,
      }}
    >
      <Box component="img" src={Logo} alt="Logo" sx={{ width: "500px", mb: 2 }} />

      <Box component="img" src={Squirrel} alt="Squirrel" sx={{ width: "250px", marginRight: "20px", position: 'absolute', mt: '225px', marginRight: '540px'}} />
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "white",
          height: '400px'
        }}
      >

        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5da802", mt: '10px' }}>
            LET’S GET STARTED!
          </Typography>
          <Typography variant="body1" sx={{ color: "black", marginBottom: "15px", marginTop: '40px' }}>
            Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed. Now that your eyes are open, make the sun jealous with your .
          </Typography>

          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              fontFamily: 'Poppins',
              fontSize: '14px',
              backgroundColor: "#5da802",
              color: "#fcf230",
              borderRadius: "20px",
              width: '200px',
              padding: "10px 20px",
              marginTop: '90px',
              fontWeight: "bold",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Paper>
    </Box>
    </>

  );
};

export default GetStarted;
