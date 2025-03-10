import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { SentimentVerySatisfied, SentimentNeutral, SentimentVeryDissatisfied, Delete } from "@mui/icons-material";
import axios from "axios";

const getRatingIcon = (rating) => {
  switch (rating) {
    case 5:
      return <SentimentVerySatisfied color="success" />;
    case 3:
      return <SentimentNeutral color="warning" />;
    case 1:
      return <SentimentVeryDissatisfied color="error" />;
    default:
      return <SentimentNeutral color="disabled" />;
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

        console.log("Fetched reviews:", response.data);
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
    <Box>
      <Typography 
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fontSize: 30,
          color: '#0457a4',
          mb: 2
        }}
      >
        My Reviews
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : reviews.length === 0 ? (
        <Typography>No reviews available.</Typography>
      ) : (
        reviews.map((review) => (
          <Card key={review._id} variant="outlined" sx={{ maxWidth: 500, mb: 2, p: 2, borderRadius: 5 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {getRatingIcon(review.rating)} 
                <Typography variant="body2" color="textSecondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Typography variant="body1">
                {review.comment}
              </Typography>

            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}