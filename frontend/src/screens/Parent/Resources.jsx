import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useAssessmentStore from '../../store/assessmentStore';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Grid, CssBaseline } from "@mui/material";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import Spinner from "../../components/Spinner";
import ParentNav from '../../components/ParentNav'; 
import AssessmentAnalysis from "../../components/AssessmentAnalysis";

// image imports
import rou from '../../assets/resources2.png'; 
import com from '../../assets/resources1.png'; 
import soc from '../../assets/resources3.png'; 
import sen from '../../assets/resources4.png'; 
import emo from '../../assets/emotional.jpg'; 
import NavigationBar from "../../components/NavigationBar";


const cardData = {
    communication: {
        title: "Improve Communication Skills",
        description: "Enhance your child's verbal and non-verbal communication.",
        image: com,
        color: "#0457a4",
    },
    social: {
        title: "Boost Social Interaction",
        description: "Help your child build better social skills and connections.",
        image: soc,
        color: "#5da802",
    },
    sensory: {
        title: "Manage Sensory Sensitivities",
        description: "Techniques to support sensory processing challenges.",
        image: sen,
        color: "#b80201",
    },
    emotional: {
        title: "Emotional Regulation Strategies",
        description: "Learn ways to manage emotions and reduce anxiety.",
        image: emo,
        color: "#f4900c",
    },
    routine: {
        title: "Establish Healthy Routines",
        description: "Create structured and comfortable daily routines.",
        image: rou,
        color: "#5829c0",
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
                    
                    minHeight: '100vh',
                    p: 2
                }}
            >
                <ParentNav />
                <Typography
                    sx={{
                        mt: 4,
                        fontFamily: 'Poppins',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: '#0457a4',
                        textAlign: 'center',
                    }}>
                        Resources 
                    </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Poppins',
                        color: '#0457a4',
                        textAlign: 'center',
                    }}>
                        Learn how improve the commuincation skills and more!
                    </Typography>

                    <Grid container spacing={4} sx={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {[
                            showComm && { ...cardData.communication, type: 'communication' },
                            showEmotional && { ...cardData.emotional, type: 'emotional' },
                            showSensory && { ...cardData.sensory, type: 'sensory' },
                            showSocial && { ...cardData.social, type: 'social' },
                            showRoutine && { ...cardData.routine, type: 'routine' }
                        ].filter(Boolean).map((card, index) => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                key={card.type}
                                sx={{
                                    display: 'flex',
                                    justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <InfoCard data={card} />
                            </Grid>
                        ))}
                    </Grid>
                <Box sx={{ width: '100%', maxWidth: '100%', p: 4 }}>
                {userAssessment?.analysis && (
                    <AssessmentAnalysis analysis={userAssessment.analysis} />
                )}
                    
                    
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
                width: 500, 
                height: 200,
                display: "flex", 
                alignItems: "center", 
                padding: 3, 
                borderRadius: 3, 
                boxShadow: 3, 
                backgroundColor: data.color,
                marginBottom: 2,
                marginRight: 2, 
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
                    width: 100, 
                    height: 100, 
                    borderRadius: 2, 
                    marginRight: 2,
                    transition: "transform 0.3s ease-in-out", 
                }}
                image={data.image}
                alt={data.title}
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="#fcf230"
                sx={{
                    fontFamily: 'Poppins',
                    fontSize: '18px',
                    mb: 2
                }}>
                    {data.title}
                </Typography>
                <Typography variant="body2" color="white"
                sx={{
                    fontFamily: 'Poppins',
                    fontSize: '14px'
                }}>
                    {data.description}
                </Typography>
            </CardContent>
            <IconButton 
            sx={{ 
                color: "#fcf230", }}>
                <EastRoundedIcon 
                sx={{
                    fontSize: '40px'
                }}/>
            </IconButton>
        </Card>
    );
};

export default Resources;
