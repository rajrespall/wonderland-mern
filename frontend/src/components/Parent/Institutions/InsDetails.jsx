import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function InstitutionCard({ title, description, address, mapEmbed }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, 
        borderRadius: 3,
        p: 3,
        bgcolor: "#eaf3f9",
        boxShadow: 'none',
        height: "400px",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "45%" }, 
          height: '100%',
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: 'none',
        }}
      >
        <iframe
          src={mapEmbed}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

      <CardContent
        sx={{
          ml: { md: 3 },
          textAlign: { xs: "center", md: "left" },
          width: { xs: "100%", md: "55%" },
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#5da802"
        sx={{
          fontFamily: "Poppins"
        }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "#336699", fontFamily: "Poppins" }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "#336699", fontWeight: "bold", fontFamily: "Poppins" }}>
          📍 {address}
        </Typography>
      </CardContent>
    </Card>
  );
}
