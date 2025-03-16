import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAssessmentStore from '../../store/assessmentStore';
import { Box, Typography, Card, CardContent, CardMedia, Button, CssBaseline, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Spinner from "../../components/Spinner";
import AssessmentAnalysis from "../../components/AssessmentAnalysis";
import NavigationBar from "../../components/NavigationBar";
import HeroSection from "../../components/Parent/Resources/HeroSection.jsx";

// image imports
import rou from '../../assets/resources2.png'; 
import com from '../../assets/resources1.png'; 
import soc from '../../assets/resources3.png'; 
import sen from '../../assets/resources4.png'; 
import emo from '../../assets/emotional.jpg'; 

const cardData = [
    { title: "Improve Communication Skills", description: "Enhance your child's verbal and non-verbal communication.", image: com, color: "#0457a4", type: 'communication' },
    { title: "Boost Their Social Interaction", description: "Help your child build better social skills and connections.", image: soc, color: "#5da802", type: 'social' },
    { title: "Manage Sensory Sensitivities", description: "Techniques to support sensory processing challenges.", image: sen, color: "#b80201", type: 'sensory' },
    { title: "Emotional Regulation Strategies", description: "Learn ways to manage emotions and reduce anxiety.", image: emo, color: "#f4900c", type: 'emotional' },
    { title: "Establish Healthy Routines", description: "Create structured and comfortable daily routines.", image: rou, color: "#5829c0", type: 'routine' }
];

const Resources = () => {
    const { userAssessment, loading, error, fetchUserAssessment, showComm, showSocial, showSensory, showEmotional, showRoutine } = useAssessmentStore();
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 4;

    useEffect(() => {
        if (userId) {
            fetchUserAssessment(userId);
        }
    }, [userId, fetchUserAssessment]);

    if (loading) return <Spinner />;
    if (error) return <Typography color="error">{error}</Typography>;

    const filteredCards = cardData.filter(card => {
        return (
            (showComm && card.type === 'communication') ||
            (showEmotional && card.type === 'emotional') ||
            (showSensory && card.type === 'sensory') ||
            (showSocial && card.type === 'social') ||
            (showRoutine && card.type === 'routine')
        );
    });

    const nextSlide = () => {
        if (currentIndex + visibleCards < filteredCards.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); 
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(filteredCards.length - visibleCards); 
        }
    };

    return (
        <>
            <CssBaseline />
            <Box sx={{ backgroundColor: 'rgba(4, 87, 164, 0.1)', minHeight: '100vh', textAlign: 'center' }}>
                <NavigationBar />
                <HeroSection />

                <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, overflow: 'hidden', maxWidth: '1500px', margin: '0 auto' }}>
                    <IconButton onClick={prevSlide}>
                        <ArrowBackIos />
                    </IconButton>
                    <Box sx={{ display: 'flex', gap: 2, transition: 'transform 0.5s ease-in-out' }}>
                        {filteredCards.slice(currentIndex, currentIndex + visibleCards).map((card) => (
                            <InfoCard key={card.type} data={card} />
                        ))}
                    </Box>
                    <IconButton onClick={nextSlide}>
                        <ArrowForwardIos />
                    </IconButton>
                </Box>
   
            </Box>
        </>
    );
};

const InfoCard = ({ data }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/resources/${data.type}`);
    };

    return (
        <Card sx={{ width: 300, maxHeight: '500px', display: "flex", flexDirection: "column", alignItems: "center", padding: 3, borderRadius: 3, boxShadow: 3, backgroundColor: data.color, transition: "all 0.3s ease-in-out", '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
            <CardMedia component="img" sx={{ width: 100, height: 100, borderRadius: 2, marginBottom: 2 }} image={data.image} alt={data.title} />
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography fontWeight="bold" color="#fcf230" sx={{ fontFamily: 'Poppins', fontSize: '18px', mb: 2 }}>{data.title}</Typography>
                <Typography color="white" sx={{ fontFamily: 'Poppins', fontSize: '12px' }}>{data.description}</Typography>
            </CardContent>
            <Button variant="contained" sx={{ backgroundColor: "#fcf230", color: "#000", marginTop: 2 }} onClick={handleClick}>Learn More</Button>
        </Card>
    );
};

export default Resources;
