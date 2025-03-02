import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/poppins";
import ins1 from "../../../assets/institutions1.jpg";

const institutions = [
  { id: 1, name: "TUP - TAGUIG", color: "#0057b8", address: "Taguig, Metro Manila, Philippines" },
  { id: 2, name: "INSTITUTION 2", color: "#6cbf2e", address: "Makati, Metro Manila, Philippines" },
  { id: 3, name: "INSTITUTION 3", color: "#eb690a", address: "Quezon City, Metro Manila, Philippines" },
  { id: 4, name: "INSTITUTION 4", color: "#ff66c4", address: "Pasig, Metro Manila, Philippines" },
  { id: 5, name: "INSTITUTION 5", color: "#5a1ebf", address: "Mandaluyong, Metro Manila, Philippines" },
  { id: 6, name: "INSTITUTION 6", color: "#d71d1d", address: "Caloocan, Metro Manila, Philippines" },
];

const InstitutionCard = styled(Card)(({ bgcolor }) => ({
  borderRadius: "5px",
  overflow: "hidden",
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const InstitutionTitle = styled(Typography)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  color: "#fff",
  padding: "10px",
  fontWeight: "bold",
  fontSize: "16px",
}));

export default function InstitutionsPage() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/institutions/${id}`); 
  };

  return (
    <Container sx={{ py: 4, width: "1050px" }}>
      <Grid container spacing={4}>
        {institutions.map((institution) => (
          <Grid item xs={12} sm={6} md={4} key={institution.id}>
            <InstitutionCard onClick={() => handleCardClick(institution.id)}>
              <img
                src={ins1}
                alt={institution.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <InstitutionTitle bgcolor={institution.color}>
                {institution.name}
                <Typography sx={{ color: "yellow", fontSize: "12px", fontFamily: "Poppins" }}>
                  {institution.address}
                </Typography>
              </InstitutionTitle>
            </InstitutionCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
