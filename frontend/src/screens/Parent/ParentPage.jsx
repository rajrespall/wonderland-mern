import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import Background from '../../assets/bg_signin.png';
import { Box, Typography, Container } from '@mui/material';

const ParentHome = () => {

  return (
    <Box sx={{
        minHeight: '100vh',
        backgroundImage:`url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'}}>
      <NavigationBar />
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          
        </Box>
      </Container>
    </Box>
  );
};

export default ParentHome;