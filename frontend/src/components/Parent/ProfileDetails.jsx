import React, { useState } from "react";
import { Container, Box, Typography, Avatar, Button, Divider, Link, Tabs, Tab } from "@mui/material";
import { LocationOn, Star, Message, Group, Report } from "@mui/icons-material";

function CustomTabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UserProfileCard() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box sx={{ borderRadius: 3, bgcolor: "white", boxShadow: "none" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 60, height: 60 }} />
          <Box >
            <Typography variant="h6" fontWeight="bold"
            sx={{
              fontFamily: 'Poppins',
            }}>Diana Carreon</Typography>
            <Typography variant="body2" color="primary"
            sx={{
              fontFamily: 'Poppins',
            }}>carreondianaaa@gmail.com  </Typography>
            <Typography variant="body2" color="textSecondary" display="flex" alignItems="center"
            sx={{
              fontFamily: 'Poppins',
            }}>
              <LocationOn fontSize="small" sx={{ mr: 0.5 }} /> Moonwalk, Parañaque
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

       <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          <Tab label="MY ABOUT" />
          <Tab label="CHILD DETAILS" />
          <Tab label="SETTINGS" />
        </Tabs>

        <Divider sx={{ my: 2 }} />

        <CustomTabPanel value={value} index={0}>
          <Typography variant="h6" fontWeight="bold" sx={{
              fontFamily: 'Poppins',
            }}>Profile Details</Typography>
          <Typography variant="body2"
          sx={{
            fontFamily: 'Poppins',
          }}>This is where the profile details goes.</Typography>

        <Button variant="contained" startIcon={<Message />}
           sx={{
            bgcolor: "#0457a4",
            borderRadius: '25px',
            fontFamily: 'Poppins',
            mt: 2
          }}>Edit Profile</Button>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
        <Typography variant="h6" fontWeight="bold" sx={{
              fontFamily: 'Poppins',
            }}>Child Details</Typography>
          <Typography variant="body2"
          sx={{
            fontFamily: 'Poppins',
          }}>This is where the child details goes.</Typography>

          <Button variant="contained" startIcon={<Message />}
           sx={{
            bgcolor: "#0457a4",
            borderRadius: '25px',
            fontFamily: 'Poppins',
            mt: 2
          }}>Edit Child Details</Button>
          

        </CustomTabPanel>
      </Box>
  );
}
