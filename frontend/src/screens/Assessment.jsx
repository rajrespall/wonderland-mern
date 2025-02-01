import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CssBaseline,
  MenuItem
} from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Logo from "../assets/logo_blue.png"; 
import MediaCard from "../components/Assess";

const Assessment = () => {
  const [diagnosisYear, setDiagnosisYear] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const years = [];
  for (let year = 2000; year <= new Date().getFullYear(); year++) {
    years.push(year);
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
          paddingLeft: 10,
          paddingRight: 10
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#5da802",
            textTransform: "none",
            mb: '640px',
            marginRight: '1180px',
            fontWeight: 'bold',
            position: 'absolute',
            borderRadius:'30px',
          }}
        />

        <Box sx={{ width: "50%", padding: '20px'}}>
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
            endIcon={<ArrowForwardIcon />}
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
