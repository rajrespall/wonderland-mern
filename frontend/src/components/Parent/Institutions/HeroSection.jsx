import React from "react";
import { Box, Container, Grid, Typography, Paper, Divider } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import autism from '../../../assets/autismElements/6.png';

const HeroSection = () => {
  return (
    <Box 
    >
      <Container maxWidth="xl">
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            border: "1px solid #eaeaea",
          }}
        >
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  textAlign: "center", 
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: "-20px",
                    top: "50%",
                    height: "70%",
                    width: "1px",
                    backgroundColor: "#e0e0e0",
                    transform: "translateY(-50%)"
                  }
                }}
              >
                <img
                  src={autism}
                  alt="Educational Resources"
                  style={{ 
                    maxWidth: "90%", 
                    width: 450,
                    filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.1))",
                    borderRadius: "8px"
                  }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ pl: { xs: 0, md: 4 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <SchoolIcon sx={{ color: "#0457a4", mr: 1 }} />
                  <Typography variant="subtitle1" sx={{ 
                    color: "#0457a4", 
                    textTransform: "uppercase",
                    fontWeight: 600,
                    letterSpacing: 1
                  }}>
                    Professional Resources
                  </Typography>
                </Box>
                
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontFamily: 'Poppins',
                    fontSize: { xs: '40px', md: '60px', lg: '70px' },
                    lineHeight: 1.2,
                    backgroundImage: "linear-gradient(to bottom right, #0457a4, #5da802)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    mb: 3
                  }}
                >
                  Recommended Institutions
                </Typography>
                
                <Divider sx={{ mb: 3, width: "60px", borderColor: "#5da802", borderWidth: 2 }} />
                
                <Typography sx={{ 
                  color: "#2a2a2a", 
                  mt: 2,
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  fontFamily: "Georgia, serif"
                }}>
                  Access valuable resources tailored to high-priority areas, determined through 
                  comprehensive evaluations to maximize effectiveness and results. Our carefully 
                  vetted selection of institutions meets rigorous quality standards.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default HeroSection;