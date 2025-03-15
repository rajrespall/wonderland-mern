import React from 'react';
import { AppBar, Box, Toolbar, Button, Avatar, CssBaseline } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import logo from '../assets/logo_blue.png';
import logo1 from '../assets/logo_red.png';


const NavigationBar = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isNotHome = location.pathname === "/";

  const navButtonStyle = (path) => ({
    fontWeight: 'bold',
    textTransform: 'none',
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: isNotHome ? (isActive(path) ? 'white' : '#fcf230') : (isActive(path) ? '#5da802' : '#0457a4'),
    position: 'relative',
    '&:after': {
      content: '""',
      display: 'block',
      width: isActive(path) ? '100%' : '0%',
      height: '2px',
      backgroundColor: isNotHome ? 'white' : '#5da802',
      transition: 'width 0.3s ease-in-out',
      position: 'absolute',
      bottom: '-3px',
      left: '0',
    },
    '&:hover': {
      color: isNotHome ? 'white' : '#5da802',
    },
    '&:hover:after': {
      width: '100%',
    },
  });

  const AvatarStyle = (path) => ({
    bgcolor: 'transparent',
    color: isNotHome ? (isActive(path) ? 'white' : '#fcf230') : (isActive(path) ? '#5da802' : '#0457a4'),
    cursor: 'pointer',
    '&:hover': {
      color: isNotHome ? 'white' : '#5da802',
     },
  })

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer', mt: 1 }}>
              <img src={isNotHome ? logo1 : logo} width="150px" alt="Logo" />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isAuthenticated && (
                <>
                  <Button onClick={() => navigate('/')} sx={navButtonStyle('/')}>Home</Button>
                  <Button onClick={() => navigate('/resources')} sx={navButtonStyle('/resources')}>Resources</Button>
                  <Button onClick={() => navigate('/institutions')} sx={navButtonStyle('/institutions')}>Institutions</Button>
                </>
              )}
              <Button onClick={() => navigate('/aboutus')} sx={navButtonStyle('/aboutus')}>About Us</Button>
              {isAuthenticated ? (
                <Avatar
                  sx={AvatarStyle('/profile')}
                  onClick={() => navigate('/profile')}
                />
              ) : (
                <Button onClick={() => navigate('/login')} sx={navButtonStyle('/login')}>Sign In</Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavigationBar;