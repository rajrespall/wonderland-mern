import React from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, TextField, IconButton, Grid, Paper, Avatar, InputBase } from '@mui/material';
import { Dashboard, Reviews, People, InsertChart, BarChart, ExitToApp, Search, AccountCircle } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const drawerWidth = 240;

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'lightblue', color: 'black' }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchBar>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBar>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'darkblue',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {['Dashboard', 'Reviews', 'Donations', 'Reports/Analytics', 'Logout'].map((text, index) => (
            <ListItem button key={text} sx={{ borderRadius: 2, margin: 1, bgcolor: 'rgba(255, 255, 255, 0.1)' }}>
              <ListItemIcon sx={{ color: 'yellow' }}>
                {index === 0 && <Dashboard />}
                {index === 1 && <Reviews />}
                {index === 2 && <People />}
                {index === 3 && <InsertChart />}
                {index === 4 && <ExitToApp />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: index === 0 ? 'yellow' : 'white' }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'lightblue', p: 3 }}
      >
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'white', color: 'green', borderRadius: 2 }}>
              <Typography variant="h6">Reviews</Typography>
              <Typography variant="h4">34</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'white', color: 'orange', borderRadius: 2 }}>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4">1,234</Typography>
              <People sx={{ fontSize: 40, color: 'green' }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'white', color: 'orange', borderRadius: 2 }}>
              <Typography variant="h6">Donations</Typography>
              <Typography variant="h4">5,000</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'white', color: 'green', borderRadius: 2 }}>
              <Typography variant="h6">Admins</Typography>
              <Typography variant="h4">3</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
              <Typography variant="h6">Line Graph</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
              <Typography variant="h6">Pie Chart</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
              <Typography variant="h6">Bar Chart</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
