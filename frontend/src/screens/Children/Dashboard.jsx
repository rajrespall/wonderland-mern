import React, { useState, useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/Childbar';

import bgMain from '../../assets/bg_main.png';
import heroImage1 from '../../assets/emotional.jpg';
import heroImage2 from '../../assets/communication.jpg';
import heroImage3 from '../../assets/sensory.jpg';
import heroImage4 from '../../assets/routines.jpg';

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroImage1,
      title: 'WonderCards',
      description: 'example',
    },
    {
      image: heroImage2,
      title: 'Wonderpuz',
      description: 'Celebrating uniqueness in all its forms.',
    },
    {
      image: heroImage3,
      title: 'WonderMatch',
      description: 'Celebrating uniqueness in all its forms.',
    },
    {
      image: heroImage4,
      title: 'WonderColor',
      description: 'Celebrating uniqueness in all its forms.',
    },
  ];

  const backgroundStyle = {
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
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  const navigate = useNavigate();

  const handleImageClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={backgroundStyle}>
      <NavigationBar />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '60vh',
          width: '80%',
          borderRadius: '20px',
          boxShadow: '0px 15px 40px rgba(0,0,0,0.3)',
          transition: 'all 0.5s ease',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
            borderRadius: '20px',
            color: 'white',
            padding: '20px',
            position: 'relative',
            transition: 'background-image 0.5s ease-in-out',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '50px',
              zIndex: 1,
              opacity: 1,
              animation: 'fadeIn 1s ease',
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              {slides[currentSlide].title}
            </Typography>
            <Typography variant="h5" sx={{ marginTop: '20px' }}>
              {slides[currentSlide].description}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          width: '65%',
        }}
      >
        <Link onClick={() => handleImageClick('/page1')} sx={{ cursor: 'pointer' }}>
          <Box
            sx={{
              width: '100px',
              height: '100px',
              backgroundImage: `url(${heroImage1})`,
              backgroundSize: 'cover',
              borderRadius: '50%',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s',
              },
            }}
          />
        </Link>
        <Link onClick={() => handleImageClick('/page2')} sx={{ cursor: 'pointer' }}>
          <Box
            sx={{
              width: '100px',
              height: '100px',
              backgroundImage: `url(${heroImage2})`,
              backgroundSize: 'cover',
              borderRadius: '50%',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s',
              },
            }}
          />
        </Link>
        <Link onClick={() => handleImageClick('/page3')} sx={{ cursor: 'pointer' }}>
          <Box
            sx={{
              width: '100px',
              height: '100px',
              backgroundImage: `url(${heroImage3})`,
              backgroundSize: 'cover',
              borderRadius: '50%',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s',
              },
            }}
          />
        </Link>
        <Link onClick={() => handleImageClick('/page4')} sx={{ cursor: 'pointer' }}>
          <Box
            sx={{
              width: '100px',
              height: '100px',
              backgroundImage: `url(${heroImage4})`,
              backgroundSize: 'cover',
              borderRadius: '50%',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s',
              },
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Dashboard;