import React from "react";
import { Box, Button, Typography, Container, Paper, Card, CardMedia, CssBaseline } from "@mui/material";
import Background from "../assets/bg_getstarted.png";
import Logo from "../assets/logo_red.png"; 
import Squirrel from "../assets/sq_twohands.png"; 
import Image from '../assets/getstarted.png';


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
        padding: 8,
      }}
    >
      <Box component="img" src={Logo} alt="Logo" sx={{ width: "500px", mb: 2 }} />

      <Box component="img" src={Squirrel} alt="Squirrel" sx={{ width: "250px", position: 'absolute', mt: '225px', marginRight: '540px'}} />
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "400px",
          padding: "40px",
          borderRadius: "20px",
          backgroundColor: "white",
          height: '400px',
        }}
      >

        <Box>
        <Card 
          sx={{
            backgroundColor:'transparent',
            boxShadow: 'none',
            width: '280px',
            mt: '15px',
            ml: '20px'}}>
          <CardMedia component="img" image={Image} alt="Get Started" />
        </Card>
          <Typography 
            variant="body1"
            sx={{
              color: "#0457a4",
              marginBottom: "15px",
              marginTop: '40px',
              fontSize: '16px',
              fontFamily: 'Poppins',
              textAlign: 'justify' }}>
                Every child is unique, and we’re here to support their journey! Answer a quick assessment about your child’s background, behavior, symptoms, and preferences. This helps us provide personalized resources, activities, and insights tailored to their needs.           </Typography>

          <Button
            href="/assessment"
            variant="contained"
            sx={{
              textTransform: 'none',
              fontFamily: 'Poppins',
              fontSize: '13px',
              backgroundColor: "#5da802",
              color: "#fcf230",
              borderRadius: "20px",
              width: '200px',
              padding: "10px 20px",
              marginTop: '20px',
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
