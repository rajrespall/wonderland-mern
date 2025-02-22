import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
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
  Tooltip
} from "@mui/material";
import '@fontsource/poppins';
import { Visibility } from "@mui/icons-material";

const donors = [
  {
    id: 1,
    name: "Diana Carreon",
    city: "Paranaque",
    avatar: "https://i.pravatar.cc/150?img=1",
    amount: "$4000",
  },
  {
    id: 2,
    name: "Jean Etoc",
    city: "Taguig",
    avatar: "https://i.pravatar.cc/150?img=2",
    amount: "$4000",
  },
  {
    id: 3,
    name: "Rajesh Respall",
    city: "Paranaque",
    avatar: "https://i.pravatar.cc/150?img=3",
    amount: "$4000",
  },
  {
    id: 4,
    name: "Ernesto III",
    city: "Taguig",
    avatar: "https://i.pravatar.cc/150?img=3",
    amount: "$4000",
  },
];

export default function Donations() {
  const [open, setOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const handleViewDetails = (donor) => {
    setSelectedDonor(donor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDonor(null);
  };

  return (
    <Box
      sx={{ 
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 3,
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          md={8}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              mb: 2,
              color: "#0457a4",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: '20px'
            }}
          >
            Top Donations
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
          >
            {donors.map((donor) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={donor.id}
              >
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    boxShadow: 'none',
                    backgroundColor: 'rgb(4, 87, 164, 0.05)',
                  }}
                >
                  <Avatar
                    src={donor.avatar}
                    sx={{
                      width: 56,
                      height: 56,
                      margin: "0 auto",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      mt: 1,
                    }}
                  >
                    {donor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      fontFamily: "Poppins",
                    }}
                  >
                    {donor.city}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      color: "#b80201",
                      mt: 1,
                    }}
                  >
                    {donor.amount} Donation
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
        >
          <Typography
            variant="h7"
            sx={{
              fontFamily: "Poppins",
              color: "#0457a4",
            }}
          >
            All Donors
          </Typography>
          <List>
            {donors.map((donor) => (
              <ListItem
              
                key={donor.id}
                secondaryAction={
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleViewDetails(donor)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  sx={{
                    fontFamily: "Poppins",
                  }}
                  primary={`${donor.name} - ${donor.city}`}
                  secondary={`Donated: ${donor.amount}`}
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
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "#0457a4",
                  mb: 1,
                }}
              >
                {selectedDonor.name}
              </Typography>
              <Typography sx={{ fontFamily: "Poppins" }}>City: {selectedDonor.city}</Typography>
              <Typography sx={{ fontFamily: "Poppins" }}>Amount Donated: {selectedDonor.amount}</Typography>
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}