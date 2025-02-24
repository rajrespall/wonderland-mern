import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, Button, Paper, Divider, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, } from "@mui/material";
import { AccountCircle, RateReview, BarChart, SwitchAccount, CheckCircleOutline } from "@mui/icons-material";
import "@fontsource/poppins";

import ProgressCharts from "./ProgressCharts";
import ProfileDetails from "./ProfileDetails";
import PageReviews from "./PageReviews";

const buttonStyles = (active) => ({
  width: '100%',
  height: '40px',
  borderRadius: '20px',
  border: '2px solid yellow',
  fontFamily: 'Poppins',
  fontWeight: '400',
  justifyContent: 'left',
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
  const [activeSection, setActiveSection] = useState("Profile"); 
  const [openDialog, setOpenDialog] = useState(false); 
  const navigate = useNavigate(); 

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Profile":
        return <ProfileDetails />;
      case "PageReviews":
        return <PageReviews />;
      case "Progress":
        return <ProgressCharts />;
      default:
        return <ProfileDetails />;
    }
  };

  const handleSwitchAccount = () => {
    setOpenDialog(true);  
  };

  const confirmSwitchAccount = () => {
    setOpenDialog(false);
    navigate("/whosusing"); 
  };

  const cancelSwitchAccount = () => {
    setOpenDialog(false);
  };


  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: "635px" }}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100%",
          bgcolor: "#fff",
          borderRadius: '30px',
          p: 2
        }}
      >
        <Paper elevation={3} sx={{ width: "250px", p: 2, borderRadius: 3, bgcolor: 'transparent', boxShadow: 'none' }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 150, height: 150 }} />
            <Typography sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins", fontSize: '15px' }}>
              Diana Carreon
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ color: "rgb(4, 87, 164, .6)", fontFamily: "Poppins" }}>
              Parent
            </Typography>
            <Divider sx={{ width: "100%", my: 2 }} />
            <Button variant="contained" fullWidth sx={buttonStyles(activeSection === "Profile")} startIcon={<AccountCircle />} onClick={() => setActiveSection("Profile")}>
              Profile
            </Button>
            <Button variant="contained" fullWidth sx={buttonStyles(activeSection === "PageReviews")} startIcon={<RateReview />} onClick={() => setActiveSection("PageReviews")}>
              Page Reviews
            </Button>
            <Button variant="contained" fullWidth sx={buttonStyles(activeSection === "Progress")} startIcon={<BarChart />} onClick={() => setActiveSection("Progress")}>
              Progress
            </Button>
            <Button variant="contained" fullWidth sx={buttonStyles(false)} startIcon={<SwitchAccount />} onClick={handleSwitchAccount}>
              Switch Account
            </Button>
          </Box>
        </Paper>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        <Box sx={{ flexGrow: 1, p: 2 }}>
          {renderActiveSection()}
        </Box>
      </Box>

    <Dialog
      open={openDialog}
      onClose={cancelSwitchAccount}
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: 4,
          backgroundColor: '#fff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          maxWidth: '400px',
          textAlign: 'center',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <CheckCircleOutline sx={{ fontSize: 60, color: '#0457a4' }} />
      </Box>

      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '20px', color: '#0457a4' }}>
        Confirm Switch
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ color: '#333', fontSize: '16px', mb: 2 }}>
          Are you sure you want to switch accounts? You will be redirected to the account selection page.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          onClick={confirmSwitchAccount}
          variant="contained"
          sx={{
            backgroundColor: '#0457a4',
            color: '#fff',
            width: '100%',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#033f7a',
            },
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={cancelSwitchAccount}
          sx={{
            color: '#0457a4',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>

    </Container>
  );
}
