import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import logo from '../assets/logo_red.png';
import { CssBaseline } from '@mui/material';
import useAuthStore from '../store/authStore';

const NavigationBar = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <img src={logo} width='180px' alt="Logo" />
            <Box>
              <Button href="/aboutus"
                sx={{
                  marginRight: '10px',
                  width: '100px',
                  height: '30px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  color: '#fcf230',
                  '&:hover': {
                    color: '#0457a4',
                    backgroundColor: '#fcf230',
                  },
                  borderRadius: '20px'
                }}>
                About Us
              </Button>
              {isAuthenticated ? (
                <>
                  <Button href="/resources"
                    sx={{
                      marginRight: '10px',
                      width: '100px',
                      height: '30px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      color: '#fcf230',
                      '&:hover': {
                        color: '#0457a4',
                        backgroundColor: '#fcf230',
                      },
                      borderRadius: '20px'
                    }}>
                    Resources
                  </Button>
                  {/* <Avatar alt={user?.username || "User"} src={user?.profileImage || ""} sx={{ cursor: 'pointer' }} /> */}
                </>
              ) : (
                <Button href="/login"
                  sx={{
                    width: '100px',
                    height: '30px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    color: '#b80201',
                    backgroundColor: '#fcf230',
                    '&:hover': {
                      color: '#fcf230',
                      backgroundColor: 'transparent',
                    },
                    borderRadius: '20px'
                  }}>
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavigationBar;