import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/logo_red.png'
import { CssBaseline } from '@mui/material';


const NavigationBar = () => {
  return (
    <>
    <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <img src={logo} width='180px' />
        <Box>
        <Button href="/aboutus"
           sx={{
              marginRight: '10px',
              width: '100px',
              height: '30px', 
              textTransform: 'none',
              fontWeight: 600,
              fontFamily: 'Poppins',
              fontSize: '14px',
              color: '#fcf230',
              '&:hover': {
               color: '#0457a4',
               backgroundColor: '#fcf230',
             },
             borderRadius: '20px'
           }}
            >
          About Us
        </Button>
        <Button href="/login"
            sx={{
              width: '100px',
              height: '30px',
              textTransform: 'none',
              fontWeight: 600,
              fontFamily: 'Poppins',
              fontSize: '14px',
              color: '#b80201',
              backgroundColor: '#fcf230',
              '&:hover': {
                color: '#0457a4',
              },
              borderRadius: '20px'
            }}>
              Login
            </Button>
            </Box>
      </Toolbar>  
    </AppBar>
  </Box>
    </>
);
}   

export default NavigationBar