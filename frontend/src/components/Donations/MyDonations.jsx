import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputAdornment,
  CssBaseline,
} from '@mui/material';
import axios from 'axios';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import gcashLogo from '../../assets/gcash.png';  
import paymayaLogo from '../../assets/maya.png';

const MyDonations = () => {
  const [message, setMessage] = useState('');
  const [newDonation, setNewDonation] = useState({
    donationAmount: '',
    paymentMethod: '', 
    donationReceipt: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonation((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewDonation((prev) => ({ ...prev, donationReceipt: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('donationAmount', newDonation.donationAmount);
    formData.append('paymentMethod', newDonation.paymentMethod);

    if (newDonation.donationReceipt instanceof File) {
      formData.append('donationReceipt', newDonation.donationReceipt);
    }

    try {
      await axios.post(`http://localhost:5000/api/donations`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setMessage('Donation created successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to create donation.');
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', alignItems: 'center' }}>
          <Card sx={{ borderRadius: '35px', textAlign: 'center', boxShadow: 3, p: 3, width: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 750, color: '#5da802', mb: 3, fontFamily: 'Poppins' }}>
                MAKE A DONATION
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                name="donationAmount"
                label="Amount"
                type="number"
                placeholder='Donation Amount'
                value={newDonation.donationAmount}
                onChange={handleChange}
                InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" },}}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <AttachMoneyIcon sx={{ color: '#0457a4' }} />
                    </InputAdornment>
                    ),
                    style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', fontFamily: "Poppins", fontSize: "16px"},
                }}
                sx={{ mb: 3, borderRadius: '50px' }}
                required
            />

                <FormControl component="fieldset">
                  <Typography variant="h6" sx={{ color: '#0457a4', fontWeight: 600, mb: 1 }}>
                    Select Payment Method
                  </Typography>
                  <RadioGroup row name="paymentMethod" value={newDonation.paymentMethod} onChange={handleChange}
                  sx={{
                    mb: 3
                  }}>
                    <FormControlLabel
                      value="GCash"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img src={gcashLogo} alt="Gcash" width={100} style={{ marginRight: '10px' }} />
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="PayMaya"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img src={paymayaLogo} alt="PayMaya" width={120} style={{ marginRight: '10px' }} />
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{
                        backgroundColor: 'transparent',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        height: '50px',
                        color: '#5da802',
                        '&:hover': {
                        color: '#fcf230',
                        backgroundColor: '#0457a4',
                        boxShadow: 'none'
                        },
                    }}>
                    <CloudUploadIcon sx={{ mr: 1 }} /> Upload Receipt
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 2,
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
                  Submit Donation
                </Button>
              </Box>

              {message && (
                <Typography sx={{ mt: 2, color: message.includes('successfully') ? 'green' : 'red' }}>
                  {message}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default MyDonations;
