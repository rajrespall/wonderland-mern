import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, TextField, Button, CardMedia } from "@mui/material";
import StyledRating from "../components/Rating"; 
import axios from "axios";
import { motion } from "framer-motion";

import sqheart from "../assets/sq_hearts.png"
import pagkaki from "../assets/aboutus.png";
import MissionVision from "./Parent/Home/OurMission";

const Feedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (!rating || rating < 1 || rating > 5) {
        alert("Please select a valid rating before submitting.");
        return;
      }

      console.log("📤 Sending feedback:", { rating, comment });

      const response = await axios.post(
        "http://localhost:5000/api/reviews/submit",
        { rating: Number(rating), comment },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Feedback submitted successfully:", response.data);
      alert("Feedback submitted successfully!");
      setRating(null); 
      setComment("");
    } catch (error) {
      console.error("❌ Error submitting feedback:", error.response ? error.response.data : error.message);
      alert("Error submitting feedback: " + (error.response ? error.response.data.message : "Unknown error"));
    }
  };


  
  return (
    <>
    <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
    <Grid container spacing={4} justifyContent="center" alignItems="center" position="relative" sx={{ px: 2, height: '95vh' }}>
      <Grid item xs={12} sm={10} md={6} lg={4} sx={{ marginRight: "300px" }}>
        <CardMedia sx={{position: "absolute", top: "35%", left: "40%"}}>
          <img src={sqheart} alt="Heart" style={{ width: "250px" }} />
        </CardMedia>
        <Card
          sx={{
            height:'500px',
            borderRadius: "35px",
            backgroundColor: "white",
            color: "black",
            textAlign: "center",
            boxShadow: 'none',
            p: 2,
          }}
        >  
        
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color="green" mb={2}>
              GIVE US YOUR FEEDBACK!
            </Typography>

            <StyledRating
              value={rating}
              onChange={(event, newValue) => {
                console.log("Rating Selected:", newValue);
                setRating(newValue);
              }}
            />

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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                backgroundColor: "rgba(4, 87, 164, 0.12)",
                borderRadius: "10px",
                mt: 2,
                mb: 2 }}
            />

            <Button
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
              onClick={handleSubmit}
            >
              SEND FEEDBACK
            </Button>
            

            {message && <Typography sx={{ mt: 2, color: message.includes("success") ? "green" : "red" }}>{message}</Typography>}
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
      </motion.div>
      </>
  );
};

export default Feedback;