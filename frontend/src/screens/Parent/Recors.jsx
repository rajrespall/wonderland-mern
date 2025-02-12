import React, { useEffect, useState } from "react";
import useRecStore from "../../store/recStore";
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Spinner from "../../components/Spinner";
import { useSpring, animated } from '@react-spring/web';

// Sample images for each category
const cardData = {
    communication: {
        title: "Improve Communication Skills",
        description: "Enhance your child's verbal and non-verbal communication.",
        image: "/images/communication.png",
        color: "#2196F3", // Blue
    },
    social: {
        title: "Boost Social Interaction",
        description: "Help your child build better social skills and connections.",
        image: "/images/social.png",
        color: "#9C27B0", // Purple
    },
    sensory: {
        title: "Manage Sensory Sensitivities",
        description: "Techniques to support sensory processing challenges.",
        image: "/images/sensory.png",
        color: "#4CAF50", // Green
    },
    emotional: {
        title: "Emotional Regulation Strategies",
        description: "Learn ways to manage emotions and reduce anxiety.",
        image: "/images/emotional.png",
        color: "#FF9800", // Orange
    },
    routine: {
        title: "Establish Healthy Routines",
        description: "Create structured and comfortable daily routines.",
        image: "/images/routine.png",
        color: "#F44336", // Red
    },
};

const Recors = () => {
    const { userAssessment, loading, error, fetchUserAssessment } = useRecStore();
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
    
    const [showComm, setShowComm] = useState(false);
    const [showSocial, setShowSocial] = useState(false);
    const [showSensory, setShowSensory] = useState(false);
    const [showEmotional, setShowEmotional] = useState(false);
    const [showRoutine, setShowRoutine] = useState(false);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (userId) {
            fetchUserAssessment(userId);
        }
    }, [userId, fetchUserAssessment]);

    useEffect(() => {
        if (userAssessment) {
            setShowComm(JSON.stringify(userAssessment.communication) !== JSON.stringify([4, 1, 1, 1]));
            setShowSocial(JSON.stringify(userAssessment.social) !== JSON.stringify([4, 4, 1, 1]));
            setShowSensory(JSON.stringify(userAssessment.sensory) !== JSON.stringify([1, 1, 1]));
            setShowEmotional(JSON.stringify(userAssessment.emotional) !== JSON.stringify([1, 1, 1]));
            setShowRoutine(JSON.stringify(userAssessment.routine) !== JSON.stringify([1, 1, 1]));
        }
    }, [userAssessment]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Parallax effect for background using react-spring
    const props = useSpring({
        backgroundPosition: `center ${scrollY * 0.5}px`, // Control the speed of the background parallax
        config: { tension: 170, friction: 26 }
    });

    // Return early only if there's an error or if loading
    if (loading) return <Spinner />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box
            textAlign="center"
            mt={4}
            sx={{
                display: "grid",
                gap: 3,
                justifyContent: "center",
                maxWidth: 800,
                margin: "auto",
                position: "relative",
            }}
        >
            {/* Animated Parallax Background */}
            <animated.div
                style={{
                    ...props,
                    backgroundImage: `url('/images/background.jpg')`,
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    height: "100vh",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: -1, // Send it behind the content
                }}
            />

            {/* Render Cards Dynamically */}
            {showComm && <InfoCard data={cardData.communication} />}
            {showSocial && <InfoCard data={cardData.social} />}
            {showSensory && <InfoCard data={cardData.sensory} />}
            {showEmotional && <InfoCard data={cardData.emotional} />}
            {showRoutine && <InfoCard data={cardData.routine} />}
        </Box>
    );
};

// Reusable InfoCard Component
const InfoCard = ({ data }) => {
    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: data.color,
                "&:hover": {
                    backgroundColor: `${data.color}cc`,
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                },
                transition: "all 0.3s ease-in-out",
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 2,
                    marginRight: 2,
                    transition: "transform 0.3s ease-in-out",
                }}
                image={data.image}
                alt={data.title}
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="white">
                    {data.title}
                </Typography>
                <Typography variant="body2" color="white">
                    {data.description}
                </Typography>
            </CardContent>
            <IconButton sx={{ color: "white" }}>
                <ArrowForwardIcon />
            </IconButton>
        </Card>
    );
};

export default Recors;
