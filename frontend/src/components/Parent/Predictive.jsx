import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import usePredictiveStore from "../../store/predictiveStore";

const Predictive = () => {
    const { logicalAbilityScore, fetchLogicalAbilityScore } = usePredictiveStore();

    useEffect(() => {
        fetchLogicalAbilityScore();
    }, [fetchLogicalAbilityScore]);

    const categories = [
        { label: "Logical Ability", key: "logical", color: "#d32f2f", score: logicalAbilityScore },
        { label: "Motor Skills", key: "motor", color: "#f57c00", activities: 8, avgPerformance: 78, bestScore: 90 },
        { label: "Social & Communication Skills", key: "social", color: "#fbc02d", activities: 12, avgPerformance: 80, bestScore: 88 },
        { label: "Creativity", key: "creativity", color: "#4caf50", activities: 15, avgPerformance: 92, bestScore: 98 }
    ];

    return (
        <Box sx={{ flexGrow: 1, pl: 4, pt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins" }}>
                Predictive Analysis
            </Typography>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                {categories.map(({ label, color, key, activities, avgPerformance, bestScore, score }) => (
                    <Grid item xs={12} sm={6} md={3} key={label}>
                        <Card sx={{ boxShadow: 3, bgcolor: '#f8f9fa', borderLeft: `4px solid ${color}`, height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Poppins' }}>
                                    {label}
                                </Typography>

                                {/* Logical Ability Score */}
                                {key === "logical" ? (
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>Score:</strong> {score}
                                    </Typography>
                                ) : (
                                    <>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Total Activities:</strong> {activities}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Avg. Performance:</strong> {avgPerformance}%
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Best Score:</strong> {bestScore}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Predictive;
