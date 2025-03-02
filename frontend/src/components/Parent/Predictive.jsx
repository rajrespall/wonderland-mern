import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid, Avatar } from "@mui/material";
import usePredictiveStore from "../../store/predictiveStore";

const Predictive = () => {
    const { logicalAbilityScore, predictedScore, fetchLogicalAbilityScore } = usePredictiveStore();

    useEffect(() => {
        fetchLogicalAbilityScore();
    }, [fetchLogicalAbilityScore]);

    const getGrade = (score) => {
        if (score >= 90) return { letter: "A", color: "#4CAF50" };
        if (score >= 80) return { letter: "B", color: "#2196F3" };
        if (score >= 70) return { letter: "C", color: "#FF9800" };
        if (score >= 50) return { letter: "D", color: "#9C27B0" };
        if (score >= 30) return { letter: "E", color: "#FF5722" };
        return { letter: "F", color: "#F44336" };
    };

    const { letter, color } = getGrade(logicalAbilityScore);
    const predictedGrade = getGrade(predictedScore || 0);

    const categories = [
        { label: "Motor Skills", key: "motor", color: "#f57c00", activities: 8, avgPerformance: 78, bestScore: 90 },
        { label: "Social & Communication Skills", key: "social", color: "#fbc02d", activities: 12, avgPerformance: 80, bestScore: 88 },
        { label: "Creativity", key: "creativity", color: "#4caf50", activities: 15, avgPerformance: 92, bestScore: 98 }
    ];

    return (
        <Box sx={{ flexGrow: 1, pl: 4, pt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins" }}>
                Current Data Analysis
            </Typography>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ boxShadow: 3, bgcolor: '#f8f9fa', borderLeft: `4px solid ${color}`, height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>
                                Logical Ability
                            </Typography>
                            <Avatar 
                                sx={{ 
                                    bgcolor: color, 
                                    color: "white", 
                                    width: 80, 
                                    height: 80, 
                                    fontSize: "36px", 
                                    fontWeight: "bold"
                                }}>
                                {letter}
                            </Avatar>
                            <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold", fontSize: "18px" }}>
                                {logicalAbilityScore}/100
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {categories.map(({ label, color, key, activities, avgPerformance, bestScore }) => (
                    <Grid item xs={12} sm={6} md={3} key={label}>
                        <Card sx={{ boxShadow: 3, bgcolor: '#f8f9fa', borderLeft: `4px solid ${color}`, height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>
                                    {label}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Total Activities:</strong> {activities}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Avg. Performance:</strong> {avgPerformance}%
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Best Score:</strong> {bestScore}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins", mt: 5 }}>
                Predictive Analysis
            </Typography>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ boxShadow: 3, bgcolor: '#f8f9fa', borderLeft: `4px solid ${predictedGrade.color}`, height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>
                                 Logical Ability
                            </Typography>
                            <Avatar 
                                sx={{ 
                                    bgcolor: predictedGrade.color, 
                                    color: "white", 
                                    width: 80, 
                                    height: 80, 
                                    fontSize: "36px", 
                                    fontWeight: "bold"
                                }}>
                                {predictedGrade.letter}
                            </Avatar>
                            <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold", fontSize: "18px" }}>
                                {predictedScore !== null ? `${predictedScore}/100` : "?"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {categories.map(({ label, color, key, activities, avgPerformance, bestScore }) => (
                    <Grid item xs={12} sm={6} md={3} key={label}>
                        <Card sx={{ boxShadow: 3, bgcolor: '#f8f9fa', borderLeft: `4px solid ${color}`, height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Poppins' }}>
                                    Predicted {label}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Total Activities:</strong> {activities}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Avg. Performance:</strong> {avgPerformance}%
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Best Score:</strong> {bestScore}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Predictive;