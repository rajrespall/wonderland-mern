import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Card, Typography, Box, Chip, Divider, Rating, Paper } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/poppins";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedIcon from '@mui/icons-material/Verified';
import SchoolIcon from '@mui/icons-material/School';

// Keep your existing styled components
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
  position: "relative",
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

const VerifiedBadge = styled(Box)({
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "50%",
  padding: "5px",
  boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
});

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: "170px",
  left: "10px",
  backgroundColor: "rgba(5, 87, 164, 0.9)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "0.7rem",
}));

// New background-related styled components
const PageBackground = styled(Box)({
  position: 'relative',
  backgroundImage: `
    linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,247,252,0.95) 100%)
  `,
  backgroundSize: 'cover',
  paddingTop: '40px',
  paddingBottom: '60px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 20%, rgba(4, 87, 164, 0.03) 0%, transparent 25%),
      radial-gradient(circle at 80% 60%, rgba(93, 168, 2, 0.03) 0%, transparent 30%)
    `,
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(4, 87, 164, 0.01) 20px, rgba(4, 87, 164, 0.01) 21px),
      repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(4, 87, 164, 0.01) 20px, rgba(4, 87, 164, 0.01) 21px)
    `,
    zIndex: -1,
  },
});

const HeaderPaper = styled(Paper)({
  padding: '20px 30px',
  marginBottom: '30px',
  borderRadius: '10px',
  borderLeft: '4px solid #0457a4',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '150px',
    height: '100%',
    backgroundImage: 'linear-gradient(135deg, transparent 0%, rgba(93, 168, 2, 0.06) 100%)',
  }
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

  // Generate random rating for demo purposes
  const getRandomRating = () => (5).toFixed(1);
  
  // Sample categories for demonstration
  const categories = ["Special Education", "Therapy Center", "Educational Center", "Research Institute"];

  return (
    <PageBackground>
      <Container sx={{ width: "1050px" }}>
        <HeaderPaper elevation={0}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <SchoolIcon sx={{ color: "#0457a4", mr: 2, fontSize: 28 }} />
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: "Poppins", 
                fontWeight: 600,
                color: "#2c3e50",
                display: "inline-block",
                position: "relative"
              }}
            >
              Accredited Institutions
              <Box 
                sx={{ 
                  position: "absolute",
                  width: "30%",
                  height: "4px",
                  bottom: "-8px",
                  left: 0,
                  backgroundColor: "#5da802",
                  borderRadius: "2px"
                }} 
              />
            </Typography>
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: "Poppins",
              color: "#7f8c8d",
              mt: 3,
              maxWidth: "80%"
            }}
          >
            Browse our selection of trusted educational institutions specializing in programs for children with special needs. Each institution has been thoroughly vetted to ensure quality service and professional care.
          </Typography>
          
          <Box sx={{ display: "flex", mt: 2 }}>
            <Chip 
              label={`${institutions.length} Institutions Found`}
              sx={{ 
                backgroundColor: "rgba(4, 87, 164, 0.08)",
                color: "#0457a4",
                fontWeight: 500,
              }}
            />
          </Box>
        </HeaderPaper>
        
        <Grid container spacing={4}>
          {institutions.map((institution) => {
            const randomRating = getRandomRating();
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            
            return (
              <Grid item xs={12} sm={6} md={4} key={institution._id}>
                <InstitutionCard onClick={() => handleCardClick(institution._id)}>
                  <Box sx={{ position: "relative" }}>
                    <InstitutionImage
                      src={institution.institutionImage || "https://via.placeholder.com/400x200?text=Institution"}
                      alt={institution.name}
                    />
                    <VerifiedBadge>
                      <VerifiedIcon sx={{ color: "#0457a4" }} />
                    </VerifiedBadge>
                    <CategoryChip 
                      label={randomCategory} 
                      size="small" 
                    />
                  </Box>
                  
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
                    
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Rating value={parseFloat(randomRating)} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" sx={{ ml: 1, color: "#7f8c8d" }}>
                        {randomRating}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ width: "100%", my: 1.5 }} />
                    
                    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                      <LocationOnIcon sx={{ color: "#7f8c8d", fontSize: 18, mt: 0.3, mr: 1 }} />
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
                    </Box>
                    
                    {institution.phone && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PhoneIcon sx={{ color: "#7f8c8d", fontSize: 18, mr: 1 }} />
                        <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                          {institution.phone || "Contact available on details page"}
                        </Typography>
                      </Box>
                    )}
                  </InstitutionTitle>
                  
                  <Box sx={{ 
                    p: 2, 
                    pt: 0, 
                    display: "flex", 
                    justifyContent: "space-between",
                    borderTop: "1px dashed #eaeaea"
                  }}>
                    <Chip 
                      label="View Details" 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        borderColor: "#0457a4", 
                        color: "#0457a4",
                        "&:hover": { backgroundColor: "rgba(4, 87, 164, 0.08)" }
                      }} 
                    />
                    <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
                      ID: {institution._id?.substring(0, 8) || "N/A"}
                    </Typography>
                  </Box>
                </InstitutionCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </PageBackground>
  );
}