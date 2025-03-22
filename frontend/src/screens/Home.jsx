import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Background from '../assets/bg_main.png';
import FunPlaceHero from '../components/FunPlaceHero';
import Spinner from '../components/Spinner';
import MyDonations from '../components/Donations/MyDonations';
import TeamSection from '../components/Parent/About Us/OurTeam';
import MissionVision from '../components/Parent/Home/OurMission';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <NavigationBar />
        <FunPlaceHero />
      </Box>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Box>
          <MyDonations />
        </Box>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Box sx={{ backgroundColor: '#0457a4' }}>
          <MissionVision />
        </Box>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Box>
          <TeamSection />
        </Box>
      </motion.div>
    </>
  );
};

export default Home;
