import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, Card, CardMedia, IconButton, CssBaseline } from "@mui/material";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from '../assets/communication.png';
import Spinner from '../components/Spinner'; 
import { useNavigate } from 'react-router-dom';  // Correct import for v6



const questions = [
  {
    question: "Does your child speak? If yes, is their speech delayed or limited?",
    answers: [
      "No, they do not speak.",
      "Yes, their speech is delayed.",
      "Yes, their speech is limited.",
      "Yes, they speak fluently."
    ]
  },
  {
    question: "Does your child exhibit repetitive speech patterns (e.g., echolalia)?",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Frequently"
    ]
  },
  {
    question: "Does your child have difficulty understanding or processing spoken language?",
    answers: [
      "No difficulty.",
      "Mild difficulty.",
      "Moderate difficulty.",
      "Severe difficulty."
    ]
  },
  {
    question: "How does your child indicate their needs or wants?",
    answers: [
      "Verbal communication.",
      "Gestures (e.g., pointing, pulling).",
      "Visual aids or assistive technology.",
      "Non-verbal behaviors (e.g., crying, leading others)."
    ]
  }
];

const Question1 = () => {
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const navigate = useNavigate(); // Use the hook to get the navigate function

  const allAnswered = selectedAnswers.every(answer => answer !== null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  const handleAnswerSelection = (index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = index;
  
    setSelectedAnswers(updatedAnswers);
  
    // Store the selected answer numerically in localStorage (1-based index)
    localStorage.setItem(`Communication_${currentQuestion}_answer`, index + 1);  // Store 1-based value
  
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: "#E6F0FA", minHeight: "100vh", p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              flexGrow: 1,
              height: 15,
              borderRadius: '30px',
              backgroundColor: "#0457a4",
              "& .MuiLinearProgress-bar": { backgroundColor: "#5da802", borderRadius: '30px' },
            }}
          />
          <Box
            sx={{
              backgroundColor: "#5da802",
              color: "#fcf230",
              fontFamily: 'Poppins',
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "20px",
              width: '150px',
              textAlign: 'center',
              px: 2,
              py: 1,
              ml: 2,
            }}
          >
            {currentQuestion + 1} of {questions.length}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton href="/assessment" sx={{ color: "#5da802", fontSize: "40px", fontWeight: "bold" }}>
            <KeyboardBackspaceRoundedIcon fontSize="inherit" />
          </IconButton>

          <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', width: '250px' }}>
            <CardMedia component="img" image={Image} alt="Sample" />
          </Card>
        </Box>

        <Typography
          sx={{ mt: 5, fontFamily: "Poppins", color: "#0457a4", fontSize: "28px", textAlign: "center", mb: 4 }}
        >
          {questions[currentQuestion].question}
        </Typography>

        <Box sx={{ display: "grid", gap: 2, maxWidth: "500px", margin: "auto" }}>
          {questions[currentQuestion].answers.map((answer, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                height: '60px',
                backgroundColor: selectedAnswers[currentQuestion] === index ? "#034f99" : "#0457a4",
                fontFamily: "Poppins",
                fontSize: "20px",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#034f99" },
              }}
              onClick={() => handleAnswerSelection(index)}
            >
              {answer}
            </Button>
          ))}
        </Box>

        <Box sx={{ textAlign: "right", mt: 7 }}>
          <Button
            // href='/social-interaction'
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={async () => {
        
              navigate('/social-interaction');
          }}
            sx={{
              width: '250px',
              backgroundColor: allAnswered ? "#5da802" : "gray",
              fontFamily: "Poppins",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "20px",
              color: '#fcf230',
              fontWeight: 'bold',
              justifyContent: 'space-between',
              px: 3,
              py: 1,
              "&:hover": { backgroundColor: allAnswered ? "#4c9000" : "gray" },
            }}
            disabled={!allAnswered}
          >
            Next page
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Question1;
