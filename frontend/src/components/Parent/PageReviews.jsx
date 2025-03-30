import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Container,
  Divider,
  CircularProgress,
  Paper,
  Chip
} from "@mui/material";
import { 
  SentimentVerySatisfied, 
  SentimentNeutral, 
  SentimentVeryDissatisfied,
  AccessTime,
  School,
  Comment
} from "@mui/icons-material";
import axios from "axios";

const getRatingIcon = (rating) => {
  switch (true) {
    case rating >= 4:
      return <SentimentVerySatisfied sx={{ fontSize: 35 }} color="success" />;
    case rating >= 3:
      return <SentimentNeutral sx={{ fontSize: 35 }} color="warning" />;
    case rating < 3:
      return <SentimentVeryDissatisfied sx={{ fontSize: 35 }} color="error" />;
    default:
      return <SentimentNeutral sx={{ fontSize: 35 }} color="disabled" />;
  }
};

const getRatingColor = (rating) => {
  switch (true) {
    case rating >= 4:
      return '#4caf50';
    case rating >= 3:
      return '#ff9800';
    case rating < 3:
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

export default function PageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews/myreviews", {
          withCredentials: true
        });
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Box 
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: '#fff'
      }}
    >
      <Paper 
        elevation={2}
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
          boxShadow: 'none'
        }}
      >
        <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Comment sx={{ color: '#0457a4', fontSize: 35 }} />
          <Typography 
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: 28,
              color: '#0457a4',
            }}
          >
            My Reviews
          </Typography>
        </Box>
      </Paper>

      <Box 
        sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          px: 3,
          py: 2,
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f5f5f5'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbd',
            borderRadius: '4px'
          }
        }}
      >
        <Box sx={{ margin: '0 !important' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress size={40} />
            </Box>
          ) : error ? (
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#ffebee' }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          ) : reviews.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fff' }}>
              <School sx={{ fontSize: 60, color: '#9e9e9e', mb: 2 }} />
              <Typography variant="h6" color="textSecondary">
                No reviews available yet.
              </Typography>
            </Paper>
          ) : (
            <Box 
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3,
                width: '100%'
              }}
            >
              {reviews.map((review) => (
                <Card 
                  key={review._id} 
                  sx={{
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                      <Box display="flex" gap={2} alignItems="center">
                        <Box sx={{ color: getRatingColor(review.rating) }}>
                          {getRatingIcon(review.rating)}
                        </Box>
                        <Box>
                          <Typography 
                            variant="subtitle1"
                            sx={{ 
                              fontWeight: 600,
                              color: getRatingColor(review.rating),
                              mb: 0.5
                            }}
                          >
                            {review.rating.toFixed()} out of 5
                          </Typography>
                          {review.tutor && (
                            <Chip
                              icon={<School sx={{ fontSize: 16 }} />}
                              label={`Tutor: ${review.tutor.name}`}
                              size="small"
                              sx={{ 
                                bgcolor: '#e3f2fd',
                                color: '#1976d2',
                                '& .MuiChip-icon': { color: '#1976d2' }
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        <AccessTime sx={{ fontSize: 16 }} />
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography 
                      sx={{
                        lineHeight: 1.7,
                        color: '#2c3e50',
                        fontFamily: 'Poppins',
                        fontSize: '0.95rem',
                        whiteSpace: 'pre-line',
                        letterSpacing: '0.2px'
                      }}
                    >
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}