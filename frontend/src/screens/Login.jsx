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
  CssBaseline,
} from '@mui/material';
import "@fontsource/poppins";
import logo from '../assets/logo_blue.png';
import pagkaki from '../assets/login.png';
import squirrel from '../assets/sq_twohands.png';
import Background from '../assets/bg_signin.png';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import ButtonAppBar from '../components/LoginNav';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

import { auth } from '../config/firebase';
import {  GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LoginPage = () => {

  const navigate = useNavigate();
  const { login, googleLogin, loading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.email, formData.password);
      

      if (response.requireReEnable) {
        console.log("User is inactive, redirecting to /re-enable");
        navigate('/re-enable', { state: { email: response.email } }); // Pass email dynamically
        return;
    }
    
      // Check if verification is required
      if (response.requireVerification) {
        navigate('/verify-email', { state: { email: response.email } });
        return;
      }
      
      if (response.isFirstLogin) {
        navigate('/getstarted');
      } else {
        navigate('/whosusing');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const idToken = await user.getIdToken();
        const response = await googleLogin(idToken);
        
        if (response.isFirstLogin) {
            navigate('/getstarted');
        } else {
            navigate('/whosusing');
        }
    } catch (err) {
        if (err.code === 'auth/popup-blocked') {
            console.error('Popup was blocked by the browser!');
        } else {
            console.error('Google login error:', err);
        }
    }
  };
  

  return (
    <>
      <CssBaseline />
      <ButtonAppBar />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          position= 'relative'
          
          sx={{ px: 2 }}
        >
          <Grid item xs={12} sm={10} md={6} lg={4} sx={{marginRight:"300px"}}>
            <img src={squirrel} alt="Squirrel" style={{ height: '400px', position: 'absolute', marginTop:"170px", marginLeft: "420px" }} />
            <Card
              sx={{
                borderRadius: '35px',
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'center',
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box component="a" href="/">
                <img src={logo} width="70%" alt="Logo" />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: 5, color: '#5da802', fontWeight: 750 }}
                >
                  <Icon sx={{ mr: 1 }}>
                    <LockIcon sx={{ fontSize: '30px', color: '#0457a4' }} />
                  </Icon>
                  SIGN IN
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    name="email"
                    label="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" },}}
                    InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4' },}}
                    sx={{
                      mb: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#0457a4', 
                          borderWidth: '2px', 
                        },
                        '&:hover fieldset': {
                          borderColor: '#5da802', 
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#5da802', 
                        },
                      },
                    }}  
                  />

                  <TextField
                    fullWidth
                    name="password"
                    label="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    InputLabelProps={{style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px"  },}}
                    InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', },}}
                    sx={{
                      mb: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#0457a4', 
                          borderWidth: '2px', 
                        },
                        '&:hover fieldset': {
                          borderColor: '#5da802', 
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#5da802', 
                        },
                      },
                    }}  
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Link href="/forgot-password" variant="body2" sx={{ 
                      color: '#0457a4',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      fontFamily: 'Poppins',
                      mb: 2,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}>
                      Forgot password?
                    </Link>
                  </Box>

                  {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                      {error}
                    </Typography>
                  )}

                  <Typography variant="body2" align="center" sx={{ color: '#5da802' }}>
                    Don't have an account?{' '}
                    <Link href="/register" fontWeight="bold" sx={{ color: '#5da802' }}>
                      Sign Up
                    </Link>
                  </Typography>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{
                      mt: 4,
                      backgroundColor: '#5da802',
                      borderRadius: '30px',
                      fontWeight: 'bold',
                      height: '50px',
                      color: '#fcf230',
                      '&:hover': {
                        color: '#5da802',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    onClick={handleGoogleLogin}
                    variant="outlined"
                    color="inherit"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderRadius: '30px',
                      fontWeight: 'bold',
                      height: '50px',
                      width: '80%',
                      transition: 'background-color 0.3s, transform 0.3s', 
                      '&:hover': {
                        backgroundColor: '#f4f4f4', 
                        transform: 'scale(1.05)', 
                      },
                    }}
                  >
                    <GoogleIcon sx={{ marginRight: 2 }} />
                    Sign in with Google
                  </Button>
                </Box>
                  {/* comment ko lang baka gamitin pa */}
                {/* <Typography variant="body2" sx={{ mt: 2 }}>
                  Sign in with Google
                </Typography> */}
              </CardContent>
            
            </Card>

          </Grid>

          <Grid item xs={12} sm={10} md={6} lg={4}>
            <Box textAlign="right" sx={{mt: 15}}>
              <Box sx={{marginBottom: "220px"}}>
                <img src={pagkaki} alt="Pagkaki" style={{ maxWidth: '90%',  marginLeft: "60px"}} />
              <Typography sx={{ color: 'white', mb: 3, mt: 4, fontFamily: "Poppins", fontSize: "18px"}}>
              "Welcome Back to Wonderland! We're happy to see you again. Log in to continue your fun learning adventure. If you need help, ask a grown-up or contact us!"
              </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
