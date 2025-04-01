import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, Card, CardMedia, IconButton, CssBaseline } from "@mui/material";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from '../assets/social_int.png';
import Spinner from '../components/Spinner'; 
import { useNavigate } from 'react-router-dom';  // Correct import for v6

const questions = [
  {
    question: "Does your child make eye contact when interacting with others?",
    answers: [
      "Consistently makes appropriate eye contact", // 1 (least severe)
      "Often makes eye contact but not consistently", // 2
      "Sometimes makes eye contact", // 3
      "Rarely makes eye contact", // 4
      "Never makes eye contact" // 5 (most severe)
    ]
  },
  {
    question: "Does your child engage in pretend play or play alongside other children?",
    answers: [
      "Regularly engages in age-appropriate interactive and pretend play", // 1
      "Occasionally participates in parallel play", // 2
      "Sometimes observes others but seldom joins in", // 3
      "Rarely shows interest in others' play activities", // 4
      "Never engages in any form of play with others" // 5
    ]
  },
  {
    question: "How does your child respond to social cues (e.g., facial expressions, tone of voice)?",
    answers: [
      "Appropriately interprets and responds to social cues", // 1
      "Notices and responds to clear social cues but may miss subtle ones", // 2
      "Inconsistently responds to strong social cues", // 3
      "Rarely notices or responds to obvious social cues", // 4
      "Does not respond to any social cues" // 5
    ]
  },
  {
    question: "Does your child seem uninterested in interacting with peers or family members?",
    answers: [
      "Consistently seeks and enjoys social interaction", // 1
      "Sometimes shows interest in social interaction", // 2
      "Often appears indifferent to social opportunities", // 3
      "Shows strong preference for isolation over social interaction", // 4
      "Actively avoids all social interactions" // 5
    ]
  }
];

const Question2 = () => {
const [loading, setLoading] = useState(true);
const navigate = useNavigate(); // Use the hook to get the navigate function
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const allAnswered = answers.every(answer => answer !== null);

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 400); 
    }, []);
  
    const handleAnswer = (index) => {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion] = index;
      
      setAnswers(updatedAnswers);
      
      localStorage.setItem(`Social_${currentQuestion}_answer`, index + 1);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    };

  // const handleNext = () => {
  //   if (currentQuestion < questions.length - 1) {
  //     setCurrentQuestion(currentQuestion + 1);
  //   }
  // };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: "#E6F0FA", minHeight: "100vh", p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2}}>
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
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 2}}>
          <IconButton
            href="/communication"
            sx={{
              color: "#5da802",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            <KeyboardBackspaceRoundedIcon fontSize="inherit" />
          </IconButton>
          <Card sx={{backgroundColor:'transparent', boxShadow: 'none', width: '280px'}}>
            <CardMedia component="img" image={Image} alt="Sample" />
          </Card>
        </Box>

        <Typography
          sx={{
            mt: 5,
            fontFamily: "Poppins",
            color: "#0457a4",
            fontSize: "28px",
            textAlign: "center",
            mb: 4,
          }}
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
                backgroundColor: answers[currentQuestion] === index ? "#5da802" : "#0457a4",
                fontFamily: "Poppins",
                fontSize: "20px",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#5da802" },
              }}
              onClick={() => handleAnswer(index)}
            >
              {answer}
            </Button>
          ))}
        </Box>

        <Box sx={{ textAlign: "right", mt: 7 }}>
          <Button
            // href="/sensory"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={async () => {
              navigate('/sensory');
          }}// Submit the answers when clicking next
            sx={{
              width: '250px',
              backgroundColor: "#5da802",
              fontFamily: "Poppins",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "20px",
              color: '#fcf230',
              fontWeight: 'bold',
              justifyContent: 'space-between',
              px: 3,
              py: 1,
              "&:hover": { backgroundColor: "#4c9000" },
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

export default Question2;