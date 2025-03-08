import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Card, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/poppins";
import ins1 from "../../../assets/institutions1.jpg";

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
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/institutions'); // Update the URL to match your backend
        console.log('API Response:', response.data); // Log the API response
        setInstitutions(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('API Error:', err); // Log any errors
        setError(err.response ? err.response.data.message : "Error fetching institutions");
      }
    };

    fetchInstitutions();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/institutions/${id}`);
  };

  if (error) {
    return (
      <Container sx={{ py: 4, width: "1050px" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, width: "1050px" }}>
      <Grid container spacing={4}>
        {institutions.map((institution) => (
          <Grid item xs={12} sm={6} md={4} key={institution._id}>
            <InstitutionCard onClick={() => handleCardClick(institution._id)}>
              <img
                src={institution.institutionImage}
                alt={institution.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <InstitutionTitle bgcolor='white'>
                {institution.name}
                <Typography component="span" sx={{ color: "yellow", fontSize: "12px", fontFamily: "Poppins" }}>
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