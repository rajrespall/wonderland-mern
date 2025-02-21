import React from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Grid, Paper, Avatar } from '@mui/material';
import { Dashboard, Reviews, People, BarChart, InsertChart, ExitToApp, Search, AccountCircle } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Sidebar from '../../components/Admin/SideBar';
import DashboardCharts from '../../components/Admin/Dashboard';

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

const AdminHome = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: '#DCEAF7', color: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: '#0457a4' }}>
            DASHBOARD
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchBar>
            <Search sx={{ color: '#003366' }} />
          </SearchBar>
          <IconButton color="inherit">
            <AccountCircle sx={{ fontSize: 32 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#DCEAF7', p: 3 }}>
        <Toolbar />
        <DashboardCharts />
      </Box>
    </Box>
  );
};

export default AdminHome;