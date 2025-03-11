import React from "react";
import { Card, CardContent, Typography, Avatar, Grid, Container, Box } from "@mui/material";

const teamMembers = [
  { name: "Pops", role: "Adviser", image: "alex.jpg" },
  { name: "Rajesh", role: "Developer", image: "samantha.jpg" },
  { name: "Diana", role: "Developer", image: "john.jpg" },
  { name: "Ernesto", role: "Developer", image: "emma.jpg" },
  { name: "Jean", role: "Developer", image: "michael.jpg" }
];

const TeamSection = () => {
  return (
    <Container sx={{ py: 8, textAlign: "center", fontFamily: "Poppins" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#0457a4" }}>
        Meet Our Team
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth="md" mx="auto" mb={4}>
        A dedicated team of developers and researchers working on an innovative system for young children with autism.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#0457a4",
                borderRadius: "12px",
                padding: "16px",
                color: "white",
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  width: "100px",
                  height: "40px",
                  backgroundColor: "#0457a4",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              ></Box>
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{ width: 120, height: 120, mb: 2, border: "4px solid white" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Poppins" }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
                  {member.role}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamSection;