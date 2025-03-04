import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, Card, CardMedia, IconButton, CssBaseline } from "@mui/material";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from '../assets/emotional.png';
import Spinner from '../components/Spinner'; 
import { useNavigate } from 'react-router-dom';  // Correct import for v6

// frontend/src/screens/Emotional.jsx
const questions = [
  {
    question: "Does your child have difficulty expressing emotions?",
    answers: [
      "No difficulty; expresses emotions clearly and appropriately", // 1 (least severe)
      "Mild difficulty in expressing emotions", // 2
      "Moderate difficulty; struggles in many situations", // 3
      "Severe difficulty; emotions rarely expressed appropriately", // 4
      "Extremely limited or absent emotional expression" // 5 (most severe)
    ]
  },
  {
    question: "How does your child cope with frustration or anxiety?",
    answers: [
      "Self-regulates effectively in most situations", // 1
      "Occasionally needs support but generally manages", // 2
      "Often needs assistance to regulate emotions", // 3
      "Struggles significantly, requires substantial external support", // 4
      "Cannot cope at all, extreme reactions that are difficult to manage" // 5
    ]
  },
  {
    question: "Does your child experience meltdowns? If yes, what typically triggers them?",
    answers: [
      "No meltdowns observed", // 1
      "Rare meltdowns only in extreme situations", // 2
      "Occasional meltdowns in response to identified stressors", // 3
      "Frequent meltdowns with specific triggers", // 4
      "Very frequent meltdowns with multiple or unpredictable triggers" // 5
    ]
  }
];

const Question4 = () => {
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const allAnswered = answers.every(answer => answer !== null);
  const navigate = useNavigate(); // Use the hook to get the navigate function


  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 400); 
    }, []);
  
    const handleAnswer = (index) => {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion] = index;
      
      setAnswers(updatedAnswers);
      
      localStorage.setItem(`Communication_${currentQuestion}_answer`, index + 1);
      
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
            href="/sensory"
            sx={{
              color: "#5da802",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            <KeyboardBackspaceRoundedIcon fontSize="inherit" />
          </IconButton>
          <Card sx={{backgroundColor:'transparent', boxShadow: 'none', width: '340px'}}>
            <CardMedia sx={{mt: 1}} component="img" image={Image} alt="Sample" />
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
                backgroundColor: "#0457a4",
                fontFamily: "Poppins",
                fontSize: "20px",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#034f99" },
              }}
              onClick={() => handleAnswer(index)}
            >
              {answer}
            </Button>
          ))}
        </Box>

        <Box sx={{ textAlign: "right", mt: 7 }}>
          <Button
            // href='/routines'
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={async () => {
              navigate('/routines');
          }}
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

export default Question4;
