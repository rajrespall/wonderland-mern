import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Link,
  Icon,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';
import "@fontsource/poppins";
import logo from '../assets/logo_blue.png';
import pagkaki from '../assets/login.png';
import squirrel from '../assets/sq_twohands.png';
import Background from '../assets/bg_signin.png';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import Spinner from '../components/Spinner'; 
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '35px',
  backgroundColor: 'white',
  color: 'black',
  textAlign: 'center',
  boxShadow: 3,
}));


const StyledTextField = styled(TextField)(({ theme }) => ({
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
}));
const StyledErrorTextField = styled(TextField)(({ theme }) => ({
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
  '&.error': {
    '& .MuiOutlinedInput-root fieldset': {
      borderColor: 'red !important',
      boxShadow: '0px 0px 10px rgba(255, 0, 0, 0.5)',
    }
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  mt: 2,
  backgroundColor: '#0457a4',
  borderColor: '#5da802',
  borderRadius: '30px',
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: 'Poppins',
  textTransform: 'none',
  height: '50px',
  color: '#fcf230',
  '&:hover': {
    color: '#5da802',
    backgroundColor: 'transparent',
  },



}));

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, googleLogin, loading, error } = useAuthStore();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
  }, []);


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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await login(formData.email, formData.password);

  //     if (response.requireReEnable) {
  //       console.log("User is inactive, redirecting to /re-enable");
  //       navigate('/re-enable', { state: { email: response.email } });
  //       return;
  //     }

  //     if (response.requireVerification) {
  //       navigate('/verify-email', { state: { email: response.email } });
  //       return;
  //     }

  //     if (response.isFirstLogin) {
  //       navigate('/getstarted');
  //     } else {
  //       navigate('/whosusing');
  //     }
  //   } catch (err) {
  //     console.error('Login error:', err);
  //   }
  // };

  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const response = await googleLogin(idToken);

     
      if (response.requireReEnable) {
        console.log("User is inactive, redirecting to /re-enable");
        navigate('/re-enable', { state: { email: response.email } });
        return;
      }

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

  if (isPageLoading) {
    return (
        <Spinner />
    );
  }

  return (
    <>
      <CssBaseline />
      <StyledBox>
        <Grid container spacing={4} alignItems="center" justifyContent="center" position='relative' sx={{ px: 2 }}>
          <Grid item xs={12} sm={10} md={6} lg={4} sx={{ marginRight: "300px" }}>
            <img src={squirrel} alt="Squirrel" style={{ height: '400px', position: 'absolute', marginTop: "170px", marginLeft: "420px" }} />
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <Box component="a" href="/">
                  <img src={logo} width="70%" alt="Logo" />
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 5, color: '#5da802', fontWeight: 750, fontFamily: "Poppins", fontSize: "24px" }}>
                  <Icon sx={{ mr: 1 }}>
                    <LockIcon sx={{ fontSize: '27px', fontWeight: 'bold', color: '#0457a4' }} />
                  </Icon>
                  SIGN IN
                </Typography>

                {/* Formik Form */}
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = await login(values.email, values.password);

                      if (response.requireReEnable) {
                        navigate('/re-enable', { state: { email: response.email } });
                      } else if (response.requireVerification) {
                        navigate('/verify-email', { state: { email: response.email } });
                      } else if (response.isFirstLogin) {
                        navigate('/getstarted');
                      } else {
                        navigate('/whosusing');
                      }
                    } catch (error) {
                      console.error("Login error:", error);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form noValidate style={{ marginTop: "1rem" }}>
                      {/* Email Field */}
                      <Field
                        as={StyledTextField}
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        className={errors.email && touched.email ? "error" : error ? "error" : ""}
                        InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } }}
                        InputProps={{
                          style: {
                            color: 'black',
                            borderRadius: '50px',
                            borderColor: errors.email && touched.email ? 'red' : error ? 'red' : '#0457a4',
                            boxShadow: errors.email && touched.email ? '0px 0px 10px rgba(255, 0, 0, 0.5)' : error ? '0px 0px 10px rgba(255, 0, 0, 0.5)' : 'none',
                          }
                        }}
                      />
                      <ErrorMessage name="email" component="div" style={{ color: "red", fontSize: "12px", marginBottom: "10px" }} />

                      {/* Password Field */}
                      <Field
                        as={StyledTextField}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        className={errors.password && touched.password ? "error" : error ? "error" : ""}
                        InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } }}
                        InputProps={{
                          style: {
                            color: 'black',
                            borderRadius: '50px',
                            borderColor: errors.password && touched.password ? 'red' : error ? 'red' : '#0457a4',
                            boxShadow: errors.password && touched.password ? '0px 0px 10px rgba(255, 0, 0, 0.5)' : error ? '0px 0px 10px rgba(255, 0, 0, 0.5)' : 'none',
                          }
                        }}
                        sx={{ mb: 1, mt: 2 }}
                      />
                      <ErrorMessage name="password" component="div" style={{ color: "red", fontSize: "12px", marginBottom: "10px" }} />

                      {/* Forgot Password Link */}
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

                      {/* Display Incorrect Login Error */}
                      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

                      {/* Sign Up Link */}
                      <Typography variant="body2" align="center" sx={{ color: '#5da802', fontFamily: 'Poppins', fontSize: '14px', mt: 2, mb: 2 }}>
                        Don't have an account?{' '}
                        <Link href="/register" fontWeight="bold" sx={{ color: '#5da802' }}>
                          Sign Up
                        </Link>
                      </Typography>

                      {/* Submit Button */}
                      <StyledButton type="submit" variant='outlined' fullWidth disabled={isSubmitting || loading}>
                        {isSubmitting || loading ? 'Signing in...' : 'Sign In'}
                      </StyledButton>
                    </Form>
                  )}
                </Formik>


                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <StyledButton
                    onClick={handleGoogleLogin}
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    sx={{
                      backgroundColor: '#5da802',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <GoogleIcon sx={{ marginRight: 2 }} />
                    Sign in with Google
                  </StyledButton>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={10} md={6} lg={4}>
            <Box textAlign="right" sx={{ mt: 15 }}>
              <Box sx={{ marginBottom: "220px" }}>
                <img src={pagkaki} alt="Pagkaki" style={{ maxWidth: '90%', marginLeft: "60px" }} />
                <Typography sx={{ color: 'white', mb: 3, mt: 4, fontFamily: "Poppins", fontSize: "18px", textAlign: 'justify' }}>
                  Welcome Back to Wonderland! We're happy to see you again. Log in to continue your fun learning adventure. If you need help, ask a grown-up or contact us!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </StyledBox>
    </>
  );
};


export default LoginPage;