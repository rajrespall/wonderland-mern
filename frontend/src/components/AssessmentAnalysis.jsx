import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const AssessmentAnalysis = ({ analysis }) => {
  if (!analysis) return null;

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
    <>
    <Typography
      sx={{
        color: "white",
        fontWeight: "400",
        fontFamily: 'Poppins',
        fontSize: '50px',
        backgroundImage: "linear-gradient(to bottom right, #0457a4, #5da802)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        }}
      >
        Assessment Analysis
      </Typography>
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {/* Overall Score Card */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ height: 150, p: 3, borderRadius: 4, textAlign: 'center', bgcolor: 'rgba(4, 87, 164, 0.1)' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0457a4' }}>
            Overall Score
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, color: '#000' }}>
            {analysis.totalScore || 0}
          </Typography>
        </Paper>
      </Grid>

      {/* Category Card */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ height: 150, p: 3, borderRadius: 4, textAlign: 'center', bgcolor: 'rgba(4, 87, 164, 0.1)' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0457a4' }}>
            Category
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, color: getCategoryColor(analysis.isaaCategory) }}>
            {analysis.isaaCategory || "Not Categorized"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Based on ISAA (Indian Scale for Assessment of Autism)
          </Typography>
        </Paper>
      </Grid>

      {/* Priority Areas Card */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ height: 150, p: 3, borderRadius: 4, textAlign: 'center', bgcolor: 'rgba(4, 87, 164, 0.1)' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0457a4' }}>
            Priority Areas
          </Typography>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {analysis.priorityAreas.map((area) => (
              <Grid item xs={12} key={area.domain}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5da802' }}>
                  {area.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    </>

  );
};

export default AssessmentAnalysis;
