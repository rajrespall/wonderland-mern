import React, { useState } from 'react';
import { CssBaseline, Box, AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import { Search, AccountCircle, Reviews } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Sidebar from '../../components/Admin/SideBar';
import DashboardCharts from '../../components/Admin/Dashboard';
import AdminReviews from '../../components/Admin/Reviews';
import Donations from '../../components/Donations';

const drawerWidth = 260;

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  width: '250px',
  display: 'flex',
  alignItems: 'center',
  padding: '4px 10px',
  border: '2px solid #003366',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const AdminHome = () => {
  const [currentView, setCurrentView] = useState('Dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <DashboardCharts />;
      case 'Reviews':
        return <AdminReviews />;
      case 'Donations':
        return <Donations />;
      case 'Reports':
        return <div>Reports/Analytics Content</div>;
        default:  
          return <DashboardCharts />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          width: `calc(100% - ${drawerWidth}px)`, 
          ml: `${drawerWidth}px`, 
          bgcolor: '#DCEAF7', 
          color: 'black', 
          boxShadow: 'none' 
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            noWrap 
            sx={{ 
              fontWeight: 'bold', 
              color: '#0457a4' 
            }}
          >
            DASHBOARD
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchBar sx={{ borderRadius: '25px' }}>
            <Search sx={{ color: '#003366' }} />
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBar>
          <IconButton color="inherit">
            <AccountCircle sx={{ fontSize: 32 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Sidebar currentView={currentView} onButtonClick={setCurrentView} />

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          bgcolor: '#DCEAF7', 
          p: 3 
          
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminHome;