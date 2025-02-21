import React from "react";
import { Box, Typography, Avatar, Button, Paper, Divider, Container } from "@mui/material";
import { AccountCircle, RateReview, BarChart, SwitchAccount } from "@mui/icons-material";
import ProgressCharts from "./ProgressCharts";

const buttonStyles = (active) => ({
  width: '100%',
  height: '40px',
  borderRadius: '20px',
  border: '2px solid yellow',
  fontFamily: 'Poppins', 
  fontWeight: '400',
  justifyContent: 'center',
  backgroundColor: active ? 'yellow' : 'transparent',
  borderColor: active ? '#b80201' : '#0457a4',
  color: active ? '#b80201' : '#0457a4',
  '&:hover': {
    backgroundColor: active ? 'transparent' : '#fcf230',
    color: active ? '#0457a4' : '#b80201',
    borderColor: active ? '#fcf230' : '#b80201'
  }
});

export default function ProfilePage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4, height: "635px" }}>
      <Box 
      sx={{ 
        display: "flex", 
        height: "100%", 
        bgcolor: "#fff", 
        borderRadius: 3, 
        p: 2 }}>

        <Paper elevation={3} sx={{ width: "250px", p: 2, borderRadius: 3, bgcolor: 'transparent', boxShadow: 'none'}}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 80, height: 80 }} />
            <Typography
            sx={{
              fontWeight:"bold",
              color: "#0457a4",
              fontFamily: "Poppins",
              fontSize: '15px'
            }}>
              Diana Carreon</Typography>
            <Typography variant="body2" color="textSecondary"
            sx={{
              color: "rgb(4, 87, 164, .6)",
              fontFamily: "Poppins",
            }}>
              Parent</Typography>
            <Divider sx={{ width: "100%", my: 2 }} />
            <Button variant="outlined" fullWidth sx={buttonStyles(false)} startIcon={<AccountCircle />}>Profile</Button>
            <Button variant="outlined" fullWidth sx={buttonStyles(false)} startIcon={<RateReview />}>Page Reviews</Button>
            <Button variant="contained" fullWidth sx={buttonStyles(true)} startIcon={<BarChart />}>Progress</Button>
            <Button variant="outlined" fullWidth sx={buttonStyles(false)} startIcon={<SwitchAccount />}>Switch Account</Button>
          </Box>
        </Paper>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        {/* Main Content ng Container Dito*/}
        <ProgressCharts />
      </Box>
    </Container>
  );
}
