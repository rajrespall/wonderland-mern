import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import autism from '../../../assets/autismElements/6.png';

const HeroSection = () => {
  return (
    <Box sx={{ backgroundColor: "transparent", py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            {/* <Typography variant="subtitle1" sx={{ color: "#0457a4", textTransform: "uppercase" }}>
              Learn how improve the commuincation skills and more!
            </Typography> */}
            <Typography
              sx={{
                color: "white",
                fontWeight: "400",
                fontFamily: 'Poppins',
                fontSize: '100px',
                backgroundImage: "linear-gradient(to bottom right, #0457a4, #5da802)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Resources
            </Typography>
            <Typography sx={{ color: "#0457a4", mt: 2 }}>
            Access valuable resources tailored to high-priority areas, determined through comprehensive evaluations to maximize effectiveness and results
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  width: '200px',
                  backgroundColor: '#5da802',
                  borderColor: '#5da802',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Poppins',
                  textTransform: 'none',
                  height: '50px',
                  color: '#fcf230',
                  '&:hover': {
                    color: '#5da802',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}
              >
                Browse Resources
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", ml: 10 }}>
              <img
                src={autism}
                alt="Hero Illustration"
                style={{ maxWidth: "100%", width: 500 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
