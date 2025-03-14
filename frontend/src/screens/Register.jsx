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
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import RegisterNav from '../components/RegNav';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Register = () => {
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
      const response = await register(formData.username, formData.email, formData.password);
      
      // Check if verification is required
      if (response.requireVerification) {
        navigate('/verify-email', { state: { email: response.email } });
        return;
      }
      
      navigate('/getstarted');
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
          position='relative'
          sx={{ px: 2 }}
        >
          <Grid item xs={12} sm={10} md={6} lg={4} sx={{ marginRight: "300px" }}>
            <img src={squirrel} alt="Squirrel" style={{ height: '390px', position: 'absolute', marginTop:"150px", marginLeft: "460px" }} />
            <IconButton href="/login" sx={{ mt: '16px', position: 'absolute', color: '#5da802', marginLeft: '15px', fontSize: '30px' }}>
              <KeyboardBackspaceRoundedIcon fontSize="inherit" />
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
                  SIGN UP
                </Typography>

                {/* Formik Form starts here */}
                <Formik
                  initialValues={{ username: "", email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = await register(values.username, values.email, values.password);
                      if (response.requireVerification) {
                        navigate('/verify-email', { state: { email: response.email } });
                        return;
                      }
                      navigate('/getstarted');
                    } catch (err) {
                      console.error('Registration error:', err);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form noValidate style={{ marginTop: "1rem" }}>
                      {/* Username Field */}
                      <Field
                        as={TextField}
                        fullWidth
                        name="username"
                        label="Username"
                        type="text"
                        className={errors.username && touched.username ? "error" : ""}
                        InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } }}
                        InputProps={{
                          style: {
                            color: 'black',
                            borderRadius: '50px',
                            borderColor: errors.username && touched.username ? 'red' : '#b80201',
                            boxShadow: errors.username && touched.username ? '0px 0px 10px rgba(255, 0, 0, 0.5)' : 'none',
                          }
                        }}
                        sx={{
                          mb: 3,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.username && touched.username ? 'red' : '#b80201',
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
                      <ErrorMessage name="username" component="div" style={{ color: "red", fontSize: "12px", marginBottom: "10px" }} />

                      {/* Email Field */}
                      <Field
                        as={TextField}
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        className={errors.email && touched.email ? "error" : ""}
                        InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } }}
                        InputProps={{
                          style: {
                            color: 'black',
                            borderRadius: '50px',
                            borderColor: errors.email && touched.email ? 'red' : '#b80201',
                            boxShadow: errors.email && touched.email ? '0px 0px 10px rgba(255, 0, 0, 0.5)' : 'none',
                          }
                        }}
                        sx={{
                          mb: 3,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: errors.email && touched.email ? 'red' : '#b80201',
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
                      <ErrorMessage name="email" component="div" style={{ color: "red", fontSize: "12px", marginBottom: "10px" }} />

                      {/* Password Field */}
                      <Field
  as={TextField}
  fullWidth
  name="password"
  label="Password"
  type="password"
  className={errors.password && touched.password ? "error" : ""}
  InputLabelProps={{ 
    style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } 
  }}
  InputProps={{
    style: {
      color: 'black',
      borderRadius: '50px',
      borderColor: errors.password && touched.password ? 'red' : '#b80201',
      boxShadow: errors.password && touched.password ? '0px 0px 10px rgba(255, 0, 0, 0.5)' : 'none',
    }
  }}
  sx={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: errors.password && touched.password ? 'red !important' : '#b80201',
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: errors.password && touched.password ? 'red' : '#5da802',
      },
      '&.Mui-focused fieldset': {
        borderColor: errors.password && touched.password ? 'red' : '#5da802',
      },
    },
  }}
/>
<ErrorMessage name="password" component="div" style={{ color: "red", fontSize: "12px", marginBottom: "10px" }} />


                      {/* Display Server Error */}
                      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

                      {/* Submit Button */}
                      <Button type="submit" fullWidth disabled={isSubmitting || loading}
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
                        }}>
                        {isSubmitting || loading ? 'Creating Account...' : 'Sign Up'}
                      </Button>
                    </Form>
                  )}
                </Formik>
                {/* End Formik Form */}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={10} md={6} lg={4}>
            <Box textAlign="right" sx={{ mt: 15 }}>
              <Box sx={{ marginBottom: "220px" }}>
                <img src={create} alt="Pagkaki" style={{ maxWidth: '90%', marginLeft: "60px" }} />
                <Typography sx={{ color: 'white', mb: 3, mt: 4, fontFamily: "Poppins", fontSize: "18px" }}>
                  Welcome to Wonderland! We are here to help you learn, explore, and have fun in a safe and friendly environment. Our activities are designed to support creativity, problem-solving, and learning at your own pace. Join us today and start your adventure!
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
