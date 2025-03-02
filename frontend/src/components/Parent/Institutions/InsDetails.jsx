import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function InstitutionCard({ title, description, imageUrl, address }) {
  return (
    <Card sx={{ display: "flex", borderRadius: 3, p: 2, bgcolor: "#eaf3f9" }}>
      <CardMedia
        component="img"
        sx={{ width: 350, height: 250, borderRadius: 3 }}
        image={imageUrl}
        alt={title}
      />
      <CardContent sx={{ ml: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="green">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
          📍 {address}
        </Typography>
      </CardContent>
    </Card>
  );
}
