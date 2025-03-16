import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import autism from '../../../assets/autismElements/6.png';

const HeroSection = () => {
  return (
    <Box sx={{ backgroundColor: "transparent", py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", mr: 15}}>
              <img
                src={autism}
                alt="Hero Illustration"
                style={{ maxWidth: "100%", width: 500 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Typography variant="subtitle1" sx={{ color: "#0457a4", textTransform: "uppercase" }}>
              Learn how improve the commuincation skills and more!
            </Typography> */}
            <Typography
              sx={{
                color: "white",
                fontWeight: "400",
                fontFamily: 'Poppins',
                fontSize: '70px',
                backgroundImage: "linear-gradient(to bottom right, #0457a4, #5da802)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Recommended Institutions
            </Typography>
            <Typography sx={{ color: "#0457a4", mt: 2 }}>
            Access valuable resources tailored to high-priority areas, determined through comprehensive evaluations to maximize effectiveness and results
            </Typography>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
