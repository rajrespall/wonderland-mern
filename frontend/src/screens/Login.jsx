import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
  IconButton,
  Icon,
} from '@mui/material';
import "@fontsource/poppins";
import logo from '../assets/logo_blue.png';
import LockIcon from '@mui/icons-material/Lock';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0457a4',
      }}
    >
      <Container sx={{alignItems: 'flex-start', width: 550}}>
        <Card
          sx={{
            borderRadius: '35px',
            backgroundColor: 'white', 
            color: 'black',
            textAlign: 'center',
          }}
        >
          <CardContent sx={{ p: 4}}>
            <img src={logo} width="300" />
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{marginTop: 5, color: '#5da802', fontWeight: 750}}>
                <Icon sx={{mr: '5px'}}>
                    <LockIcon sx={{fontSize: '30px', color: "#0457a4"}}/> 
                </Icon>
              SIGN IN
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <TextField
                fullWidth
                id="outlined-password-input"
                label="username"
                type="email"
                autoComplete="current-password"
                InputLabelProps={{style:{color: '#5da802', fontWeight: 500}
                }}
                InputProps={{
                  style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4'},
                }}
                sx={{
                  mb: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}  
              />
              
              <TextField
                fullWidth
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                InputLabelProps={{style:{color: '#5da802'}
                }}
                InputProps={{
                  style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4' },
                }}
                sx={{
                  mb: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
              />
               <Typography variant="body2" align='center' sx={{ color: '#5da802' }}>
                Don't have an account?{' '}
              <Link href="#!" color="text.secondary" fontWeight="bold" sx={{color: '#5da802'}}>
                Sign Up
              </Link>
            </Typography>
              <Button
                fullWidth
                variant="filled"
                sx={{
                    mt: 4,
                    backgroundColor: '#5da802',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    height: '50px',
                    color: '#fcf230',
                    '&:hover': {
                        color: '#5da802',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    },
                }}
              >
                Sign In
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <IconButton color="inherit" href="#!">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="#!">
                <GoogleIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 4 }}>
              Sign in with Google
            </Typography>
          </CardContent>
        </Card>
        
      </Container>
    </Box>
  );
};

export default LoginPage;
