import React, { useEffect, useState } from "react";
import { 
    Box, Typography, Card, CardContent, Grid, Avatar,
    CircularProgress, Alert
} from "@mui/material";
import { 
    TrendingUp, TrendingDown, TrendingFlat
} from "@mui/icons-material";
import usePredictiveStore from "../../store/predictiveStore";

const PredictiveAnalysis = () => {
    const {
        logicalAbilityScore,
        growthPercentage,
        trend,
        fetchLogicalAbilityScore
    } = usePredictiveStore();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchLogicalAbilityScore();
            } catch (error) {
                setError("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [fetchLogicalAbilityScore]);

    const getGrade = (score) => {
        if (score >= 90) return { letter: "A", color: "#4CAF50", gradient: "#4CAF50" };
        if (score >= 80) return { letter: "B", color: "#2196F3", gradient: "#2196F3" };
        if (score >= 70) return { letter: "C", color: "#FF9800", gradient: "#FF9800" };
        if (score >= 50) return { letter: "D", color: "#9C27B0", gradient: "#9C27B0" };
        if (score >= 30) return { letter: "E", color: "#FF5722", gradient: "#FF5722" };
        return { letter: "F", color: "#F44336", gradient: "#F44336" };
    };

    const { letter, gradient } = getGrade(logicalAbilityScore);

    const getTrendIcon = (trend) => {
        switch(trend) {
            case 'improving': return <TrendingUp style={{ fontSize: 24, color: "#4CAF50" }} />;
            case 'declining': return <TrendingDown style={{ fontSize: 24, color: "#F44336" }} />;
            default: return <TrendingFlat style={{ fontSize: 24, color: "#FF9800" }} />;
        }
    };

    const getTrendText = (trend) => {
        return trend === "improving" ? "per month growth"
            : trend === "declining" ? "per month decrease"
            : "maintaining level";
    };

    if (isLoading) return <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}><CircularProgress /></Box>;
    if (error) return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Box>;

    return (
        <Box sx={{ flexGrow: 1, px: 4, pt: 2 }}>
            {/* 🔹 Section Title */}
            <Typography variant="h5" sx={{ 
                fontWeight: "bold", 
                color: "#0457a4", 
                fontFamily: "Poppins", 
                mb: 4,
                position: "relative",
                "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    left: 0,
                    width: "60px",
                    height: "4px",
                    backgroundColor: "#0457a4",
                    borderRadius: "10px"
                }
            }}>
                Skills Assessment
            </Typography>

            <Grid container spacing={4} sx={{ mt: 1 }}>
                {/* 🔹 Logical Ability Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ 
                        borderRadius: 4, 
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)", 
                        overflow: "hidden",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        ":hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                        }
                    }}>
                        {/* 🔹 Top Colored Border */}
                        <Box sx={{ 
                            height: "8px", 
                            width: "100%", 
                            background: gradient
                        }} />
                        
                        <CardContent sx={{ textAlign: "center", p: 3 }}>
                            {/* 🔹 Skill Name */}
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#2C3E50" }}>
                                Logical Ability
                            </Typography>

                            {/* 🔹 Grade Letter Avatar */}
                            <Avatar 
                                sx={{ 
                                    background: gradient, 
                                    color: "white", 
                                    width: 90, 
                                    height: 90, 
                                    fontSize: "40px", 
                                    fontWeight: "bold",
                                    mx: "auto",
                                    mt: 2,
                                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                                }}
                            >
                                {letter}
                            </Avatar>

                            {/* 🔹 Trend Indicator */}
                            <Box sx={{ 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center",
                                mt: 3,
                                backgroundColor: "#E8F5E9",
                                borderRadius: "20px",
                                px: 2,
                                py: 1,
                                width: "fit-content",
                                mx: "auto"
                            }}>
                                {getTrendIcon(trend)}
                                <Typography sx={{ fontWeight: 600, fontSize: "20px", ml: 1, color: "#2C3E50" }}>
                                    {growthPercentage > 0 ? `+${growthPercentage}%` : `${growthPercentage}%`}
                                </Typography>
                            </Box>

                            {/* 🔹 Growth Rate Description */}
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {getTrendText(trend)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 🔹 Recommendations Section */}
            <Box sx={{ mt: 6, mb: 4 }}>
                <Typography variant="h5" sx={{ 
                    fontWeight: "bold", 
                    color: "#0457a4", 
                    fontFamily: "Poppins", 
                    mb: 4,
                    position: "relative",
                    "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: -10,
                        left: 0,
                        width: "60px",
                        height: "4px",
                        backgroundColor: "#0457a4",
                        borderRadius: "10px"
                    }
                }}>
                    Recommendations
                </Typography>
                
                <Card sx={{ boxShadow: "0 10px 20px rgba(0,0,0,0.08)", borderRadius: 4 }}>
                    <Box sx={{ 
                        p: 2, 
                        background: "linear-gradient(135deg, #0457a4 0%, #0476d9 100%)",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Typography variant="h6" sx={{ color: "white", fontFamily: "Poppins" }}>
                            Personalized Recommendations
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, textAlign: "center", color: "#777" }}>
                        No recommendations available yet.
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default PredictiveAnalysis;
