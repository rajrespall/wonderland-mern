import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, CircularProgress 
} from '@mui/material';
import { format } from 'date-fns';
import useAssessmentStore from '../../store/assessmentStore';

const AssessmentHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAssessmentHistory = useAssessmentStore(state => state.fetchAssessmentHistory);
  const fetchSpecificAssessment = useAssessmentStore(state => state.fetchSpecificAssessment);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchAssessmentHistory(userId);
        if (data) {
          setHistory(data);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadHistory();
  }, [userId, fetchAssessmentHistory]);

  const handleViewAssessment = async (version) => {
    await fetchSpecificAssessment(userId, version);
    // You can add navigation logic here if needed
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#0457a4', fontFamily: 'Poppins' }}>
        Assessment History
      </Typography>
      
      {history.length === 0 ? (
        <Typography>No assessment history available.</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(4, 87, 164, 0.1)' }}>
                <TableCell>Date</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((assessment) => (
                <TableRow key={assessment._id}>
                  <TableCell>
                    {format(new Date(assessment.assessmentDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{assessment.version}</TableCell>
                  <TableCell>{assessment.analysis.totalScore}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      display: 'inline-block', 
                      bgcolor: getCategoryColor(assessment.analysis.isaaCategory),
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1
                    }}>
                      {assessment.analysis.isaaCategory}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleViewAssessment(assessment.version)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

// Helper function to get color based on category
const getCategoryColor = (category) => {
  switch (category) {
    case "No Autism": return "#4caf50";
    case "Mild Autism": return "#ffeb3b";
    case "Moderate Autism": return "#ff9800";
    case "Severe Autism": return "#f44336";
    default: return "#0457a4";
  }
};

export default AssessmentHistory;