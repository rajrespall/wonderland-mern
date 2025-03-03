import React, { useEffect } from "react";
import { 
    Box, Typography, Card, CardContent, Grid, Avatar,
    List, ListItem, ListItemText, ListItemIcon,
    CircularProgress, Alert, Divider, Chip
} from "@mui/material";
import { 
    TrendingUp, TrendingDown, TrendingFlat, 
    PriorityHigh, CheckCircle, Psychology,
    RecommendOutlined
} from "@mui/icons-material";
import usePredictiveStore from "../../store/predictiveStore";

const PredictiveAnalysis = () => {
    const { 
        logicalAbilityScore, predictedScore, 
        predictiveData, isLoading, error,
        fetchLogicalAbilityScore, fetchPredictiveAnalysis 
    } = usePredictiveStore();

    useEffect(() => {
        fetchLogicalAbilityScore();
        fetchPredictiveAnalysis();
    }, [fetchLogicalAbilityScore, fetchPredictiveAnalysis]);

    const getGrade = (score) => {
        if (score >= 90) return { letter: "A", color: "#4CAF50", gradient: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)" };
        if (score >= 80) return { letter: "B", color: "#2196F3", gradient: "linear-gradient(135deg, #2196F3 0%, #03A9F4 100%)" };
        if (score >= 70) return { letter: "C", color: "#FF9800", gradient: "linear-gradient(135deg, #FF9800 0%, #FFC107 100%)" };
        if (score >= 50) return { letter: "D", color: "#9C27B0", gradient: "linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)" };
        if (score >= 30) return { letter: "E", color: "#FF5722", gradient: "linear-gradient(135deg, #FF5722 0%, #FF7043 100%)" };
        return { letter: "F", color: "#F44336", gradient: "linear-gradient(135deg, #F44336 0%, #EF5350 100%)" };
    };

    // Extract scores for the 4 key skills
    const skillScores = {
        "Logical Ability": {
            score: logicalAbilityScore,
            trend: predictedScore > logicalAbilityScore ? "improving" : 
                   predictedScore < logicalAbilityScore ? "declining" : "neutral",
            growthRate: predictiveData?.growthRate || 0
        },
        "Motor Skills": {
            score: predictiveData?.domainPredictions?.motor?.currentScore || 0,
            trend: predictiveData?.domainPredictions?.motor?.trend || "neutral",
            growthRate: calculateGrowthRate(predictiveData?.domainPredictions?.motor)
        },
        "Social & Communication": {
            score: Math.round(
                ((predictiveData?.domainPredictions?.social?.currentScore || 0) + 
                (predictiveData?.domainPredictions?.communication?.currentScore || 0)) / 2
            ),
            trend: getBestTrend(
                predictiveData?.domainPredictions?.social?.trend,
                predictiveData?.domainPredictions?.communication?.trend
            ),
            growthRate: calculateGrowthRate(predictiveData?.domainPredictions?.social)
        },
        "Creativity": {
            score: predictiveData?.domainPredictions?.creativity?.currentScore || 0,
            trend: predictiveData?.domainPredictions?.creativity?.trend || "neutral",
            growthRate: calculateGrowthRate(predictiveData?.domainPredictions?.creativity)
        }
    };

    function calculateGrowthRate(domainData) {
        if (!domainData) return 0;
        if (domainData.trend === "improving") return Math.abs(domainData.predictedScore - domainData.currentScore);
        if (domainData.trend === "declining") return -Math.abs(domainData.currentScore - domainData.predictedScore);
        return 0;
    }

    function getBestTrend(trend1, trend2) {
        if (trend1 === "improving" || trend2 === "improving") return "improving";
        if (trend1 === "declining" || trend2 === "declining") return "declining";
        return "neutral";
    }

    function getTrendIcon(trend) {
        switch(trend) {
            case 'improving': return <TrendingUp style={{ fontSize: 28 }} />;
            case 'declining': return <TrendingDown style={{ fontSize: 28 }} />;
            default: return <TrendingFlat style={{ fontSize: 28 }} />;
        }
    }

    function getTrendColor(trend) {
        switch(trend) {
            case 'improving': return "#4CAF50";
            case 'declining': return "#F44336";
            default: return "#FF9800";
        }
    }

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, pl: 4, pt: 2 }}>
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
                {Object.entries(skillScores).map(([skillName, data]) => {
                    const { letter, color, gradient } = getGrade(data.score);
                    const trendColor = getTrendColor(data.trend);
                    const growthText = data.growthRate > 0 
                        ? `+${data.growthRate}%` 
                        : data.growthRate < 0 
                            ? `${data.growthRate}%` 
                            : `0%`;
                    
                    return (
                        <Grid item xs={12} sm={6} md={3} key={skillName}>
                            <Card 
                                sx={{ 
                                    borderRadius: 4, 
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)", 
                                    overflow: "visible",
                                    height: "100%", // Ensure all cards have same height
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    ":hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                                    }
                                }}
                            >
                                <Box sx={{ 
                                    height: "8px", 
                                    width: "100%", 
                                    background: gradient,
                                    borderTopLeftRadius: "16px",
                                    borderTopRightRadius: "16px",
                                    flexShrink: 0
                                }}/>
                                <CardContent sx={{ 
                                    textAlign: "center", 
                                    padding: "25px 16px", 
                                    position: "relative",
                                    background: "#fff",
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <Box>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                mb: 3, 
                                                fontFamily: 'Poppins',
                                                color: "#2C3E50"
                                            }}
                                        >
                                            {skillName}
                                        </Typography>
                                        
                                        <Avatar 
                                            sx={{ 
                                                background: gradient,
                                                color: "white", 
                                                width: 90, 
                                                height: 90, 
                                                fontSize: "40px", 
                                                fontWeight: "bold",
                                                mx: "auto",
                                                boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
                                            }}
                                        >
                                            {letter}
                                        </Avatar>
                                    </Box>
                                    
                                    <Box sx={{ mt: 3 }}>
                                        <Box sx={{ 
                                            mt: 3, 
                                            mb: 1,
                                            display: "flex", 
                                            alignItems: "center", 
                                            justifyContent: "center",
                                            padding: "8px 16px",
                                            borderRadius: "24px",
                                            backgroundColor: `${trendColor}15`,
                                            width: "fit-content",
                                            mx: "auto"
                                        }}>
                                            <Box sx={{ 
                                                color: trendColor,
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                {getTrendIcon(data.trend)}
                                                <Typography 
                                                    sx={{ 
                                                        fontWeight: 600, 
                                                        fontSize: "20px", 
                                                        ml: 1,
                                                        color: trendColor
                                                    }}
                                                >
                                                    {growthText}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ 
                                                fontStyle: "italic",
                                                mt: 1
                                            }}
                                        >
                                            {data.trend === "improving" ? "per month growth" : 
                                             data.trend === "declining" ? "per month decrease" : 
                                             "maintaining level"}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            
            {/* Recommendations Section */}
            {predictiveData?.recommendations?.length > 0 && (
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
                    <Card sx={{ 
                        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                        borderRadius: 4,
                        overflow: "hidden" 
                    }}>
                        <Box sx={{ 
                            p: 2, 
                            background: "linear-gradient(135deg, #0457a4 0%, #0476d9 100%)",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <RecommendOutlined sx={{ color: "white", mr: 1 }} />
                            <Typography variant="h6" sx={{ color: "white", fontFamily: "Poppins" }}>
                                Personalized Recommendations
                            </Typography>
                        </Box>
                        <CardContent sx={{ p: 0 }}>
                            <List sx={{ p: 0 }}>
                                {predictiveData.recommendations.map((recommendation, index) => {
                                    let iconColor, bgColor;
                                    if (recommendation.type === 'focus') {
                                        iconColor = "#F44336";
                                        bgColor = "#FEE8E7";
                                    } else if (recommendation.type === 'improvement') {
                                        iconColor = "#FF9800";
                                        bgColor = "#FFF3E0";
                                    } else {
                                        iconColor = "#4CAF50";
                                        bgColor = "#E8F5E9";
                                    }
                                    
                                    return (
                                        <React.Fragment key={index}>
                                            <ListItem 
                                                alignItems="flex-start" 
                                                sx={{ 
                                                    p: 3,
                                                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white"
                                                }}
                                            >
                                                <ListItemIcon sx={{ 
                                                    minWidth: "44px",
                                                    height: "44px",
                                                    width: "44px",
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: bgColor,
                                                    color: iconColor
                                                }}>
                                                    {recommendation.type === 'focus' ? 
                                                        <PriorityHigh /> : 
                                                        recommendation.type === 'improvement' ? 
                                                            <Psychology /> : 
                                                            <CheckCircle />
                                                    }
                                                </ListItemIcon>
                                                <ListItemText 
                                                    primary={
                                                        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                                            <Typography 
                                                                variant="subtitle1" 
                                                                sx={{ 
                                                                    fontWeight: 600,
                                                                    color: "#2C3E50"
                                                                }}
                                                            >
                                                                {recommendation.domain.charAt(0).toUpperCase() + recommendation.domain.slice(1)}
                                                            </Typography>
                                                            <Chip 
                                                                label={recommendation.type} 
                                                                size="small" 
                                                                sx={{ 
                                                                    ml: 1.5, 
                                                                    backgroundColor: iconColor,
                                                                    color: "white",
                                                                    fontWeight: 500,
                                                                    textTransform: "capitalize"
                                                                }} 
                                                            />
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Typography variant="body2" color="text.secondary">
                                                            {recommendation.message}
                                                        </Typography>
                                                    }
                                                    sx={{ ml: 1.5 }}
                                                />
                                            </ListItem>
                                            {index < predictiveData.recommendations.length - 1 && 
                                                <Divider sx={{ opacity: 0.6 }} />
                                            }
                                        </React.Fragment>
                                    );
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
};

export default PredictiveAnalysis;