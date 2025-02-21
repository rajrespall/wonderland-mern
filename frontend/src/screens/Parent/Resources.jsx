import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useAssessmentStore from '../../store/assessmentStore';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Grid, CssBaseline } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Spinner from "../../components/Spinner";
import ParentNav from '../../components/ParentNav'; // Changed from NavigationBar to ParentNav

// image imports
import rou from '../../assets/resources2.png'; 
import com from '../../assets/resources1.png'; 
import soc from '../../assets/resources3.png'; 
import sen from '../../assets/resources4.png'; 
import emo from '../../assets/emotional.jpg'; 


const cardData = {
    communication: {
        title: "Improve Communication Skills",
        description: "Enhance your child's verbal and non-verbal communication.",
        image: com,
        color: "#2196F3",
    },
    social: {
        title: "Boost Social Interaction",
        description: "Help your child build better social skills and connections.",
        image: soc,
        color: "#9C27B0",
    },
    sensory: {
        title: "Manage Sensory Sensitivities",
        description: "Techniques to support sensory processing challenges.",
        image: sen,
        color: "#4CAF50",
    },
    emotional: {
        title: "Emotional Regulation Strategies",
        description: "Learn ways to manage emotions and reduce anxiety.",
        image: emo,
        color: "#FF9800",
    },
    routine: {
        title: "Establish Healthy Routines",
        description: "Create structured and comfortable daily routines.",
        image: rou,
        color: "#F44336",
    },
};

const Resources = () => {
    const { userAssessment, loading, error, fetchUserAssessment, showComm, showSocial, showSensory, showEmotional, showRoutine } = useAssessmentStore();
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    useEffect(() => {
        if (userId) {
            fetchUserAssessment(userId);
        }
    }, [userId, fetchUserAssessment]);

    if (loading) return <Spinner />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    backgroundColor: 'rgba(4, 87, 164, 0.1)',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: '100vh',
                    p: 2
                }}
            >
                <ParentNav />
                <Box sx={{ 
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 64px)'
                }}>
                    <Grid 
                        container 
                        spacing={4} 
                        sx={{
                            maxWidth: '1200px',
                            margin: '0 auto',
                            justifyContent: 'center'
                        }}
                    >
                        <Grid item xs={12} sm={6}>
                            {showComm && <InfoCard data={cardData.communication} />}
                            {showEmotional && <InfoCard data={cardData.emotional} />}
                            {showSensory && <InfoCard data={cardData.sensory} />}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {showSocial && <InfoCard data={cardData.social} />}
                            {showRoutine && <InfoCard data={cardData.routine} />}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};


const InfoCard = ({ data }) => {
    const navigate = useNavigate();
    
    const getResourceType = (title) => {
        const typeMap = {
            "Improve Communication Skills": "Communication",
            "Boost Social Interaction": "Social",
            "Manage Sensory Sensitivities": "Sensory",
            "Emotional Regulation Strategies": "Emotional",
            "Establish Healthy Routines": "Routines"
        };
        return typeMap[title];
    };

    const handleClick = () => {
        const resourceType = getResourceType(data.title);
        navigate(`/resources/${resourceType}`);
    };

    return (
        <Card 
            onClick={handleClick}
            sx={{ 
                width: 500, // Adjust the width
                height: 200,
                display: "flex", 
                alignItems: "center", 
                padding: 2, 
                borderRadius: 3, 
                boxShadow: 3, 
                backgroundColor: data.color,
                marginBottom: 6, 
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

export default Resources;
