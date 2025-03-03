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
        fetchLogicalAbilityScore,

        // 🔹 Fetch Motor Skills data
        motorSkillsScore,
        motorTrend,
        fetchMotorSkillsScore
    } = usePredictiveStore();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchLogicalAbilityScore();
                await fetchMotorSkillsScore(); // 🔹 Fetch motor skills data
            } catch (error) {
                setError("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [fetchLogicalAbilityScore, fetchMotorSkillsScore]);

    const getGrade = (score) => {
        if (score >= 90) return { letter: "A", color: "#4CAF50", gradient: "#4CAF50" };
        if (score >= 80) return { letter: "B", color: "#2196F3", gradient: "#2196F3" };
        if (score >= 70) return { letter: "C", color: "#FF9800", gradient: "#FF9800" };
        if (score >= 50) return { letter: "D", color: "#9C27B0", gradient: "#9C27B0" };
        if (score >= 30) return { letter: "E", color: "#FF5722", gradient: "#FF5722" };
        return { letter: "F", color: "#F44336", gradient: "#F44336" };
    };

    const { letter: logicalLetter, gradient: logicalGradient } = getGrade(logicalAbilityScore);
    const { letter: motorLetter, gradient: motorGradient } = getGrade(motorSkillsScore); // 🔹 Get Motor Skills Grade

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
                    <Card sx={{ borderRadius: 4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>
                        <Box sx={{ height: "8px", width: "100%", background: logicalGradient }} />
                        <CardContent sx={{ textAlign: "center", p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#2C3E50" }}>
                                Logical Ability
                            </Typography>
                            <Avatar sx={{ background: logicalGradient, color: "white", width: 90, height: 90, fontSize: "40px", fontWeight: "bold", mx: "auto", mt: 2 }}>
                                {logicalLetter}
                            </Avatar>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
                                {getTrendIcon(trend)}
                                <Typography sx={{ fontWeight: 600, fontSize: "20px", ml: 1, color: "#2C3E50" }}>
                                    {growthPercentage > 0 ? `+${growthPercentage}%` : `${growthPercentage}%`}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {getTrendText(trend)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* 🔹 Motor Skills Card (NEW) */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>
                        <Box sx={{ height: "8px", width: "100%", background: motorGradient }} />
                        <CardContent sx={{ textAlign: "center", p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#2C3E50" }}>
                                Motor Skills
                            </Typography>
                            <Avatar sx={{ background: motorGradient, color: "white", width: 90, height: 90, fontSize: "40px", fontWeight: "bold", mx: "auto", mt: 2 }}>
                                {motorLetter}
                            </Avatar>

                            {/* 🔹 Display Trend Percentage */}
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
                                {getTrendIcon(motorTrend?.trend)}
                                <Typography sx={{ fontWeight: 600, fontSize: "20px", ml: 1, color: "#2C3E50" }}>
                                    {motorTrend?.avgScore ? `${motorTrend.avgScore}%` : "0%"}
                                </Typography>
                            </Box>

                            {/* 🔹 Display Trend Text */}
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {getTrendText(motorTrend?.trend)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 🔹 Recommendations Section */}
            <Box sx={{ mt: 6, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins", mb: 4 }}>
                    Recommendations
                </Typography>
                <Card sx={{ boxShadow: "0 10px 20px rgba(0,0,0,0.08)", borderRadius: 4 }}>
                    <Box sx={{ p: 2, background: "linear-gradient(135deg, #0457a4 0%, #0476d9 100%)", display: "flex", alignItems: "center" }}>
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
