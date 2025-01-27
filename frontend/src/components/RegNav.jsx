import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function RegisterNav() {
  return (
    
    <Box sx={{ flexGrow: 1, position: 'absolute', width: '100%'}}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'flex-end', marginRight: '10px' }}>
          <Button
            href=""
            sx={{
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
