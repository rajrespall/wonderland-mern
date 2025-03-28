import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Divider, Avatar, Rating, List, ListItem, ListItemAvatar, ListItemText, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import axios from "axios";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews/all");
        setReviews(response.data || []); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setOpen(true);
  };

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
        bgcolor: "#fff",
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

      {reviews.length > 0 ? (
        <List>
          {reviews.map((review) => (
            <ListItem key={review._id} alignItems="flex-start" sx={{ display: "flex", alignItems: "center" }}>
              <ListItemAvatar>
                <Avatar
                  src={review.profilePicture || ""}
                  alt={review.userId?.username || "Anonymous User"}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold", color: "#0457a4" }}>
                    {review.userId?.username || "Anonymous User"}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Rating value={review.rating || 0} readOnly />
                    <Typography variant="body2" sx={{ fontFamily: "Poppins", color: "#333" }}>
                      {review.comment || "No comment provided."}
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

      {/* Review Details Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <DialogContentText>
              <Typography sx={{ fontWeight: "bold", color: "#0457a4", mb: 1 }}>
                {selectedReview.userId?.username || "Anonymous User"}
              </Typography>
              <Rating value={selectedReview.rating || 0} readOnly />
              <Typography variant="body2" sx={{ mt: 2 }}>
                {selectedReview.comment || "No additional comments."}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                {selectedReview.createdAt ? new Date(selectedReview.createdAt).toLocaleString() : "No date available"}
              </Typography>
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
