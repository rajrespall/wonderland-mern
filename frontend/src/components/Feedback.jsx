import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, TextField, Button } from "@mui/material";
import StyledRating from "../components/Rating"; 
import logo from "../assets/logo_blue.png";
import pagkaki from "../assets/aboutus.png";

const Feedback = () => {
  return (
      <Grid container spacing={4} justifyContent="center" alignItems="center" position="relative" sx={{ px: 2, height: '92vh'}}>
        <Grid item xs={12} sm={10} md={6} lg={4} sx={{ marginRight: "300px" }}>
          <Card
            sx={{
              height:'500px',
              borderRadius: "35px",
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              boxShadow: 3,
              p: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="green" mb={2}>
                GIVE US YOUR FEEDBACK!
              </Typography>
              {/* <Box>
                <Card sx={{backgroundColor:'transparent', boxShadow: 'none', width: '500px'}}>
                  <CardMedia component="img" image={Image} alt="Sample" />  
                </Card>
              </Box> */}

              <StyledRating />

              <Typography 
              sx={{
                textAlign: 'justify',
                color: '#0457a4',
                fontFamily: 'Poppins',
                fontSize: '16px',
                mt: 2
              }}>
                Do you have any thoughts, comments, or suggestions you’d like to share?
              </Typography>

              <TextField
                fullWidth
                multiline
                variant="outlined"
                rows={5}
                sx={{
                  backgroundColor: "rgba(4, 87, 164, 0.12)",
                  borderRadius: "10px",
                  mt: 2,
                  mb: 2 }}
              />

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 4,
                  backgroundColor: '#5da802',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  height: '50px',
                  color: '#fcf230',
                  '&:hover': {
                    color: '#5da802',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                >
                  SEND FEEDBACK
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={10} md={6} lg={4}>
          <Box textAlign="right" >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={pagkaki} alt="Pagkaki" style={{ maxWidth: "90%", marginLeft: "60px" }} />
          </Box>
            <Typography
            sx={{
              textAlign: 'justify',
              fontSize: '17px',
              fontFamily: 'Poppins',
              color: '#0457a4',
              mt: 3
            }}>
            At Wonderland, we’re on a mission to support and empower young children with autism through our innovative Interactive Predictive Analysis Web Application. Our platform combines playful learning with cutting-edge technology to offer a personalized, engaging experience for each child. By using interactive tools, games, and real-time analysis, we help children develop social, communication, and cognitive skills in a fun and safe environment.
            </Typography>
          </Box>
        </Grid>
      </Grid>
  );
};

export default Feedback;
