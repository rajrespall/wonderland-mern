import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const NavigationBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          wonderland
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </Box>
);
}   

export default NavigationBar