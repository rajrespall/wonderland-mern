import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import FunPlace from '../assets/funplace.png';
import Squirrel from '../assets/sq_onehand.png';
import Planet from '../assets/planet.png';

const FunPlaceHero = () => {
  return (
    <Box position="absolute">
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        position="relative"
        sx={{ px: 2 }}
      >
        <Box
          sx={{
            position: 'absolute',
            marginRight: '120px',
            marginBottom: '280px',
            width: { xs: '80px', sm: '100px', md: '150px' },
          }}
        >
          <img src={Planet} alt="Planet" style={{ width: '100%' }} />
        </Box>

        <Grid item xs={12} sm={10} md={6} lg={4} sx={{ marginRight: '300px' }}>
          <Box
            sx={{
              width: { xs: '300px', sm: '500px', md: '700px' }, 
              margin: '0 auto', 
            }}
          >
            <img src={FunPlace} alt="Fun Place" style={{ width: '100%' }} />
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '16px', sm: '18px', md: '20px' }, 
              color: 'white',
              fontFamily: 'Poppins',
              textAlign: { xs: 'justify', md: 'justify' }, 
              mt: 2,
            }}
          >
          Jump into a world of colorful adventures, exciting games, and playful learning! Wonderland is a safe and happy space where kids with autism can explore, create, and grow at their own pace. Let’s play, learn, and have fun together!           </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={10}
          md={6}
          lg={4}
          sx={{ marginTop: '70px', marginRight: '80px' }}
        >
          <Box
            sx={{
              width: { xs: '200px', sm: '300px', md: '450px' }, 
              margin: '0 auto', 
            }}
          >
            <img src={Squirrel} alt="Squirrel" style={{ width: '100%' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FunPlaceHero;