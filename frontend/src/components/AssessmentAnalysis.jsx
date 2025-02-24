import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const AssessmentAnalysis = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 8 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#0457a4', fontFamily: 'Poppins' }}>
        Assessment Analysis
      </Typography>
      
      <Grid container spacing={2}>
        {analysis.priorityAreas.map((area) => (
          <Grid item xs={12} sm={6} key={area}>
            <Box
              sx={{
                p: 2,
                borderRadius: 4,
                bgcolor: 'rgba(4, 87, 164, 0.1)',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5da802' }}>
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </Typography>
              <Typography variant="body2">
                Recommended focus area based on assessment results
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AssessmentAnalysis;