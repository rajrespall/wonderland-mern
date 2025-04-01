import React from "react";
import { Container, Grid, Typography, Link, Box, Divider } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0457a4",
        color: "white",
        pt: 6,
        pb: 3,
        mt: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                fontFamily: 'Poppins',
                mb: 2,
                color: '#fcf230',
              }}
            >
              Wonderland
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Poppins',
                color: '#fff',
                opacity: 0.9,
                mb: 2
              }}
            >
              An interactive space for children with autism and their parents, fostering learning and improving skills through engaging activities and professional guidance.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{
                fontFamily: 'Poppins',
                mb: 2,
                color: '#fff'
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, opacity: 0.9 }} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'Poppins',
                  color: '#fff',
                  opacity: 0.9
                }}
              >
                support@wonderland.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, opacity: 0.9 }} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'Poppins',
                  color: '#fff',
                  opacity: 0.9
                }}
              >
                (123) 456-7890
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1, opacity: 0.9 }} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'Poppins',
                  color: '#fff',
                  opacity: 0.9
                }}
              >
                123 Main Street, Manila, Philippines
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography
          variant="body2"
          align="center"
          sx={{
            fontFamily: 'Poppins',
            color: '#fff',
            opacity: 0.7
          }}
        >
          © {new Date().getFullYear()} Wonderland. All rights reserved.
        </Typography>
      </Container>  
    </Box>
  );
};

export default Footer;