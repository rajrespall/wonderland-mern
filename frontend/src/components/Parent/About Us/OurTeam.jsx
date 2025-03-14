import React from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import popsImage from "../../../assets/OurTeam/MaamPops.jpg";
// import rajeshImage from "../../assets/OurTeam/Rajesh.jpg";
import dianaImage from "../../../assets/OurTeam/Diana.jpg";
import ernestoImage from "../../../assets/OurTeam/Ernesto.jpg";
// import jeanImage from "../../assets/OurTeam/Jean.jpg";


const teamMembers = [
  { name: "Pops", role: "Adviser", image: popsImage },
  { name: "Rajesh", role: "Developer", image: "rajeshImage" },
  { name: "Diana", role: "Developer", image: dianaImage },
  { name: "Ernesto", role: "Developer", image: ernestoImage },
  { name: "Jean", role: "Developer", image: "jeanImage" }
];


const TeamSection = () => {
  return (
    <Container sx={{ py: 8, textAlign: "center", fontFamily: "Poppins" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#0457a4", fontFamily: 'Poppins', }}>
        Meet Our Team
      </Typography>
      <Typography variant="body1" maxWidth="md" mx="auto" mb={4} sx={{color: 'black', fontFamily: 'Poppins'}}>
        A dedicated team of developers and researchers working on an innovative system for young children with autism.
      </Typography>
      <Grid container spacing={5} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
            <Box
              sx={{
                position: "relative",
                width: "220px",
                height: "270px",
                borderRadius: "50px 0px 50px 0px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column-reverse",
                alignItems: "center",
                boxShadow: 3,
                textAlign: "center",
                backgroundImage: `url(${member.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.2)", 
                  }
                }
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "70px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Poppins", color: "#fff" }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "Poppins", color: "#fff" }}>
                  {member.role}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamSection;