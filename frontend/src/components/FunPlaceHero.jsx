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
              fontSize: { xs: '16px', sm: '18px', md: '22px' }, 
              color: 'white',
              fontFamily: 'Poppins',
              textAlign: { xs: 'center', md: 'left' }, 
              mt: 2,
            }}
          >
            Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed.
          </Typography>
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