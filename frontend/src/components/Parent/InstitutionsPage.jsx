import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/poppins"
import ins1 from "../../assets/institutions1.jpg";

const institutions = [
  { id: 1, name: "INSTITUTION 1", color: "#0057b8" },
  { id: 2, name: "INSTITUTION 2", color: "#6cbf2e" },
  { id: 3, name: "INSTITUTION 3", color: "#eb690a" },
  { id: 4, name: "INSTITUTION 4", color: "#ff66c4" },
  { id: 5, name: "INSTITUTION 5", color: "#5a1ebf" },
  { id: 6, name: "INSTITUTION 6", color: "#d71d1d" },
];

const InstitutionCard = styled(Card)(({ theme, bgcolor }) => ({
  borderRadius: "10px",
  overflow: "hidden",
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
}));

const InstitutionTitle = styled(Typography)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  color: "#fff",
  padding: "10px",
  fontWeight: "bold",
  fontSize: "16px",
}));

export default function InstitutionsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {institutions.map((institution) => (
          <Grid item xs={12} sm={6} md={4} key={institution.id}>
            <InstitutionCard>
              <img
                src={ins1}
                alt={institution.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <InstitutionTitle bgcolor={institution.color}>
                {institution.name}
                <Typography 
                sx={{
                    color: "yellow",
                    fontSize: "12px",   
                    fontFamily: 'Poppins'
                }}>
                  INSTITUTION NAME AND DESC 
                </Typography>
              </InstitutionTitle>
            </InstitutionCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
