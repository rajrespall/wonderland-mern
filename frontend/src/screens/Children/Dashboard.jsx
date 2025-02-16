import React from 'react';
import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';
import forestBackground from '../../assets/bg_main.png';
import { motion } from 'framer-motion';
import wondercards from '../../assets/wondercards.jpg';
import wondermatch from '../../assets/wondermatch.jpg';
import wonderpuz from '../../assets/wonderpuz.jpg';
import wondercolor from '../../assets/wondercolor.jpg';

const gameLogos = [
  { src: wondercards, title: 'Game 1' },
  { src: wondermatch, title: 'Game 2' },
  { src: wonderpuz, title: 'Game 3' },
  { src: wondercolor, title: 'Game 4' },
];

const Dashboard = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${forestBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          zIndex: -1,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            marginBottom: '20px',
            color: 'rgb(139, 69, 19)',
            textShadow: '0px 0px 20px rgba(139, 69, 19, 0.8)',
            letterSpacing: '1px',
          }}
        >
          Welcome to Your Game Dashboard
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            marginBottom: '40px',
            color: 'rgb(139, 69, 19)',
            textShadow: '0px 0px 20px rgba(139, 69, 19, 0.6)',
            letterSpacing: '0.5px',
          }}
        >
          Choose a game to start playing
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Grid container spacing={3} justifyContent="center">
          {gameLogos.map((game, index) => (
            <Grid item xs={12} sm={6} md={2.5} key={index}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
                }}
                whileTap={{
                  scale: 0.95,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    boxShadow: 3,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease-in-out',
                    width: '100%',
                  }}
                  onClick={() => alert(`Navigate to ${game.title} page`)}
                >
                  <CardMedia
                    component="img"
                    image={game.src}
                    alt={game.title}
                    sx={{
                      height: '245px',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard;