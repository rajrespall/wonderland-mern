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
  Alert
} from '@mui/material';
import autism from '../../assets/autismElements/5.png';
import axios from 'axios';

const MyDonations = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', newDonation.category);
    if (newDonation.donationReceipt) {
      formData.append('donationReceipt', newDonation.donationReceipt);
    }

    try {
      await axios.post(`http://localhost:5000/api/donations`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Donation created successfully!');
      setSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to create donation.');
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <CssBaseline />
        <Card sx={{ display: 'flex', boxShadow: 5, overflow: 'hidden', width: '100%', height: '80vh' }}>
          {/* Left Side */}
          <Box
            sx={{
              width: '50%',
              background: 'white',
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
            <Box sx={{width: '80%', margin: 'auto', boxShadow: 2, borderRadius: '30px', p: 5, backgroundImage: 'linear-gradient(to top , #badeff, #fff)'}}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#0457a4', mb: 4, fontFamily: 'Poppins', textAlign: 'center' }}>
              Contribute to the Community!
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 500 }}>
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

              <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 500 }}>
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
                  '&:hover': { color: '#fcf230', backgroundColor: '#5da802' }
                }}
              >
                Donate
              </Button>
            </Box>
            </Box>
          </Box>
        </Card>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyDonations;