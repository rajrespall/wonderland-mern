import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { BookOpen, FileText, BrainCircuit } from "lucide-react"; 

const HeroSection = () => {
  return (
    <Box sx={{ py: 10, height: "100vh" }}>
      <Container maxWidth="lg" >
          
            <Typography
              sx={{
                mt: 5,
                fontFamily: 'Luckiest Guy',
                fontSize: '100px',
                textAlign: 'left',
                backgroundImage: "linear-gradient(to bottom right, #0457a4, #5da802)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              Resources
            </Typography>

            <Typography 
              sx={{ 
                color: "#0457a4", 
                mt: 2, 
                fontSize: '18px', 
                fontFamily: 'Poppins', 
                textAlign: 'left' 
              }}
            >
              Access valuable resources tailored to high-priority areas, determined through comprehensive evaluations to maximize effectiveness and results.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BookOpen size={30} color="#ff7eb3" />
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Guides</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FileText size={30} color="#5da802" />
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Documents</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BrainCircuit size={30} color="#ffcc00" />
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Learning</Typography>
              </Box>
            </Box>

      </Container>
    </Box>
  );
};

export default HeroSection;
