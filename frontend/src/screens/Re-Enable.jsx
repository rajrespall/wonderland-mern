import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CssBaseline,
  Container
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import logo from '../assets/logo_blue.png';

const ReEnable = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // ✅ Get email from state (No LocalStorage)
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate('/login'); // Redirect if no email is found
        }
    }, [email, navigate]);

    if (!email) {
        return null; // Prevent rendering if no email is available
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/re-enable',
                { email, otp },
                { withCredentials: true }
            );

            const { hasCompletedAssessment } = response.data.user;

            // ✅ Redirect based on assessment completion
            if (hasCompletedAssessment) {
                navigate('/whosusing');
            } else {
                navigate('/getstarted');
            }

        } catch (err) {
            console.error('Re-enable error:', err);
            setError(err.response?.data?.error || 'Failed to verify OTP');
        } finally {
            setLoading(false);
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
                                Re-enable Your Account
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 4, mt: 2, fontFamily: 'Poppins' }}>
                                A reactivation code has been sent to <strong>{email}</strong>.
                                Please enter the code below to enable your account.
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit} noValidate>
                                <TextField
                                    fullWidth
                                    name="otp"
                                    label="Reactivation Code"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    sx={{ mb: 3 }}
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
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default ReEnable;
