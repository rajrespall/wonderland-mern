import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import NavigationBar from '../components/NavigationBar'
import Background from '../assets/bg_main.png'
import FunPlaceHero from '../components/FunPlaceHero'
import Spinner from '../components/Spinner'
import MyDonations from '../components/Donations/MyDonations'

const Home = () => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      }, []);
    
      if (loading) {
        return <Spinner />
      }

    return (
      <>
        <Box 
            sx={{ 
            minHeight: '100vh',
            backgroundImage:`url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'}}>
            <NavigationBar />
            <FunPlaceHero />
        </Box>
        <Box sx={{p: 2}}>
            <MyDonations />
        </Box>
      </>
        
    )
}

export default Home

