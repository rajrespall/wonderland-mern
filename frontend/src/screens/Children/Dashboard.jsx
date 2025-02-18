import React, { useState } from 'react';
import { Box, Typography, Link, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/Childbar';

import bgMain from '../../assets/bg_main.png';
import heroImage1 from '../../assets/emotional.jpg';
import heroImage2 from '../../assets/communication.jpg';
import heroImage3 from '../../assets/sensory.jpg';
import heroImage4 from '../../assets/routines.jpg';

import card from '../../assets/icons/cardgames.png';
import puzzle from '../../assets/icons/puzzle.png';
import color from '../../assets/icons/colorwheel.png';
import match from '../../assets/icons/game.png';

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const icons = [card, puzzle, match, color]; // Use icons instead of hero images

  const slides = [
    {
      image: heroImage1,
      title: 'WonderCards',
      description: 'example',
      route: '/wondercards',
    },
    {
      image: heroImage2,
      title: 'Wonderpuz',
      description: 'Celebrating uniqueness in all its forms.',
      route: '/wonderpuz',
    },
    {
      image: heroImage3,
      title: 'WonderMatch',
      description: 'Celebrating uniqueness in all its forms.',
      route: '/wondermatch',
    },
    {
      image: heroImage4,
      title: 'WonderColor',
      description: 'Celebrating uniqueness in all its forms.',
      route: '/wondercolor',
    },
  ];

  const handleImageClick = (index) => {
    setCurrentSlide(index);
  };

  const handlePlayClick = () => {
    navigate(slides[currentSlide].route);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${bgMain})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        overflow: 'auto',
      }}
    >
      <NavigationBar />

      {/* Hero Slider with Solid Yellow Border */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '60vh',
          width: '80%',
          borderRadius: '20px',
          border: '5px solid yellow', // Solid yellow border
          transition: 'all 0.5s ease',
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '20px',
          position: 'relative',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            {slides[currentSlide].title}
          </Typography>
          <Typography variant="h5" sx={{ marginTop: '20px' }}>
            {slides[currentSlide].description}
          </Typography>
        </Box>

        {/* Play Button */}
        <Button
          variant="contained"
          onClick={handlePlayClick}
          sx={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#FFD700',
            color: 'black',
            fontWeight: 'bold',
            padding: '10px 20px',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: '#FFC300',
            },
          }}
        >
          Play
        </Button>
      </Box>

      {/* Rectangular Navigation */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          width: '50%',
        }}
      >
        {slides.map((slide, index) => (
          <Link key={index} onClick={() => handleImageClick(index)} sx={{ cursor: 'pointer' }}>
            {/* Container Box */}
            <Box
              sx={{
                width: '90px', // Rectangle width
                height: '90px', // Rectangle height
                backgroundColor: currentSlide === index ? 'rgba(255, 255, 255, 0.4)' : 'transparent', // White translucent highlight when clicked
                boxShadow: currentSlide === index ? '0 0 20px 5px rgba(255, 255, 255, 0.8)' : 'none', // Glow effect when selected
                borderRadius: '18px', // Slightly rounded corners
                opacity: currentSlide === index ? 1 : 1, // Make image brighter when selected
                transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)', // Enlarge the selected image
                transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.3s, background-color 0.3s',
                '&:hover': {
                  transform: 'scale(1.2)', // Hover effect: enlarge image
                  boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.8)', // Glow effect on hover
                },
              }}
            >
              {/* Image Box */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${icons[index]})`, // Use icon images
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  borderRadius: '8px', // Slightly rounded corners
                }}
              />
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
