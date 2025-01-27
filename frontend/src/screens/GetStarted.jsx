import React from 'react'
import { Box, CssBaseline, Typography, Container } from '@mui/material'
import Background from '../assets/bg_getstarted.png'
import Logo from '../assets/logo_red.png'

const GetStarted = () => {
  return (
    <>
    <CssBaseline/>
        <Box sx={{
                position: 'static',
                minHeight: '100vh',
                backgroundImage:`url(${Background})`,
                backgroundSize: 'cover',
                }}>
            
        </Box>
    </>
  )
}

export default GetStarted