import React from 'react';
import { AppBar, Toolbar, Box, Button, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/logo_red.png';

const ParentNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="static" 
      sx={{ 
        width: '100%',
        backgroundColor: "rgba(176, 200, 227, 0.2)",
        boxShadow: "none",
        borderRadius: '40px' 
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: 3,
        }}
      >
        <Box onClick={() => navigate('/parent')} sx={{ cursor: 'pointer' }}>
          <img src={Logo} alt="Wonderland Logo" style={{ height: "35px" }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button
            onClick={() => navigate('/resources')}
            sx={{
              fontWeight: 'bold', 
              textTransform: "none",
              fontFamily: "Poppins",
              fontSize: "16px",
              color: isActive('/resources') ? "#243558" : "#0457a4",
              "&:hover": { color: "black" },
            }}
          >
            Resources
          </Button>
          <Button
            onClick={() => navigate('/institutions')}
            sx={{
              fontWeight: 'bold', 
              textTransform: "none",
              fontFamily: "Poppins",
              fontSize: "16px",
              color: isActive('/institutions') ? "#243558" : "#0457a4",
              "&:hover": { color: "black" },
            }}
          >
            Institutions
          </Button>
          <Button
            onClick={() => navigate('/aboutus')}
            sx={{
              fontWeight: 'bold', 
              textTransform: "none",
              fontFamily: "Poppins",
              fontSize: "16px",
              color: isActive('/aboutus') ? "#243558" : "#0457a4",
              "&:hover": { color: "black" },
            }}
          >
            About Us
          </Button>
          <Avatar
            sx={{
              bgcolor: "transparent",
              color: isActive('/profile') ? "#243558" : "#0457a4",
              cursor: 'pointer',
              "&:hover": {
                color: "black",
              }
            }}
            onClick={() => navigate('/profile')}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ParentNav;
