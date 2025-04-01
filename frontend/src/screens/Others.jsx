import React, { useState, useEffect } from "react";
import { Box, Typography, Button, LinearProgress, Card, IconButton, CssBaseline, TextField, FormControlLabel, Checkbox, CardMedia } from "@mui/material";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from '../assets/symptoms.png';
import Spinner from '../components/Spinner'; 
import useAssessmentStore from '../store/assessmentStore'; 
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setOthersAnswers,  submitAssessment } = useAssessmentStore();  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [other, setOther] = useState('');
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const allAnswered = answers.length > 0;
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400); 
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        useAssessmentStore.getState().setUserId(parsedUser.id); // Update Zustand state
    }
  }, []);
  
  const handleAnswer = (answer) => {
    let updatedAnswers;
    if (answers.includes(answer)) {
        updatedAnswers = answers.filter(item => item !== answer);
    } else {
        updatedAnswers = [...answers, answer];
    }

    setAnswers(updatedAnswers); // Update local state
    setOthersAnswers(updatedAnswers); // Update Zustand store
  };

  const handleButtonClick = async () => {
    try {
      setSubmitting(true);
      const {
          userId,
          setCommunicationAnswers,
          setEmotionalAnswers,
          setRoutineAnswers,
          setSensoryAnswers,
          setSocialAnswers,
          setOthersAnswers,
          submitAssessment
      } = useAssessmentStore.getState();

      if (!userId) {
          console.error("User ID is missing, cannot submit assessment");
          return;
      }

      // ✅ Retrieve answers properly from Local Storage
      const getAnswers = (prefix, count) => {
        let answers = [];
        for (let i = 0; i < count; i++) {
            const storedValue = localStorage.getItem(`${prefix}_${i}_answer`);
            if (storedValue !== null) {
                answers.push(parseInt(storedValue, 10));  // Make sure it's an integer
            }
        }
        return answers;
    };

      // ✅ Fetch stored values
      const communicationAnswers = getAnswers("Communication", 4);
      const emotionalAnswers = getAnswers("Emotional", 3);
      const routineAnswers = getAnswers("Routine", 3);
      const sensoryAnswers = getAnswers("Sensory", 3);
      const socialAnswers = getAnswers("Social", 4);

      // ✅ Collect 'others' answers
      const othersAnswers = [...answers];
      if (other.trim() !== "") {
          othersAnswers.push(other);
      }

      // ✅ Store values in Zustand before submission
      setCommunicationAnswers(communicationAnswers);
      setEmotionalAnswers(emotionalAnswers);
      setRoutineAnswers(routineAnswers);
      setSensoryAnswers(sensoryAnswers);
      setSocialAnswers(socialAnswers);
      setOthersAnswers(othersAnswers);

      try {
        const response = await submitAssessment();
        if (response) {
          // Clear local storage entries
          for (let i = 0; i < 4; i++) {
            localStorage.removeItem(`Communication_${i}_answer`);
            localStorage.removeItem(`Emotional_${i}_answer`);
            localStorage.removeItem(`Routine_${i}_answer`);
            localStorage.removeItem(`Sensory_${i}_answer`);
            localStorage.removeItem(`Social_${i}_answer`);
          }
          localStorage.removeItem("Others_answers");
          navigate('/whosusing');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message && 
            error.response.data.message.includes("duplicate key error")) {
          // Handle duplicate key error by navigating anyway - assessment was attempted
          console.log("Duplicate assessment detected, proceeding to resources");
          navigate('/resources');
        } else {
          throw error; // Rethrow if it's a different error
        }
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert("There was an error submitting your assessment. Please try again.");
    } finally {
      setSubmitting(false);
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

        <Box sx={{ display: "grid", gap: 2, margin: "auto", overflowY: "auto", maxHeight: "40vh", width: '80%', backgroundColor: 'white', padding: 3, borderRadius: '20px' }}>
        {questions[currentQuestion].answers.map((answer, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={answers.includes(answer)}
                onChange={() => handleAnswer(answer)}
                sx={{
                  display: "none", 
                }}
              />
            }
            label={answer}
            sx={{
              width: "100%",
              backgroundColor: answers.includes(answer) ? "#5da802" : "white",
              color: answers.includes(answer) ? "white" : "black",
              border: "2px solid #5da802",
              borderRadius: "30px",
              padding: "10px 20px",
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: answers.includes(answer) ? "#5da802" : "#f5f5f5",
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
            InputLabelProps={{ style: { color: '#5da802', fontWeight: 600, fontFamily: "Poppins", fontSize: "16px" } }}
            InputProps={{ style: { color: 'black', borderRadius: '50px', borderColor: '#0457a4', } }}
            sx={{
              mt: 2,
              mb: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#0457a4',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#5da802',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5da802',
                },
              },
            }}
          />
        </Box>

        <Box sx={{ textAlign: "right", mt: 7 }}>
          <Button
            // href='/whosusing'
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
            onClick={handleButtonClick} 
            disabled={!allAnswered || submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OtherSymptoms;
