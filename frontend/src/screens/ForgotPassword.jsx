import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  CssBaseline,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import axios from 'axios';
import logo from '../assets/logo_blue.png';
import Background from '../assets/bg_signin.png';
import ButtonAppBar from '../components/LoginNav';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email },
        { withCredentials: true }
      );
      
      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.response?.data?.error || 'Failed to send password reset email');
    } finally {
      setLoading(false);
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
        <Container maxWidth="sm">
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
              <Box sx={{ mb: 3 }}>
                <img src={logo} width="70%" alt="Logo" />
              </Box>
              
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ color: '#5da802', fontFamily: 'Poppins' }}
              >
                <LockResetIcon sx={{ fontSize: '30px', mr: 1, verticalAlign: 'middle' }} />
                Reset Your Password
              </Typography>
              
              {!success ? (
                <>
                  <Typography variant="body1" sx={{ mb: 4, mt: 2, fontFamily: 'Poppins' }}>
                    Enter your email address and we'll send you a link to reset your password.
                  </Typography>
                  
                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      InputLabelProps={{ 
                        style: { 
                          color: '#5da802', 
                          fontWeight: 600, 
                          fontFamily: "Poppins", 
                          fontSize: "16px" 
                        }
                      }}
                      InputProps={{ 
                        style: { 
                          color: 'black', 
                          borderRadius: '50px', 
                          borderColor: '#0457a4' 
                        }
                      }}
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
                    
                    {error && (
                      <Typography color="error" sx={{ mt: 1, mb: 2 }}>
                        {error}
                      </Typography>
                    )}
                    
                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading}
                      sx={{
                        mt: 2,
                        backgroundColor: '#5da802',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        height: '50px',
                        color: '#fcf230',
                        '&:hover': {
                          backgroundColor: '#4c9000',
                        },
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="body1" sx={{ mb: 4, mt: 4, fontFamily: 'Poppins', color: '#5da802' }}>
                    Password reset link sent! Please check your email at <strong>{email}</strong> and follow the instructions to reset your password.
                  </Typography>
                </>
              )}
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{
                    color: '#0457a4',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Back to Sign In
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;