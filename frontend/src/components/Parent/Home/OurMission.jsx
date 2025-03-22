import React, { useState } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MissionIcon from '../../../assets/otherElements/Mission.png';
import VisionIcon from '../../../assets/otherElements/Vision.png';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: theme.spacing(4),
}));

const TextSection = styled(Box)({
  maxWidth: '60%',
  position: 'relative',
});

const ImageWrapper = styled(Box)({
  width: '400px',
  height: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ArrowButton = styled(IconButton)({
  backgroundColor: '#fff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const MissionVision = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Our Mission',
      image: MissionIcon,
      content:
        'To provide exceptional experiences through innovation, dedication, and a passion for excellence. We strive to empower communities, drive sustainable growth, and foster a culture of inclusivity and progress.',
    },
    {
      title: 'Our Vision',
      image: VisionIcon,
      content:
        'To inspire and lead by setting new standards in quality, sustainability, and creativity. Our vision is to shape a future where innovation meets responsibility, creating impactful solutions for generations to come.',
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <StyledContainer>
      {/* Left - Text Section with Arrow */}
      <TextSection>
        <ArrowButton onClick={handlePrev} sx={{ position: 'absolute', left: '-100px', top: '50%', transform: 'translateY(-50%)' }}>
          <ChevronLeft size={30} color="#0457a4" />
        </ArrowButton>
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', fontFamily: 'Poppins', color: '#fff', ml: 10, mb: 5}}
        >
          {slides[currentSlide].title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: '1.2rem', color: '#c9e5ff', marginTop: 2, fontFamily: 'Poppins', ml: 10 }}
        >
          {slides[currentSlide].content}
        </Typography>
      </TextSection>

      {/* Right - Image Section */}
      <Box display="flex" justifyContent="center" width="40%" ml={5}>
        <ImageWrapper>
          <img src={slides[currentSlide].image} alt={slides[currentSlide].title} style={{ width: '100%', height: '100%' }} />
        </ImageWrapper>
      </Box>
        <ArrowButton onClick={handleNext} sx={{right: '-100px'}}>
          <ChevronRight size={30} color="#0457a4" />
        </ArrowButton>
    </StyledContainer>
  );
};

export default MissionVision;
