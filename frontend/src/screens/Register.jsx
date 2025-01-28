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
import logo2 from '../assets/logo_red.png';
import create from '../assets/signup.png';
import squirrel from '../assets/sq_notebook.png';
import Background2 from '../assets/bg_signup.png';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RegisterNav from '../components/RegNav';

//state imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';


const Register = () => {
  //states for register form start here
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
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
      await register(formData.username, formData.email, formData.password);
      navigate('/whosusing');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <>
      <CssBaseline />
      <RegisterNav />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${Background2})`,
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
          {/* Login Form Section */}
          <Grid item xs={12} sm={10} md={6} lg={4} sx={{marginRight:"300px"}}>
            <img src={squirrel} alt="Squirrel" style={{ height: '400px', position: 'absolute', marginTop:"170px", marginLeft: "460px" }} />
                <IconButton href="/login" sx={{mt: '22px', position: 'absolute',  color: '#5da802', marginLeft: '15px', fontSize: '30px'}}>
                  <ArrowBackIcon sx={{}}/>
                </IconButton>
            <Card
              sx={{
                borderRadius: '45px',
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'center',
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <img src={logo2} width="70%" alt="Logo" />  
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: 5, color: '#5da802', fontWeight: 750 }}
                >
                  <Icon sx={{ mr: 1 }}>
                    <LockIcon sx={{ fontSize: '30px', color: '#b80201' }} />
                  </Icon>
                  SIGN IN
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    name="username"
                    label="username"
                    type="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "14px"  },}}
                    InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', height: "45px" },}}
                    sx={{
                      mb: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#b80201', 
                          borderWidth: '2px', 
                        },
                        '&:hover fieldset': {
                          borderColor: '#5da802', 
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#5da802', 
                        },
                      },
                    }}                  />
                  <TextField
                    fullWidth
                    name="email"
                    label="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "14px"  },}}
                    InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', height: "45px" },}}
                    sx={{
                      mb: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#b80201',
                          borderWidth: '2px',  
                        },
                        '&:hover fieldset': {
                          borderColor: '#5da802', 
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#5da802', 
                        },
                      },
                    }}                  />
                  <TextField
                    fullWidth
                    name="password"
                    label="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "14px"  },}}
                    InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', height: "45px" },}}
                    sx={{
                      mb: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#b80201',
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
                  
                  {error && (
                      <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                      </Typography>
                  )}
                    
                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{
                      mt: 4,
                      backgroundColor: '#b80201',
                      borderRadius: '30px',
                      fontWeight: 'bold',
                      height: '50px',
                      color: '#fcf230',
                      '&:hover': {
                        color: '#b80201',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </Box>
                
              </CardContent>
            
            </Card>

          </Grid>

          {/* Decorative Section */}
          <Grid item xs={12} sm={10} md={6} lg={4}>
            <Box textAlign="right" sx={{mt: 15}}>
              <Box sx={{marginBottom: "220px"}}>
                <img src={create} alt="Pagkaki" style={{ maxWidth: '90%',  marginLeft: "60px"}} />
              <Typography sx={{ color: 'white', mb: 3, mt: 4, fontFamily: "Poppins", fontSize: "18px"}}>
                Inspirational Text Here Inspirational Text Here Inspirational Text Here jasdhaj gfgfj
                Inspirational Text Here Inspirational Text Here Inspirational Text Here sdkjashdh jadkjashfjasjfgjasg
                Inspirational Text Here Inspirational Text Here
              </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
