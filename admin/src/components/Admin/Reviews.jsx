import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Rating, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
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

  const columns = [
    {
      name: "userId.username",
      label: "Username",
      options: {
        customBodyRender: (value) => value || "Anonymous User"
      }
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        customBodyRender: (value) => <Rating value={value || 0} readOnly />
      }
    },
    {
      name: "comment",
      label: "Comment",
      options: {
        customBodyRender: (value) => value?.slice(0, 50) + (value?.length > 50 ? "..." : "")
      }
    },
    {
      name: "createdAt",
      label: "Date",
      options: {
        customBodyRender: (value) => new Date(value).toLocaleString()
      }
    },
    {
      name: "_id",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => {
          const review = reviews[tableMeta.rowIndex];
          return (
            <Tooltip title="View Details">
              <IconButton onClick={() => handleViewDetails(review)}>
                <Visibility sx={{ color: "#0457a4" }} />
              </IconButton>
            </Tooltip>
          );
        }
      }
    }
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    responsive: "standard"
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#fff", boxShadow: "none" }}>
      <Typography variant="h6" sx={{ fontFamily: "Poppins", mb: 2, color: "#0457a4" }}>
        User Reviews
      </Typography>

      <MUIDataTable
        data={reviews}
        columns={columns}
        options={options}
      />

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
