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
      <Box sx={{ p: 3, borderRadius: 3, bgcolor: "white", boxShadow: "none" }}>
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

        <Box display="flex" gap={1} mt={2}>
          <Button variant="contained" startIcon={<Message />}
           sx={{
            bgcolor: "#0457a4",
            borderRadius: '25px',
            fontFamily: 'Poppins',
          }}>Edit Profile</Button>
          <Button variant="outlined" startIcon={<Group />}
           sx={{
            bgcolor: "white",
            borderRadius: '25px',
            fontFamily: 'Poppins',
          }}>View Child Details</Button>
          {/* <Button variant="text" color="error" startIcon={<Report />}>Report User</Button> */}
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
            }}>Timeline Content</Typography>
          <Typography variant="body2"
          sx={{
            fontFamily: 'Poppins',
          }}>This is where the timeline content goes.</Typography>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Typography variant="h6" fontWeight="bold">Contact Information</Typography>
          <Typography variant="body2">Phone: <Link href="tel:+1234567890">+1 234 567 890</Link></Typography>
          <Typography variant="body2">Address: 5341 E 65th Street, New York, NY 10681</Typography>
          <Typography variant="body2">E-mail: <Link href="mailto:hello@rsmarquetech.com">hello@rsmarquetech.com</Link></Typography>
          <Typography variant="body2">Site: <Link href="https://www.rsmarquetech.com" target="_blank">www.rsmarquetech.com</Link></Typography>

        </CustomTabPanel>
      </Box>
  );
}
