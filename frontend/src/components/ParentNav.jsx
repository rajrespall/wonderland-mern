import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo_red.png';

const ParentNav = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        width: '95%',
        marginTop: '20px',
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
              color: "#0457a4",
              "&:hover": { color: "#fcf230" },
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
              color: "#0457a4",
              "&:hover": { color: "#fcf230" },
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
              color: "#0457a4",
              "&:hover": { color: "#fcf230" },
            }}
          >
            About Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ParentNav;