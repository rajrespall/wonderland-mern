import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Background from '../assets/bg_main.png';
import FunPlaceHero from '../components/FunPlaceHero';
import Spinner from '../components/Spinner';
import MyDonations from '../components/Donations/MyDonations';
import TeamSection from '../components/Parent/About Us/OurTeam';
import MissionVision from '../components/Parent/Home/OurMission';
import Reviews from '../components/Parent/Home/AllReviews';
import Feedback from '../components/Feedback';
import Footer from '../components/Parent/Footer';

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
        <Box>
          <MyDonations />
        </Box>

        <Box sx={{height: '80vh'}}>
          <Reviews />
        </Box>

        <Box>
          <Feedback />
        </Box>
        
        <Box>
          <MissionVision />
        </Box>

        <Box>
          <TeamSection />
        </Box>
        <Box sx={{ height: '20vh' }}>
          <Footer />
        </Box>
    </>
  );
};

export default Home;
