import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';

const AssessmentAnalysis = ({ analysis }) => {
  if (!analysis) return null;

  // ISAA color coding based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case "No Autism": return "#4caf50";
      case "Mild Autism": return "#ffeb3b";
      case "Moderate Autism": return "#ff9800";
      case "Severe Autism": return "#f44336";
      default: return "#0457a4";
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 8 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#0457a4', fontFamily: 'Poppins' }}>
        Assessment Analysis (ISAA)
      </Typography>
      
      <Box sx={{ mb: 3, p: 2, borderRadius: 4, bgcolor: 'rgba(4, 87, 164, 0.1)' }}>
        <Typography variant="h6">
          Overall Score: {analysis.totalScore || 0}
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 'bold', 
            color: getCategoryColor(analysis.isaaCategory)
          }}
        >
          Category: {analysis.isaaCategory || "Not Categorized"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Based on Indian Scale for Assessment of Autism (ISAA)
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Priority Areas
      </Typography>
      
      <Grid container spacing={2}>
        {analysis.priorityAreas.map((area) => (
          <Grid item xs={12} sm={6} key={area.domain}>
            <Box
              sx={{
                p: 2,
                borderRadius: 4,
                bgcolor: 'rgba(4, 87, 164, 0.1)',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5da802' }}>
                {area.label}
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