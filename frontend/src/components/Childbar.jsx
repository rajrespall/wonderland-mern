import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from "@mui/icons-material/Logout";
import logo from '../assets/logo_red.png';
import { CssBaseline, IconButton } from '@mui/material';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const ChildBar = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to '/whosusing' when logout is clicked
    navigate('/whosusing');
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative" sx={{ 
            backgroundColor: '#1976d2', // Blue background color
            boxShadow: 'none', // No shadow for the navbar
            borderRadius: '40px', // Rounded corners
            width: '70%', // Set navbar width
            padding: '5px 10px', // Reduced padding for smaller navbar height
            top: '10px', // Offset the navbar from the top
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Adjust to exactly center the navbar
            height: '60px', // Smaller height for the navbar
          }}>
          <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            {/* Logo */}
            <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
              <img src={logo} width="150px" alt="Logo" /> {/* Smaller logo */}
            </Box>

            {/* Logout icon (only visible if authenticated) */}
            {isAuthenticated ? (
              <IconButton 
                color="inherit" 
                onClick={handleLogout} 
                sx={{
                  '&:hover': {
                    color: '#ffeb3b', // Yellow hover effect for logout icon
                  },
                  top: '-5%', // Adjust the top position of the logout icon
                }}
              >
                <LogoutIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default ChildBar;
