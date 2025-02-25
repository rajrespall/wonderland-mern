import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Divider, Avatar, Rating, List, ListItem, ListItemAvatar, ListItemText, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import axios from "axios";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // ✅ Fetch reviews from MongoDB when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews/all");
        setReviews(response.data); // Set fetched reviews in state
      } catch (error) {
        console.error("❌ Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Function to handle opening review details
  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setOpen(true);
  };

  // Function to close the details dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "#f9f9f9",
        boxShadow: "none",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins",
          mb: 2,
          color: "#0457a4",
        }}
      >
        User Reviews
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* ✅ Check if reviews exist before displaying */}
      {reviews.length > 0 ? (
        <List>
          {reviews.map((review) => (
            <ListItem key={review._id} alignItems="flex-start" sx={{ display: "flex", alignItems: "center" }}>
              <ListItemAvatar>
                <Avatar src={`https://i.pravatar.cc/150?u=${review.userId}`} alt={review.userId} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold", color: "#0457a4" }}>
                    {review.userId.username || "Anonymous User"}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body2" sx={{ fontFamily: "Poppins", color: "#333" }}>
                      {review.comment}
                    </Typography>
                  </Box>
                }
              />
              <Tooltip title="View Details">
                <IconButton onClick={() => handleViewDetails(review)}>
                  <Visibility sx={{ color: "#0457a4" }} />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 2 }}>No reviews available.</Typography>
      )}

      {/* Dialog for review details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <DialogContentText>
              <Typography sx={{ fontWeight: "bold", color: "#0457a4", mb: 1 }}>
                {selectedReview.userId?.username || "Anonymous User"}
              </Typography>
              <Rating value={selectedReview.rating} readOnly />
              <Typography variant="body2" sx={{ mt: 2 }}>
                {selectedReview.comment}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                {new Date(selectedReview.createdAt).toLocaleString()}
              </Typography>
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
