import React from "react";
import { Card, CardContent, Typography, Box, Divider, Chip, Grid, Paper } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

export default function InstitutionCard({ title, description, address, mapEmbed}) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, 
        borderRadius: 3,
        p: 0,
        bgcolor: "#ffffff",
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        height: "auto",
        minHeight: "400px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative accent in corner */}
      <Box sx={{ 
        position: "absolute", 
        top: 0, 
        right: 0, 
        width: "150px", 
        height: "150px", 
        background: "radial-gradient(circle at top right, rgba(93, 168, 2, 0.05), transparent 70%)",
        zIndex: 0,
      }} />
      
      <Box sx={{ 
        position: "absolute", 
        bottom: 0, 
        left: 0, 
        width: "120px", 
        height: "120px", 
        background: "radial-gradient(circle at bottom left, rgba(4, 87, 164, 0.05), transparent 70%)",
        zIndex: 0,
      }} />

      {/* Map section */}
      <Box
        sx={{
          height: '70vh',
          width: '50%',
          borderRadius: { xs: "0", md: "10px 0 0 10px" },
          overflow: "hidden",
          boxShadow: 'none',
          position: "relative",
        }}
      >
        <iframe
          src={mapEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        <Box sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "4px",
          py: 0.5,
          px: 1,
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <LocationOnIcon sx={{ color: "#0457a4", fontSize: 18, mr: 0.5 }} />
          <Typography variant="caption" sx={{ fontWeight: 500, fontFamily: "Poppins" }}>
            Interactive Map
          </Typography>
        </Box>
      </Box>

      {/* Content section */}
      <CardContent
        sx={{
          ml: { md: 0 },
          p: 4,
          textAlign: { xs: "center", md: "left" },
          width: { xs: "100%", md: "55%" },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1, justifyContent: { xs: "center", md: "flex-start" } }}>
          <Chip 
            icon={<VerifiedIcon />} 
            label="Verified Institution" 
            size="small"
            sx={{ 
              backgroundColor: "rgba(93, 168, 2, 0.1)", 
              color: "#5da802", 
              fontWeight: 500,
              mb: 1
            }}
          />
        </Box>
        
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{
            fontFamily: "Poppins",
            color: "#2c3e50",
            mb: 2,
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: "60px",
              height: "3px",
              backgroundColor: "#5da802",
              borderRadius: "2px",
            }
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 3, 
            color: "#4a5568", 
            fontFamily: "Poppins", 
            lineHeight: 1.7,
            mb: 3,
          }}
        >
          {description}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
            <Paper elevation={0} sx={{ 
              p: 2, 
              display: "flex", 
              alignItems: "flex-start",
              backgroundColor: "rgba(4, 87, 164, 0.03)",
              borderRadius: 2
            }}>
              <LocationOnIcon sx={{ color: "#0457a4", mr: 1, mt: 0.5 }} />
              <Box>
                <Typography variant="overline" sx={{ color: "#0457a4", fontWeight: "bold", lineHeight: 1 }}>
                  ADDRESS
                </Typography>
                <Typography variant="body2" sx={{ color: "#4a5568" }}>
                  {address}
                </Typography>
              </Box>
            </Paper>
      </CardContent>
    </Card>
  );
}