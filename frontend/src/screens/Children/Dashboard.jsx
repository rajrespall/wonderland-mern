import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, ArrowBack, Logout } from '@mui/icons-material';

import bgMain from '../../assets/gamebg.png';
import heroImage1 from '../../assets/wondercards.png';
import heroImage2 from '../../assets/puzzleimg.png';
import heroImage3 from '../../assets/coloringimg.png';
import heroImage4 from '../../assets/memorypuzimg.png';

import memorygame from '../../assets/wondercard.png';
import puzzlegame from '../../assets/wonderpuz.png';
import matching from '../../assets/wondermatch.png';
import color from '../../assets/wondercolor.png';

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLogo, setCurrentLogo] = useState(memorygame);
  const navigate = useNavigate();

  const slides = [
    {
      image: heroImage1,
      logo: memorygame,
      route: 'http://localhost:5177',
    },
    {
      image: heroImage2,
      logo: puzzlegame,
      route: 'http://localhost:5176',
    },
    {
      image: heroImage3,
      logo: color,
      route: 'http://localhost:5174',
    },
    {
      image: heroImage4,
      logo: matching,
      route: 'http://localhost:5175',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % slides.length;
      setCurrentLogo(slides[next].logo);
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev - 1 + slides.length) % slides.length;
      setCurrentLogo(slides[next].logo);
      return next;
    });
  };

  const handlePlayClick = () => {
    const currentRoute = slides[currentSlide].route;
    
    // Check if the route is an external URL
    if (currentRoute.startsWith('http')) {
      window.open(currentRoute, '_blank'); // Opens in new tab
    } else {
      navigate(currentRoute); // Internal navigation
    }
  };

  const handleLogoutClick = () => {
    navigate('/whosusing');
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
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          left: '10%',
          top: '2%',
          height: '100vh',
          width: '80%',
          borderRadius: '20px',
          transition: 'all 0.5s ease',
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '20px',
          position: 'relative',
          marginBottom: '50px',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <img src={currentLogo} alt="Game Logo" style={{ width: '700px', height: 'auto' }} />
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={handlePlayClick}
          sx={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            width: '28%',
            transform: 'translateX(-50%)',
            backgroundColor: '#FFB84D',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '50px',
            padding: '15px 30px',
            fontSize: '30px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            border: '6px solid white',
            '&:hover': {
              backgroundColor: '#FF8C1A',
            },
          }}
        >
          Start
        </Button>

        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: '-10px',
            top: '43%',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            color: '#FFB84D',
            borderRadius: '10px',
            padding: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#388E3C',
            },
          }}
        >
          <ArrowBack fontSize="inherit" sx={{ fontSize: '40px' }} />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: '-10px',
            top: '43%',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            color: '#FFB84D',
            borderRadius: '10px',
            padding: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#388E3C',
            },
          }}
        >
          <ArrowForward fontSize="inherit" sx={{ fontSize: '40px' }} />
        </IconButton>

        <IconButton
          onClick={handleLogoutClick}
          sx={{
            position: 'absolute',
            top: '10px',
            left: '-100px',
            backgroundColor: 'white',
            color: '#FFB84D',
            borderRadius: '10px',
            padding: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#FF8C1A',
            },
          }}
        >
          <Logout fontSize="inherit" sx={{ fontSize: '40px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Dashboard;