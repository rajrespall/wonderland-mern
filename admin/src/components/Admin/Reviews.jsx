import React, { useState } from "react";
import { Box, Typography, Paper, Divider, Avatar, Rating, List, ListItem, ListItemAvatar, ListItemText, Checkbox, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { Delete, CheckCircle, Visibility } from "@mui/icons-material";

const reviews = [
  {
    id: 1,
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 4,
    comment: "Great platform! Very easy to use and navigate.",
    date: "2025-02-20T14:30:00",
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    comment: "Excellent experience. Highly recommend!",
    date: "2025-02-21T10:15:00",
  },
  {
    id: 3,
    name: "Emily Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 3,
    comment: "Good, but there's room for improvement.",
    date: "2025-02-22T09:45:00",
  },
  {
    id: 4,
    name: "Emily Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 3,
    comment: "Good, but there's room for improvement.",
    date: "2025-02-23T08:30:00",
  },
];

export default function AdminReviews() {
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

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
        bgcolor: "#f9f9f9",
        boxShadow: 'none'
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
      <Divider
        sx={{
          mb: 2,
        }}
      />
      <List>
        {reviews.map((review) => (
          <ListItem
            key={review.id}
            alignItems="flex-start"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox />
            <ListItemAvatar>
              <Avatar src={review.avatar} alt={review.name} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#0457a4",
                  }}
                >
                  {review.name}
                </Typography>
              }
              secondary={
                <Box>
                  <Rating value={review.rating} readOnly />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Poppins",
                      color: "#333",
                    }}
                  >
                    {review.comment}
                  </Typography>
                </Box>
              }
            />
            <Tooltip title="View Details">
              <IconButton onClick={() => handleViewDetails(review)}>
                <Visibility
                  sx={{
                    color: "#0457a4",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Approve">
              <IconButton>
                <CheckCircle
                  sx={{
                    color: "green",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <Delete
                  sx={{
                    color: "#b80201",
                  }}
                />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <DialogContentText>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#0457a4",
                  mb: 1,
                }}
              >
                {selectedReview.name}
              </Typography>
              <Rating value={selectedReview.rating} readOnly />
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                }}
              >
                {selectedReview.comment}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "#666",
                }}
              >
                {new Date(selectedReview.date).toLocaleString()}
              </Typography>
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}