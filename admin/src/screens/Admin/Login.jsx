import { Box, CssBaseline, Card, CardContent, Typography, Icon, Button, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';

import React from 'react'
import "@fontsource/poppins";

import logo from '../../assets/logo_red.png'
import background from '../../assets/bg_signin.png'

const Login = () => {
  return (
    <>
    <CssBaseline />
        <Box
            sx={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh'
            }}>
            <Box
                sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <img src={logo} alt='logo' style={{width:'500px'}}/>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                }}>
            <Card
              sx={{
                width:'450px',
                borderRadius: '35px',
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'center',
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: 2, color: '#5da802', fontWeight: 750 }}
                >
                  <Icon sx={{ mr: 1 }}>
                    <LockIcon sx={{ fontSize: '30px', color: '#0457a4' }} />
                  </Icon>
                  SIGN IN
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    name="email"
                    label="email"
                    type="email"
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

                  <Button
                    type="submit"
                    fullWidth
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
                    {/* {loading ? 'Signing in...' : 'Sign In'} */} Sign In
                  </Button>
                </Box>
                  {/* comment ko lang baka gamitin pa */}
                {/* <Typography variant="body2" sx={{ mt: 2 }}>
                  Sign in with Google
                </Typography> */}
              </CardContent>
            
            </Card>
            </Box>  
        </Box>
    </>
  )
}

export default Login