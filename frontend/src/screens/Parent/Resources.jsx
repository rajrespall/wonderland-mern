import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia, Button, CssBaseline, IconButton, Container } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import NavigationBar from "../../components/NavigationBar";
import HeroSection from "../../components/Parent/Resources/HeroSection";
import Spinner from "../../components/Spinner";

import rou from "../../assets/resources2.png";
import com from "../../assets/resources1.png";
import soc from "../../assets/resources3.png";
import sen from "../../assets/resources4.png";
import emo from "../../assets/emotional.jpg";

const cardData = [
  { title: "Improve Communication Skills", description: "Enhance your child's verbal and non-verbal communication.", image: com, color: "#0457a4", type: "communication" },
  { title: "Boost Their Social Interaction", description: "Help your child build better social skills and connections.", image: soc, color: "#5da802", type: "social" },
  { title: "Manage Sensory Sensitivities", description: "Techniques to support sensory processing challenges.", image: sen, color: "#b80201", type: "sensory" },
  { title: "Emotional Regulation Strategies", description: "Learn ways to manage emotions and reduce anxiety.", image: emo, color: "#f4900c", type: "emotional" },
  { title: "Establish Healthy Routines", description: "Create structured and comfortable daily routines.", image: rou, color: "#5829c0", type: "routines" }
];

const Resources = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner />;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
      if (scrollContainerRef.current.scrollLeft <= 0) {
        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
      if (scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth >= scrollContainerRef.current.scrollWidth) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: "rgba(4, 87, 164, 0.1)", minHeight: "100vh", overflowX: "hidden" }}>
        <NavigationBar />
        <Container sx={{ py: 4, display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1, pr: 5 }}>
            <HeroSection />
          </Box>
          <Box sx={{ flex: 1, position: "relative", mb: 20, overflow: "hidden" }}>
            <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
              <IconButton onClick={scrollLeft} sx={{ position: "absolute", left: -50, zIndex: 1 }}>
                <ArrowBackIos />
              </IconButton>
              <Box
                ref={scrollContainerRef}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                  gap: 2,
                  width: "100%",
                  maxWidth: "600px",
                  padding: "10px 0",
                  "&::-webkit-scrollbar": { display: "none" }
                }}
              >
                {cardData.map((card) => (
                  <InfoCard key={card.type} data={card} />
                ))}
              </Box>
              <IconButton onClick={scrollRight} sx={{ position: "absolute", right: -50, zIndex: 1 }}>
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const InfoCard = ({ data }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/resources/${data.type}`);
  };

  return (
    <Card 
      sx={{ 
        minWidth: 300, 
        height: 400,
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        padding: 3, 
        borderRadius: 3, 
        boxShadow: 3, 
        backgroundColor: data.color, 
        transition: "all 0.3s ease-in-out", 
        '&:hover': { transform: "scale(1.05)", boxShadow: 6 }
      }}
    >
      <CardMedia component="img" sx={{ width: 120, height: 120, borderRadius: 2, marginBottom: 2 }} image={data.image} alt={data.title} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography fontWeight="bold" color="#fcf230" sx={{ fontFamily: "Poppins", fontSize: "18px", mb: 2 }}>
          {data.title}
        </Typography>
        <Typography color="white" sx={{ fontFamily: "Poppins", fontSize: "12px" }}>
          {data.description}
        </Typography>
      </CardContent>
      <Button variant="contained" sx={{ backgroundColor: "#fcf230", color: "#000", marginTop: 2 }} onClick={handleClick}>
        Learn More
      </Button>
    </Card>
  );
};

export default Resources;
