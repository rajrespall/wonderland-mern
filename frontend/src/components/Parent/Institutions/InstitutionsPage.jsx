import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/poppins";

const InstitutionCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
  },
}));

const InstitutionTitle = styled(Box)({
  padding: "16px",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flexGrow: 1,
});

const InstitutionImage = styled("img")({
  width: "100%", 
  height: "200px", 
  objectFit: "cover",
  borderBottom: "1px solid #eaeaea",
});

export default function InstitutionsPage() {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/institutions');
        console.log('API Response:', response.data); 
        setInstitutions(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('API Error:', err); 
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
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontFamily: "Poppins", 
          fontWeight: 600,
          color: "#333" 
        }}
      >
      </Typography>
      <Grid container spacing={4}>
        {institutions.map((institution) => (
          <Grid item xs={12} sm={6} md={4} key={institution._id}>
            <InstitutionCard onClick={() => handleCardClick(institution._id)}>
              <InstitutionImage
                src={institution.institutionImage || "https://via.placeholder.com/400x200?text=Institution"}
                alt={institution.name}
              />
              <InstitutionTitle>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: "#2c3e50", 
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    mb: 1,
                    textAlign: "left"
                  }}
                >
                  {institution.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#7f8c8d", 
                    fontFamily: "Poppins",
                    textAlign: "left"
                  }}
                >
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