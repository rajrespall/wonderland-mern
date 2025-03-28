import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  CssBaseline,
  InputLabel,
  Snackbar,
  Alert,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
   Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import autism from '../../assets/autismElements/5.png';
import {motion} from 'framer-motion';
import axios from 'axios';

const MyDonations = () => {
  const { isAuthenticated } = useAuthStore();
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [newDonation, setNewDonation] = useState({
    category: '',
    donationReceipt: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonation((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewDonation((prev) => ({ ...prev, donationReceipt: e.target.files[0] }));
  };


const handleSubmit = (e) => {
  e.preventDefault();
    if (isAuthenticated) {
        handleAuthenticatedDonation(e);
    } else {
        setShowDialog(true); 
    }
};

  const handleAuthenticatedDonation = async (e) => {
    e.preventDefault();

    if (!newDonation.category) {
        setMessage('Please select a category for your donation.');
        setSeverity('warning');
        setOpenSnackbar(true);
        return;
    }

    const formData = new FormData();
    formData.append('category', newDonation.category);
    if (newDonation.donationReceipt) {
        formData.append('donationReceipt', newDonation.donationReceipt);
    }

    try {
        const response = await axios.post('http://localhost:5000/api/donations/user', formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data && response.data.status) {
            setMessage('Donation created successfully!');
            setSeverity('success');
            setNewDonation({ category: '', donationReceipt: null });
        } else {
            setMessage('Unexpected response from the server. Please try again.');
            setSeverity('warning');
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage =
            error.response?.data?.message || 'Failed to create donation. Please try again.';
        setMessage(errorMessage);
        setSeverity('error');
    } finally {
        setOpenSnackbar(true);
    }
};

const handleAnonymousDonation = async () => {
  setShowDialog(false);

  if (!newDonation.category) {
      setMessage('Please select a category for your donation.');
      setSeverity('warning');
      setOpenSnackbar(true);
      return;
  }

  const formData = new FormData();
  formData.append('category', newDonation.category);
  if (newDonation.donationReceipt) {
      formData.append('donationReceipt', newDonation.donationReceipt);
  }

  try {
      console.log("Sending anonymous donation request:", formData);
      const response = await axios.post('http://localhost:5000/api/donations/anonymous', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.status) {
          setMessage('Anonymous donation created successfully!');
          setSeverity('success');
          setNewDonation({ category: '', donationReceipt: null });
      } else {
          setMessage('Unexpected response from the server. Please try again.');
          setSeverity('warning');
      }
  } catch (error) {
      console.error('Error:', error);
      const errorMessage =
          error.response?.data?.message || 'Failed to create anonymous donation. Please try again.';
      setMessage(errorMessage);
      setSeverity('error');
  } finally {
      setOpenSnackbar(true);
  }
};
  return (
    <>
      <CssBaseline />
      
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Card sx={{ display: 'flex', overflow: 'hidden', width: '100%', height: '100vh', boxShadow:'none', }}>
          {/* Left Side */}
          <Box
            sx={{
              width: '50%',
              p: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff'
            }}
          >
            <img
              src={autism}
              alt="Donation"
              style={{ width: '70%'}}
            />
            <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'Poppins', textAlign: 'center', color: '#0457a4', mt: 4 }}>
              Make a Difference!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Poppins', textAlign: 'center', lineHeight: 1.6, color: '#5da802' }}>
              Your donation helps us provide essential supplies, resources, support the community, and create lasting
              positive change.
            </Typography>
          </Box>

          {/* Right Side */}
          <Box sx={{ width: '50%', p: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{width: '80%', margin: 'auto', borderRadius: '30px', p: 5, boxShadow: 2, backgroundImage: '#fff'}}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#0457a4', mb: 4, fontFamily: 'Poppins', textAlign: 'center' }}>
              Contribute to the Community!
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2, 
                fontFamily: 'Poppins', 
                color: isAuthenticated ? '#5da802' : '#0457a4',
                textAlign: 'center'
              }}
            >
              {isAuthenticated ? 
                "You are donating as a registered user" : 
                "You are making an anonymous donation"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 500, color: '#5da802' }}>
                What are you going to donate in-kind?
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#0457a4', borderWidth: '2px' },
                    '&:hover fieldset': { borderColor: '#5da802' },
                    '&.Mui-focused fieldset': { borderColor: '#5da802' }
                  }
                }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newDonation.category}
                  onChange={handleChange}
                  required
                  sx={{ borderRadius: '30px' }}
                >
                  <MenuItem value="Learning Materials">Learning Materials/ Resources</MenuItem>
                  <MenuItem value="Foods">Foods</MenuItem>
                  <MenuItem value="Clothes">Clothes</MenuItem>
                  <MenuItem value="Medical Supplies">Medical Supplies</MenuItem>
                  <MenuItem value="Toys">Toys</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 500, color: '#5da802' }}>
                Attach an image of your donation
              </Typography>
              <TextField
                fullWidth
                type="file"
                onChange={handleFileChange}
                InputLabelProps={{
                  style: { color: '#5da802', fontWeight: 600, fontFamily: 'Poppins', fontSize: '16px' }
                }}
                InputProps={{
                  style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4' }
                }}
                sx={{
                  borderRadius: '30px',
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#0457a4', borderWidth: '2px' },
                    '&:hover fieldset': { borderColor: '#5da802' },
                    '&.Mui-focused fieldset': { borderColor: '#5da802' }
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 4,
                  backgroundColor: '#0457a4',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  fontFamily: 'Poppins',
                  textTransform: 'none',
                  height: '50px',
                  color: '#fcf230',
                  '&:hover': { color: '#5da802', backgroundColor: 'transparent', border: '2px solid #0457a4' }
                }}
              >
                Donate
              </Button>
            </Box>
            </Box>
          </Box>
        </Card>
        </motion.div>

        <Dialog 
         open={showDialog} 
         onClose={() => setShowDialog(false)}
         sx={{
          '& .MuiDialog-paper': {
            borderRadius: 5,
            backgroundColor: '#fff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            width: '80%',
            maxWidth: '600px',
            margin: 'auto'
          }
         }}>
          <DialogTitle sx={{ fontFamily: 'Poppins', color: '#0457a4' }}>
            Making an Anonymous Donation
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: 'Poppins' }}>
              You are not currently logged in. Your donation will be recorded anonymously.
              If you'd like to track your donations, please consider 
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{ ml: 1, color: '#5da802' }}
              >
                logging in
              </Link>.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                handleAnonymousDonation();
              }}
              sx={{
                color: '#0457a4',
                fontFamily: 'Poppins'
              }}
            >
              Continue as Anonymous
            </Button>
            <Button 
              component={RouterLink} 
              to="/login" 
              variant="contained"
              sx={{
                backgroundColor: '#5da802',
                fontFamily: 'Poppins',
                '&:hover': {
                  backgroundColor: '#4a8702'
                }
              }}
            >
              Log In
            </Button>
          </DialogActions>
        </Dialog>


      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyDonations;