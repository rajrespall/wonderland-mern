import React from 'react';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/logo_red.png'

const SidebarContainer = styled(Box)({
  width: 260,
  height: '100vh',
  backgroundColor: '#0457a4',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
});

const StyledButton = styled(ListItemButton)(({ active }) => ({
  width: '85%',
  height: '40px',
  margin: '10px 0',
  borderRadius: '20px',
  border: '2px solid yellow',
  fontFamily: 'Poppins', 
  fontWeight: '400',
  justifyContent: 'center',
  backgroundColor: active ? 'yellow' : 'transparent',
  borderColor: active ? '#b80201' : '#fcf230',
  color: active ? '#b80201' : 'white',
  '&:hover': {
    backgroundColor: active ? 'transparent' : '#fcf230',
    color: active ? 'white' : '#b80201',
    borderColor: active ? '#fcf230' : '#b80201'
  },
}));

const Sidebar = () => {
  return (
    <SidebarContainer>
        <img src={logo} width="80%" alt="Logo" />
      <Typography variant="h6"
      sx={{ 
        fontFamily: 'Poppins', 
        fontWeight: '500',
        fontSize: '18px',
        mb: 2,
        mt: 3 }}>
        Admin
      </Typography>
      <List sx={{ fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <StyledButton active>Dashboard</StyledButton>
        <StyledButton>Reviews</StyledButton>
        <StyledButton>Donations</StyledButton>
        <StyledButton>Reports/ Analytics</StyledButton>
      </List>
      <Box>

      <StyledButton
      sx={{
        fontSize: '14px',
        mt: "290px",
        width: '221px'
      }}>
        Logout</StyledButton>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;
