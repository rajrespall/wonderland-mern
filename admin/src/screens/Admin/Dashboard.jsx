import React, { useState } from 'react';
import { CssBaseline, Box, AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { Search, AccountCircle } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Sidebar from '../../components/Admin/SideBar';
import AdminReviews from '../../components/Admin/Reviews';
import Donations from '../../components/Admin/Donations';
import Charts from '../../components/Admin/Charts';
import Institution from '../../components/Admin/Institution';
import Users from '../../components/Admin/Users';

const drawerWidth = 220;

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const AdminHome = () => {
  const [currentView, setCurrentView] = useState('Dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'Reviews':
        return <AdminReviews />;
      case 'Donations':
        return <Donations />;
      case 'Charts':
        return <Charts />;
      case 'Institutions':
        return <Institution />;
      case 'Users':
        return <Users />;
      default:
        return <Charts />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Sidebar currentView={currentView} onButtonClick={setCurrentView} />

      <Box sx={{ flexGrow: 1, ml: `${drawerWidth}px` }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            width: `calc(100% - ${drawerWidth}px)`, 
            ml: `${drawerWidth}px`, 
            bgcolor: '#fff', 
            color: 'black', 
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: '#0457a4', fontFamily: 'Poppins' }}>
              {currentView}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Avatar sx={{ bgcolor: '#0457a4'}}>A</Avatar>          
            </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, bgcolor: '#DCEAF7', p: 3, mt: 8, minHeight: '100vh' }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
