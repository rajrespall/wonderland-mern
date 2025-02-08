import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CssBaseline,
  MenuItem,
  IconButton
} from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Logo from "../assets/logo_blue.png"; 
import MediaCard from "../components/Assess";
import Spinner from "../components/Spinner";

const Assessment = () => {
  const [loading, setLoading] = useState(true);
  const [diagnosisYear, setDiagnosisYear] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const years = [];
  for (let year = 2000; year <= new Date().getFullYear(); year++) {
    years.push(year);
  }


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: 'rgba(4, 87, 164, 0.1)',
          paddingLeft: 5,
          paddingRight: 5
        }}
      >

          <IconButton
            href="/getstarted"
            sx={{
              textTransform: "none",
              mb: '600px',
              marginRight: '1180px',
              position: 'absolute',
              borderRadius:'30px',
              color: "#5da802",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            <KeyboardBackspaceRoundedIcon fontSize="inherit" />
          </IconButton>

        <Box sx={{ width: "50%", padding: '80px'}}>
          <MediaCard />
          <Typography
            variant="body1"
            sx={{
              color: "#0457a4",
              mt: 2,
              fontFamily: 'Poppins',
              fontSize: '20px',
              mr: 2
            }}
          >
            Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed.
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            width: "500px",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center",
            backgroundColor: "white",
            ml: '100px'
          }}
        >
          <Box component="img" src={Logo} alt="Wonderland Logo" sx={{ width: "250px", mb: 2 }} />

          <TextField
            fullWidth
            name="name"
            label="Child's full name"
            InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } }}
            InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', } }}
            sx={textFieldStyles}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DatePicker
                label="Date of birth"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params}/>}
                
                sx={{
                  mb: 3,
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiInputLabel-root': {
                    color: '#5da802',
                    fontFamily: 'Poppins', 
                    fontWeight: 600,
                    fontSize: '16px', 
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#0457a4',
                      borderWidth: '2px',
                      borderRadius: '50px'
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
            </Box>
          </LocalizationProvider>

          <TextField
            fullWidth
            name="gender"
            label="Gender"
            InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } }}
            InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', } }}
            sx={textFieldStyles}
          />

          <TextField
            select
            fullWidth
            label="When was your child diagnosed with autism?"
            value={diagnosisYear}
            onChange={(e) => setDiagnosisYear(e.target.value)}
            sx={textFieldStyles}
            InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } }}
            InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', } }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>

          <Button
            href='/communication'
            variant="contained"
            fullWidth
            sx={{
              mt:3,
              textTransform: 'none',
              fontFamily: 'Poppins',
              fontSize: '14px',
              backgroundColor: "#5da802",
              color: "#fcf230",
              borderRadius: "20px",
              width: '100%',
              padding: "10px 20px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            endIcon={<ArrowForwardRoundedIcon />}
          >
            Next page
          </Button>
        </Paper>
      </Box>
    </>
  );
};

const textFieldStyles = {
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
};

export default Assessment;
