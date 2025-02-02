import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, AppBar, Toolbar, CssBaseline } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChildIcon from "../assets/child.png";
import ParentIcon from "../assets/parent.png"; 
import Logo from "../assets/logo_red.png"; 
import User from "../assets/whosusing.png";
import Spinner from "../components/Spinner";

import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const UserSelection = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400); 
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <Spinner />; 
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "#0457a4",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AppBar position="static" sx={{ width: '95%', marginTop: '20px', backgroundColor: "rgba(176, 200, 227, 0.1)", boxShadow: "none", borderRadius: '40px' }}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: 3,
            }}
          >
            <Box>
              <img src={Logo} alt="Wonderland Logo" style={{ height: "35px" }} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Button
                sx={{
                  fontWeight: 'bold', 
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  color: "#fff",
                  "&:hover": { color: "#fcf230" },
                }}
              >
                About Us
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  fontWeight: 'bold', 
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  color: "#fcf230",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { color: "#fff" },
                }}
              >
                Logout <LogoutIcon />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ textAlign: "center", color: "#fcf230" }}>
          <Box>
            <img src={User} width="700px" />
          </Box>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  "& img": {
                    width: "100%",
                    maxWidth: "200px",
                    borderRadius: "20px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
                    },
                  },
                }}
              >
                <Box component="a" href="#">
                  <img src={ChildIcon} alt="Child Icon"/>
                </Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    mt: 3,
                    color: "#fcf230",
                    fontFamily: "Poppins",
                  }}
                >
                  CHILD
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  "& img": {
                    width: "100%",
                    maxWidth: "200px",
                    borderRadius: "20px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
                    },
                  },
                }}
              >
                <Box component="a" href="#">
                  <img src={ParentIcon} alt="Parent Icon" />
                </Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    mt: 3,
                    color: "#fcf230",
                    fontFamily: "Poppins",
                  }}
                >
                  PARENT
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ height: "50px" }}></Box>
      </Box>
    </>
  );
};

export default UserSelection;
