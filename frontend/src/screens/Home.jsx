import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import NavigationBar from '../components/NavigationBar'
import Background from '../assets/bg_main.png'
import FunPlace from '../assets/funplace.png'
import FunPlaceHero from '../components/FunPlaceHero'

const Home = () => {
    return (
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
        
    )
}

export default Home

