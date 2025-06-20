import React from 'react';
import { Box, List, ListItemButton, Typography, TextField, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/logo_blue.png';
import useAdminStore from '../../../Store/adminStore';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, ReviewsOutlined, AccountBalanceOutlined, VolunteerActivismOutlined, PeopleOutlined, BarChartOutlined, LogoutOutlined } from '@mui/icons-material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const SidebarContainer = styled(Box)({
  width: 220,
  height: '100vh',
  backgroundColor: '#ffffff',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  padding: '15px',
  boxShadow: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  overflow: 'hidden',
  zIndex: 1200
});

const StyledButton = styled(ListItemButton)(({ active }) => ({
  width: '100%',
  height: '45px',
  margin: '6px 0',
  borderRadius: '8px',
  justifyContent: 'flex-start',
  color: active ? '#ffffff' : '#333',
  backgroundColor: active ? '#0457a4' : 'transparent',
  '&:hover': {
    backgroundColor: active ? '#0457a4' : '#f5f5f5',
  },
  fontSize: '14px',
  fontWeight: '500',
  paddingLeft: '15px',
  fontFamily: 'Poppins' 
}));

const Sidebar = ({ currentView, onButtonClick }) => {
  const logout = useAdminStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <SidebarContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '5px', }}>
        <img src={logo} width='160' alt='Logo' />
      </Box>
      <List sx={{ width: '100%', flexGrow: 1, mt: 3 }}>
        <StyledButton onClick={() => onButtonClick('Dashboard')} active={currentView === 'Dashboard'}>
          <HomeOutlined sx={{ marginRight: 1 }} /> Dashboard
        </StyledButton>
        <Divider sx={{ width: '100%', mt: 2 }} />

        <StyledButton onClick={() => onButtonClick('Reviews')} active={currentView === 'Reviews'}>
          <ReviewsOutlined sx={{ marginRight: 1 }} /> Reviews
        </StyledButton>
        <StyledButton onClick={() => onButtonClick('Institutions')} active={currentView === 'Institutions'}>
          <AccountBalanceOutlined sx={{ marginRight: 1 }} /> Institutions
        </StyledButton>
        <StyledButton onClick={() => onButtonClick('Donations')} active={currentView === 'Donations'}>
          <VolunteerActivismOutlined sx={{ marginRight: 1 }} /> Donations
        </StyledButton>
        <StyledButton onClick={() => onButtonClick('Resources')} active={currentView === 'Resources'}>
          <LibraryBooksIcon sx={{ marginRight: 1 }} /> Resources
        </StyledButton>    
        <Divider sx={{ width: '100%', mt: 2 }} />
        <StyledButton onClick={() => onButtonClick('Users')} active={currentView === 'Users'}>
          <PeopleOutlined sx={{ marginRight: 1 }} /> Users
        </StyledButton>
        <StyledButton onClick={() => onButtonClick('Charts')} active={currentView === 'Charts'}>
          <BarChartOutlined sx={{ marginRight: 1 }} /> Charts
        </StyledButton>
      </List>
      <Divider sx={{ width: '100%', mt: 2 }} />

      <Box sx={{ paddingTop: '10px' }}>
        <StyledButton onClick={handleLogout}>
          <LogoutOutlined sx={{ marginRight: 1 }} /> Logout
        </StyledButton>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;
