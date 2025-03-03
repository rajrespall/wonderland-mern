import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, Card, CardMedia, IconButton, CssBaseline } from "@mui/material";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from '../assets/repetitive.png';
import Spinner from '../components/Spinner'; 
import { useNavigate } from 'react-router-dom';  // Correct import for v6


const questions = [
  {
    question: "Does your child engage in repetitive movements (e.g., hand-flapping, rocking)?",
    answers: [
      "Very frequent repetitive movements that significantly interfere with daily activities", // 5
      "Frequent repetitive movements throughout the day", // 4
      "Regular repetitive movements in specific situations", // 3
      "Occasional repetitive movements", // 2
      "No repetitive movements observed" // 1
    ]
  },
  {
    question: "Does your child have strong preferences for routines or rituals?",
    answers: [
      "Extreme insistence on routines, severe distress when disrupted", // 5
      "Strong need for routines, significant distress when changed", // 4
      "Moderate preference for routines, becomes upset when disrupted", // 3
      "Mild preference for routines, can adapt with support", // 2
      "No unusual insistence on routines" // 1
    ]
  },
  {
    question: "How does your child react to changes in their routine or environment?",
    answers: [
      "Extreme distress, tantrums or shutdown with any change", // 5
      "Significant distress with most changes, difficult to redirect", // 4
      "Moderate distress with changes, takes time to adjust", // 3
      "Mild discomfort with changes but adapts with support", // 2
      "Adapts well to changes with minimal distress" // 1
    ]
  }
];

const Question5 = () => {
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
        
        // Store the selected answer on a scale of 5 to 1 (5 is most severe)
        // Since our array is 0-indexed, we invert the score: 5 - index
        localStorage.setItem(`Communication_${currentQuestion}_answer`, 5 - index);
        
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
            href="/emotional"
            sx={{
              color: "#5da802",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            <KeyboardBackspaceRoundedIcon fontSize="inherit" />
          </IconButton>
          <Card sx={{backgroundColor:'transparent', boxShadow: 'none', width: '500px'}}>
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
            // href='/others'
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={async () => {
             
              navigate('/others');
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

export default Question5;
