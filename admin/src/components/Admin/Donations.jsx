import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Tooltip,
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
                withCredentials: true, 
            });

            setDonors(response.data);
        } catch (err) {
            console.error("Error fetching donors:", err);
            setError("Failed to load donors. Please try again.");
        } finally {
            setLoading(false);
        }
    }

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
                  secondary={`Donated: $${donation.category} | Payment: ${donation.createdAt}`}
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
                In-kind Donation: {selectedDonor.category}
              </Typography>
              <Box>
              <img src={selectedDonor.donationReceipt} width={400}></img>
              </Box>
              <Typography sx={{ fontFamily: "Poppins" }}>
                Date of Donation: {selectedDonor.createdAt}
              </Typography>
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}