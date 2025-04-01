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
      <Box sx={{ backgroundColor: "rgba(4, 87, 164, 0.1)", height: "100vh", overflow: "hidden" }}>
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
  
  return (
    <Card 
      sx={{ 
        minWidth: 380,
        height: 480,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: `linear-gradient(165deg, 
          ${data.color}ff 0%, 
          ${data.color}dd 45%,
          ${data.color}cc 100%)`,
        borderRadius: "30px",
        padding: "20px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
        overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: `0 10px 40px ${data.color}40`,
        '&::before': {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)
          `,
          zIndex: 1,
          pointerEvents: "none",
        },
        '&:hover': {
          transform: "translateY(-16px) scale(1.02)",
          boxShadow: `
            0 30px 60px ${data.color}40,
            0 0 40px ${data.color}30,
            inset 0 0 80px rgba(255,255,255,0.08)
          `,
          '& .card-media': {
            transform: "scale(1.08) rotate(-2deg)",
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          },
          '& .explore-btn': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          }
        }
      }}
    >
      

      {/* Main Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <CardMedia 
          component="img"
          className="card-media"
          sx={{
            width: 160,
            height: 160,
            margin: "10px auto",
            borderRadius: "24px",
            padding: "12px",
            backgroundColor: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))"
          }}
          image={data.image}
          alt={data.title}
        />

        <CardContent sx={{ textAlign: "center", padding: "24px 16px" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "24px",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.15)",
              letterSpacing: "0.5px",
              lineHeight: 1.3
            }}
          >
            {data.title}
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "15px",
              fontFamily: 'Poppins',
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: "90%",
              margin: "0 auto 24px"
            }}
          >
            {data.description}
          </Typography>

          {/* Feature Tags */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["Expert Tips", "Resources", "Activities"].map((tag) => (
              <Box
                key={tag}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(5px)",
                  padding: "6px 16px",
                  borderRadius: "15px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#fff",
                    fontWeight: 500,
                    letterSpacing: "0.5px"
                  }}
                >
                  {tag}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Box>

      {/* Action Button */}
      <Button
        className="explore-btn"
        onClick={() => navigate(`/resources/${data.type}`)}
        sx={{
          mt: "auto",
          backgroundColor: "#ffffff",
          color: data.color,
          padding: "12px 32px",
          borderRadius: "30px",
          fontSize: "15px",
          fontWeight: 700,
          fontFamily: 'Poppins',
          textTransform: "none",
          letterSpacing: "0.5px",
          transition: "all 0.4s ease",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          '&:hover': {
            backgroundColor: "#fcf230",
            transform: "translateY(-2px)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.2)"
          }
        }}
      >
        Explore Resources
      </Button>
    </Card>
  );
};

export default Resources;
