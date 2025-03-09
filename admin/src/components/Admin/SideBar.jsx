import React from 'react';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/logo_red.png';
import useAdminStore from "../../../Store/adminStore"; 
import { useNavigate } from "react-router-dom";

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

const Sidebar = ({ currentView, onButtonClick }) => {
  const logout = useAdminStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    navigate("/login"); 
  };
  return (
    <SidebarContainer>
      <img src={logo} width="80%" alt="Logo" />
      <Typography variant="h6"
        sx={{ 
          fontFamily: 'Poppins', 
          fontWeight: 'bold',
          fontSize: '15px',
          mb: 2,
          mt: 3 
        }}
      >
        Admin
      </Typography>
      <List 
      sx={{ 
        fontSize: '14px', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
        }}>
        {/* <StyledButton onClick={() => onButtonClick('Dashboard')} active={currentView === 'Dashboard'}>Dashboard</StyledButton> */}
        <StyledButton onClick={() => onButtonClick('Reviews')} active={currentView === 'Reviews'}>Reviews</StyledButton>
        <StyledButton onClick={() => onButtonClick('Institutions')} active={currentView === 'Institutions'}>Institutions</StyledButton>
        <StyledButton onClick={() => onButtonClick('Donations')} active={currentView === 'Donations'}>Donations</StyledButton>
        <StyledButton onClick={() => onButtonClick('Users')} active={currentView === 'Users'}>Users</StyledButton>
        <StyledButton onClick={() => onButtonClick('Charts')} active={currentView === 'Charts'}>Charts</StyledButton>
        {/* <StyledButton onClick={() => onButtonClick('Reports')} active={currentView === 'Reports'}>Reports</StyledButton> */}
      </List>
      <Box>
        <StyledButton
          sx={{
            fontSize: "14px",
            mt: "240px",
            width: "221px",
          }}
          onClick={handleLogout} 
        >
          Logout
        </StyledButton>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;