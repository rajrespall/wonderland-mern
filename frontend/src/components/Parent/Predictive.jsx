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
        predictedScore,
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
        if (score >= 90) return { letter: "A", color: "#4CAF50", gradient: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)" };
        if (score >= 80) return { letter: "B", color: "#2196F3", gradient: "linear-gradient(135deg, #2196F3 0%, #03A9F4 100%)" };
        if (score >= 70) return { letter: "C", color: "#FF9800", gradient: "linear-gradient(135deg, #FF9800 0%, #FFC107 100%)" };
        if (score >= 50) return { letter: "D", color: "#9C27B0", gradient: "linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)" };
        if (score >= 30) return { letter: "E", color: "#FF5722", gradient: "linear-gradient(135deg, #FF5722 0%, #FF7043 100%)" };
        return { letter: "F", color: "#F44336", gradient: "linear-gradient(135deg, #F44336 0%, #EF5350 100%)" };
    };

    const { letter, gradient } = getGrade(logicalAbilityScore);

    const getTrendIcon = (trend) => {
        switch(trend) {
            case 'improving': return <TrendingUp style={{ fontSize: 28, color: "#4CAF50" }} />;
            case 'declining': return <TrendingDown style={{ fontSize: 28, color: "#F44336" }} />;
            default: return <TrendingFlat style={{ fontSize: 28, color: "#FF9800" }} />;
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
        <Box sx={{ flexGrow: 1, pl: 4, pt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins", mb: 4 }}>
                Skills Assessment
            </Typography>

            <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
                        <Box sx={{ height: "8px", width: "100%", background: gradient, borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }} />
                        <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="h6">Logical Ability</Typography>
                            <Avatar sx={{ background: gradient, color: "white", width: 90, height: 90, fontSize: "40px", mx: "auto" }}>
                                {letter}
                            </Avatar>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
                                {getTrendIcon(trend)}
                                <Typography sx={{ fontWeight: 600, fontSize: "20px", ml: 1 }}>
                                    {growthPercentage > 0 ? `+${growthPercentage}%` : `${growthPercentage}%`}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {getTrendText(trend)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PredictiveAnalysis;
