import React from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";

const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {['Dashboard', 'Analytics', 'Settings'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Store Analytics
        </Typography>

        {/* Charts Section */}
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Sales Over Time</Typography>
            <LineChart
              xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr"] }]}
              series={[{ data: [30, 50, 40, 70] }]}
              width={400}
              height={300}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Sales Distribution</Typography>
            <PieChart
              series={[{ data: [{ value: 50, label: "Product A" }, { value: 30, label: "Product B" }] }]}
              width={300}
              height={300}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
