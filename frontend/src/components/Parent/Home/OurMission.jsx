import React, { useState } from 'react';
import { Box, Typography, Container, IconButton, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MissionIcon from '../../../assets/otherElements/Mission.png';
import VisionIcon from '../../../assets/otherElements/Vision.png';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  position: 'relative',
  background: 'linear-gradient(135deg, #1a3a54 0%, #0457a4 100%)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  margin: '32px auto',
  minHeight: '70vh'
}));

const TextSection = styled(Box)({
  maxWidth: '60%',
  position: 'relative',
  padding: '2.5rem',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-5px)',
  }
});

const ImageWrapper = styled(Paper)({
  width: '350px',
  height: '350px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  background: '#ffffff',
  padding: '20px',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
});

const ArrowButton = styled(IconButton)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  padding: '12px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  '&:hover': {
    backgroundColor: '#ffffff',
    transform: 'translateY(-50%) scale(1.05)'
  },
  transition: 'all 0.2s ease'
});

const SlideIndicator = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px 20px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '30px',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
});

const Indicator = styled(Box)(({ active }) => ({
  width: active ? '35px' : '12px',
  height: '12px',
  borderRadius: '6px',
  backgroundColor: active ? '#5da802' : 'rgba(255, 255, 255, 0.4)',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: active ? '#5da802' : 'rgba(255, 255, 255, 0.6)',
    transform: 'scale(1.1)',
  },
  boxShadow: active ? '0 0 10px rgba(93, 168, 2, 0.5)' : 'none',
}));

const MissionVision = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Our Mission",
      content: "To provide exceptional early childhood education that nurtures creativity, curiosity, and character in a safe and engaging environment. We are committed to fostering each child's unique potential through innovative learning experiences and personalized attention.",
      image: MissionIcon
    },
    {
      title: "Our Vision",
      content: "To be the leading preschool that empowers children to become lifelong learners, creative thinkers, and compassionate individuals. We envision a future where every child discovers their talents and develops the confidence to shape tomorrow's world.",
      image: VisionIcon
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <StyledContainer>
      <TextSection>
        <Typography
          variant="h4"
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: 600, 
            color: '#fff',
            mb: 3,
            borderBottom: '3px solid #5da802',
            paddingBottom: 1,
            width: 'fit-content'
          }}
        >
          {slides[currentSlide].title}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{ 
            fontFamily: 'Poppins',
            fontSize: '1.1rem', 
            color: '#fff', 
            lineHeight: 1.8,
            mt: 3,
            letterSpacing: '0.3px'
          }}
        >
          {slides[currentSlide].content}
        </Typography>
      </TextSection>
  
      <Box display="flex" justifyContent="center" width="40%" ml={5}>
        <ImageWrapper elevation={2}>
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title} 
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'contain'
            }} 
          />
        </ImageWrapper>
      </Box>
  
      <ArrowButton 
        onClick={handlePrev} 
        sx={{ left: 10 }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} color="#0457a4" />
      </ArrowButton>
  
      <ArrowButton 
        onClick={handleNext} 
        sx={{ right: 10 }}
        aria-label="Next slide"
      >
        <ChevronRight size={28} color="#0457a4" />
      </ArrowButton>

    <Box 
      sx={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 1.5,
        padding: '8px 16px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.15)'
      }}
    >
      {slides.map((_, index) => (
        <Box
          key={index}
          onClick={() => setCurrentSlide(index)}
          sx={{
            width: currentSlide === index ? 28 : 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: currentSlide === index ? '#fff' : 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        />
      ))}
    </Box>
  </StyledContainer>
);  
};

export default MissionVision;