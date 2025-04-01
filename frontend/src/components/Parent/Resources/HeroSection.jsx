import React from "react";
import { Box, Button, Container, Typography, Paper, Divider } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

const HeroSection = () => {
  return (
    <Box sx={{ py: 10, height: "100vh" }}>
      <Container maxWidth="lg" >
      <Paper 
          elevation={0}
          sx={{
            borderRadius: 2,
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            border: "1px solid #eaeaea",
          }}
        >
              <Box sx={{ pl: { xs: 0, md: 4 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <SchoolIcon sx={{ color: "#0457a4", mr: 1 }} />
                  <Typography variant="subtitle1" sx={{ 
                    color: "#0457a4", 
                    textTransform: "uppercase",
                    fontWeight: 600,
                    letterSpacing: 1
                  }}>
                    Learning Naterials and Resources
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
                  Recommended Resources
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
        </Paper>
      </Container>
    </Box>
  );
};

export default HeroSection;
