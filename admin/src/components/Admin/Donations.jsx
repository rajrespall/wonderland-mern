import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Tooltip,
  CircularProgress,
  Alert
} from "@mui/material";
import "@fontsource/poppins";
import { Visibility } from "@mui/icons-material";
import axios from "axios";

export default function Donations() {
  const [donors, setDonors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donations", {
          withCredentials: true
        });

        setDonors(response.data);
      } catch (err) {
        console.error("Error fetching donors:", err);
        setError("Failed to load donors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const handleViewDetails = (donor) => {
    setSelectedDonor(donor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDonor(null);
  };

  const topDonors = donors
    .sort((a, b) => b.donationAmount - a.donationAmount)
    .slice(0, 2); 

  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9f9", borderRadius: 3 }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              mb: 2,
              color: "#0457a4",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            Top Donations
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ textAlign: "center" }}>{error}</Alert>
          ) : topDonors.length === 0 ? (
            <Typography textAlign="center" color="textSecondary">
              No donations available.
            </Typography>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              {topDonors.map((donation) => (
                <Grid item xs={12} sm={6} md={3} key={donation._id}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: "center",
                      boxShadow: "none",
                      backgroundColor: "rgb(4, 87, 164, 0.05)"
                    }}
                  >
                    <Avatar
                      src={donation.donator?.profilePicture || "https://i.pravatar.cc/150"}
                      sx={{ width: 56, height: 56, margin: "0 auto" }}
                    />
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "bold", mt: 1 }}>
                      {donation.donator?.firstName || "Anonymous"} {donation.donator?.lastName || ""}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: "Poppins" }}>
                      {donation.donator?.address || "No Address Available"}
                    </Typography>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: "bold", color: "#b80201", mt: 1 }}>
                      ${donation.donationAmount} Donation
                    </Typography>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: "12px", mt: 1 }}>
                      Payment Method: {donation.paymentMethod}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h7" sx={{ fontFamily: "Poppins", color: "#0457a4" }}>
            All Donors
          </Typography>
          <List>
            {donors.map((donation) => (
              <ListItem
                key={donation._id}
                secondaryAction={
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleViewDetails(donation)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={`${donation.donator?.firstName || "Anonymous"} ${donation.donator?.lastName || ""}`}
                  secondary={`Donated: $${donation.donationAmount} | Payment: ${donation.paymentMethod}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: "Poppins" }}>Donor Details</DialogTitle>
        <DialogContent>
          {selectedDonor && (
            <DialogContentText>
              <Typography sx={{ fontFamily: "Poppins", fontWeight: "bold", color: "#0457a4", mb: 1 }}>
                {selectedDonor.donator?.firstName || "Anonymous"} {selectedDonor.donator?.lastName || ""}
              </Typography>
              <Typography sx={{ fontFamily: "Poppins" }}>
                Address: {selectedDonor.donator?.address || "No Address Available"}
              </Typography>
              <Typography sx={{ fontFamily: "Poppins" }}>
                Amount Donated: ${selectedDonor.donationAmount}
              </Typography>
              <Typography sx={{ fontFamily: "Poppins" }}>
                Payment Method: {selectedDonor.paymentMethod}
              </Typography>
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}