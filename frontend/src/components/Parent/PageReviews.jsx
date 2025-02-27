import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { SentimentVerySatisfied, SentimentNeutral, SentimentVeryDissatisfied, Delete } from "@mui/icons-material";

const buttonStyles = (active) => ({
  width: "25%",
  p: 2,
  height: "40px",
  borderRadius: "20px",
  border: "2px solid yellow",
  fontFamily: "Poppins",
  fontWeight: "400",
  justifyContent: "left",
  backgroundColor: active ? "white" : "transparent",
  borderColor: active ? "#0457a4" : "#b80201",
  color: active ? "#0457a4" : "#b80201",

  "&:hover": {
    backgroundColor: active ? "transparent" : "#fcf230",
    borderColor: active ? "#fcf230" : "#b80201",
  },
});

const getSentimentIcon = (sentiment) => {
  switch (sentiment) {
    case "positive":
      return <SentimentVerySatisfied color="success" />;
    case "neutral":
      return <SentimentNeutral color="warning" />;
    case "negative":
      return <SentimentVeryDissatisfied color="error" />;
    default:
      return <SentimentNeutral color="disabled" />;
  }
};

export default function PageReviews() {
  return (
    <Box>
      <Typography 
      sx={{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#0457a4',
        mb: 2
      }}>
        My Reviews
      </Typography>
      <Card variant="outlined" sx={{ maxWidth: 500, mb: 2, p: 2, borderRadius: 5 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            {getSentimentIcon("positive")} 
            <Typography variant="body2" color="textSecondary">
              24-10-2022
            </Typography>
          </Box>

          <Typography variant="body1">
            My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stories I was called to invite together in this kind of creation.
          </Typography>

          <Box mt={2} display="flex" justifyContent="flex-start">
            <Button sx={buttonStyles(false)} startIcon={<Delete />}>
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
