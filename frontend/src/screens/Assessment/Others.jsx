import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, Card, IconButton, CssBaseline, TextField, FormControlLabel, Checkbox, CardMedia } from "@mui/material";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from '../../assets/symptoms.png'
import Spinner from '../../components/Spinner'; 

const questions = [
  {
    question: "Are there any other symptoms or behaviors that concern you?",
    answers: [
      "Difficulty maintaining eye contact.",
      "Delayed speech or language development.",
      "Nonverbal communication challenges.",
      "Difficulty understanding social cues (e.g., tone, facial expressions).",
      "Repetitive movements (e.g., hand-flapping, rocking).",
      "Obsessive interest in specific topics or objects.",
      "Unusual reactions to sensory stimuli (e.g., loud noises, bright lights).",
      "Strong preference for routines and difficulty with changes.",
      "Difficulty making or keeping friends.",
      "Aggressive behaviors (e.g., hitting, biting).",
      "Self-injurious behaviors (e.g., head-banging, biting self).",
      "Difficulty regulating emotions (e.g., frequent meltdowns).",
      "Difficulty transitioning between activities or environments.",
      "Excessive reliance on specific rituals or routines.",
      "Sensory-seeking behaviors (e.g., spinning, jumping).",
      "Avoidance of physical touch.",
      "Difficulty with fine or gross motor skills.",
      "Picky eating or unusual eating habits.",
      "Sleep disturbances or irregular sleep patterns.",
      "Frequent anxiety or phobias.",
      "Difficulty focusing or paying attention.",
      "Tendency to wander or run away (elopement).",
      "Excessive fear of certain situations or objects.",
      "Unusual posture, gait, or motor patterns."
    ]
  }
];

const OtherSymptoms = () => {
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [other, setOther] = useState('');
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const allAnswered = answers.length > 0;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400); 
  }, []);
  
  const handleAnswer = (answer) => {
    if (answers.includes(answer)) {
      setAnswers(answers.filter(item => item !== answer));
    } else {
      setAnswers([...answers, answer]);
    }
  };
  

  const handleSubmit = () => {
    alert("Form submitted with answers: " + answers.join(", ") + (other ? ", Other: " + other : ""));
  };

  const handleNext = () => {
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
            href="/assessment"
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

        <Box sx={{ display: "grid", gap: 2, maxWidth: "500px", margin: "auto", overflowY: "auto", maxHeight: "40vh", backgroundColor: 'white', padding: 3, borderRadius: '20px' }}>
          {questions[currentQuestion].answers.map((answer, index) => (
            <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={answers.includes(answer)}
                onChange={() => handleAnswer(answer)}
                color="primary"
              />
            }
            label={answer}
            sx={{
              '& .MuiTypography-root': {
                fontFamily: 'Poppins',
                fontSize: '18px', 
              },
            }}
          />
          ))}
          <TextField
            label="Other (please specify)"
            variant="outlined"
            fullWidth
            value={other}
            onChange={(e) => setOther(e.target.value)}
            sx={{ mt: 2 }}
          />
        </Box>

        <Box sx={{ textAlign: "right", mt: 7 }}>
          <Button
            href='/whosusing'
            variant="contained"
            endIcon={<ArrowForwardIcon />}
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
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OtherSymptoms;
