import React, { useState, useEffect } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import logo from '../assets/logo_blue.png';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  
  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem('pendingVerificationEmail');
  
  // Store email in localStorage to persist across refreshes
  useEffect(() => {
    if (location.state?.email) {
      localStorage.setItem('pendingVerificationEmail', location.state.email);
    }
    
    // Redirect if no email is found
    if (!email) {
      navigate('/login');
    }
  }, [email, location.state, navigate]);
  
  // If no email, return null after the useEffect handles the redirection
  if (!email) {
    return null;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/verify-email',
        { email, otp },
        { withCredentials: true }
      );
      
      // Clear stored email after successful verification
      localStorage.removeItem('pendingVerificationEmail');
      
      // Navigate based on whether user has completed assessment
      if (response.data.user.isFirstLogin) {
        navigate('/getstarted');
      } else {
        navigate('/whosusing');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.response?.data?.error || 'Failed to verify email');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    setError('');
    
    try {
      await axios.post(
        'http://localhost:5000/api/auth/resend-otp',
        { email },
        { withCredentials: true }
      );
      
      setResendMessage('Verification code sent successfully');
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.response?.data?.error || 'Failed to resend verification code');
    } finally {
      setResendLoading(false);
    }
  };
  
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0457a4',
          padding: 2
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
                <EmailIcon sx={{ fontSize: '30px', mr: 1, verticalAlign: 'middle' }} />
                Verify Your Email
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 4, mt: 2, fontFamily: 'Poppins' }}>
                A verification code has been sent to <strong>{email}</strong>. 
                Please enter the code below to verify your account.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  name="otp"
                  label="Verification Code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 6 }}
                  InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" }}}
                  InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4' }}}
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
                
                {resendMessage && (
                  <Typography color="success.main" sx={{ mt: 1, mb: 2 }}>
                    {resendMessage}
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
                  {loading ? 'Verifying...' : 'Verify Email'}
                </Button>
                
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleResend}
                    disabled={resendLoading}
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
                    {resendLoading ? 'Sending...' : "Didn't receive the code? Resend"}
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default VerifyEmail;