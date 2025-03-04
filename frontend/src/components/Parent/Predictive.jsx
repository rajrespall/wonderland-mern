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

        
        motorSkillsScore,
        motorTrend,
        fetchMotorSkillsScore,

        socialCommunicationScore,
        socialTrend,
        fetchSocialCommunicationScore,

        creativityScore,
        creativityTrend,
        fetchCreativityScore
    } = usePredictiveStore();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchLogicalAbilityScore();
                await fetchMotorSkillsScore(); 
                await fetchSocialCommunicationScore();
                await fetchCreativityScore();
            } catch (error) {
                setError("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [fetchLogicalAbilityScore, fetchMotorSkillsScore, fetchSocialCommunicationScore, fetchCreativityScore]);

    const getGrade = (score) => {
        if (score >= 90) return { letter: "A", color: "#4CAF50", gradient: "#4CAF50" };
        if (score >= 80) return { letter: "B", color: "#2196F3", gradient: "#2196F3" };
        if (score >= 70) return { letter: "C", color: "#FF9800", gradient: "#FF9800" };
        if (score >= 50) return { letter: "D", color: "#9C27B0", gradient: "#9C27B0" };
        if (score >= 30) return { letter: "E", color: "#FF5722", gradient: "#FF5722" };
        return { letter: "F", color: "#F44336", gradient: "#F44336" };
    };

    const { letter: logicalLetter, gradient: logicalGradient } = getGrade(logicalAbilityScore);
    const { letter: motorLetter, gradient: motorGradient } = getGrade(motorSkillsScore); 
    const { letter: socialLetter, gradient: socialGradient } = getGrade(socialCommunicationScore);
    const {letter: creativityLetter, gradient: creativityGradient} = getGrade(creativityScore);

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
   const getRecommendation = (category, grade) => {
    const institutions = {
        motor: "Physical Therapy Center - Click here to redirect.",
        social: "Speech and Communication Center - Click here to redirect.",
        creativity: "Creative Arts Workshop - Click here to redirect.",
        logical: "Math & Logic Academy - Click here to redirect."
    };

    const comments = {
        B: {
            logical: [
                "Great job! Try solving more complex puzzles to sharpen your skills.",
                "You're doing well! Practicing problem-solving will help you get even better.",
            ],
            motor: [
                "You're improving! Try activities like drawing or playing catch to enhance motor skills.",
                "Practice makes perfect! Consider balance exercises for coordination.",
            ],
            social: [
                "You're doing great! Engaging in group conversations will further enhance your skills.",
                "Practice speaking slowly and clearly to express ideas more effectively.",
            ],
            creativity: [
                "You're doing great! Experimenting with new art styles can boost your creativity.",
                "Try storytelling or improvisation exercises to think outside the box.",
            ]
        },
        C: {
            logical: [
                "You're getting there! Try breaking down complex problems into smaller steps.",
                "Don't get discouraged! Practicing daily logic puzzles can enhance your thinking skills.",
            ],
            motor: [
                "Your motor skills are developing! Try playing with clay or threading beads.",
                "Building finger strength with simple hand exercises can help improve precision.",
            ],
            social: [
                "You're improving! Practicing eye contact and active listening will help a lot.",
                "Try participating in group discussions to enhance communication skills.",
            ],
            creativity: [
                "You're creative! Exploring new forms of art, like digital design, can help.",
                "Keep pushing your creative limits! Trying abstract ideas may spark inspiration.",
            ]
        },
        D: {
            logical: [
                "You're improving! Consider working on pattern-recognition games for logic training.",
                "Practice daily puzzles to boost confidence in logical thinking.",
            ],
            motor: [
                "You're making progress! Consider using sensory toys to improve motor skills.",
                "Physical activities like stretching and yoga can help with coordination.",
            ],
            social: [
                "You're getting better! Try engaging in structured conversations with prompts.",
                "Acting out different scenarios can help with social interactions.",
            ],
            creativity: [
                "Creativity takes practice! Try doodling or free-writing daily.",
                "Engaging in storytelling can help boost creative thinking.",
            ]
        },
        E: {
            logical: [
                "You're making progress! A structured learning approach can help.",
                "Consider working with a tutor to strengthen logical skills.",
            ],
            motor: [
                "Developing motor skills takes time! Structured activities like dance classes may help.",
                "Consider therapy-based activities such as occupational therapy.",
            ],
            social: [
                "Consider joining a social development program for extra practice.",
                "Practicing structured role-playing scenarios can improve comfort.",
            ],
            creativity: [
                "A structured approach to creativity might help—guided activities could be useful.",
                "Try art therapy or music therapy for hands-on creative development.",
            ]
        },
        F: {
            logical: [
                "It might be helpful to try a structured logic program at Math & Logic Academy - Click here to redirect.",
                "Consider working with an instructor to develop problem-solving skills. - Click here to redirect",
            ],
            motor: [
                "A specialized motor skills program at Physical Therapy Center could be helpful. - Click here to redirect.",
                "Therapeutic exercises like stretching and balancing can help improve coordination. - Click here to redirect",
            ],
            social: [
                "A speech therapist at Speech and Communication Center may be beneficial - Click here to redirect.",
                "One-on-one guided social therapy sessions may help improve communication. - Click here to redirect",
            ],
            creativity: [
                "A creative arts program at Creative Arts Workshop might be useful - Click here to redirect.",
                "Trying structured art therapy sessions may be helpful. - Click here to redirect",
            ]
        }
    };

    if (grade === "A") return null; // No recommendation for A
    const categoryComments = comments[grade][category];
    return categoryComments[Math.floor(Math.random() * categoryComments.length)];
};

const recommendations = [];

const logicalRecommendation = getRecommendation("logical", logicalLetter);
const motorRecommendation = getRecommendation("motor", motorLetter);
const socialRecommendation = getRecommendation("social", socialLetter);
const creativityRecommendation = getRecommendation("creativity", creativityLetter);

if (logicalRecommendation) recommendations.push({ label: "Logical Ability", text: logicalRecommendation });
if (motorRecommendation) recommendations.push({ label: "Motor Skills", text: motorRecommendation });
if (socialRecommendation) recommendations.push({ label: "Social Communication", text: socialRecommendation });
if (creativityRecommendation) recommendations.push({ label: "Creativity", text: creativityRecommendation });
    

    if (isLoading) return <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}><CircularProgress /></Box>;
    if (error) return <Box sx={{ p: 3 }}><Alert severity="error">{error}</Alert></Box>;

    return (
        <Box sx={{ flexGrow: 1, px: 4, pt: 2 }}>

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

            {/* 🔹 Display Average Score Instead of Percentage */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
                {getTrendIcon(motorTrend?.trend)}
                <Typography sx={{ fontWeight: 600, fontSize: "20px", mt: 1, color: "#2C3E50" }}>
    {motorTrend?.consistencyRatio ? `+${motorTrend.consistencyRatio}% ` : "0%"}
</Typography>
            </Box>

            {/* 🔹 Display Trend Text */}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {getTrendText(motorTrend?.trend)}
            </Typography>
        </CardContent>
    </Card>
</Grid>

{/* 🔹 Social Communication Card (FIXED) */}

<Grid item xs={12} sm={6} md={3}>
    <Card sx={{ borderRadius: 4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>
        <Box sx={{ height: "8px", width: "100%", background: socialGradient }} /> 
        <CardContent sx={{ textAlign: "center", p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#2C3E50" }}>
                Social Communication
            </Typography>
            <Avatar sx={{ background: socialGradient, color: "white", width: 90, height: 90, fontSize: "40px", fontWeight: "bold", mx: "auto", mt: 2 }}>
                {socialLetter}
            </Avatar>

            {/* 🔹 Display Score & Trend */}
          

            {/* 🔹 Display Percentage Change Below Letter */}
          
            <Typography sx={{ fontWeight: 600, fontSize: "20px", mt: 1, color: "#2C3E50" }}>
            {getTrendIcon(socialTrend?.trend)}
                {socialTrend?.percentageChange ? `+${socialTrend.percentageChange}%` : "0%"}
            </Typography>

            {/* 🔹 Display Trend Text Below Percentage Change */}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {getTrendText(socialTrend?.trend)}
            </Typography>
        </CardContent>
    </Card>
</Grid>


{/* 🔹 Creativity Card */}
{/* 🔹 Creativity Card */}
<Grid item xs={12} sm={6} md={3}>
    <Card sx={{ borderRadius: 4, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>
        <Box sx={{ height: "8px", width: "100%", background: creativityGradient }} /> 
        <CardContent sx={{ textAlign: "center", p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#2C3E50" }}>
                Creativity
            </Typography>
            <Avatar sx={{ background: creativityGradient, color: "white", width: 90, height: 90, fontSize: "40px", fontWeight: "bold", mx: "auto", mt: 2 }}>
                {creativityLetter} {/* Display Letter A-F Based on Creativity Score */}
            </Avatar>

            {/* 🔹 Display Score & Trend */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
                {getTrendIcon(creativityTrend?.trend)}
                <Typography sx={{ fontWeight: 600, fontSize: "20px", ml: 1, color: "#2C3E50" }}>
                    {creativityTrend?.avgGap ? `+${(100 - creativityTrend.avgGap * 10).toFixed(1)}%` : "0%"}
                </Typography>
            </Box>

            {/* 🔹 Display Trend Text */}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {getTrendText(creativityTrend?.trend)}
            </Typography>
        </CardContent>
    </Card>
</Grid>



            </Grid>

            <Box sx={{ mt: 6, mb: 4 }}>
        {recommendations.length > 0 ? (
            <>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins", mb: 4 }}>
                    Recommendations
                </Typography>
                <Card sx={{ boxShadow: "0 10px 20px rgba(0,0,0,0.08)", borderRadius: 4 }}>
                    <Box sx={{ p: 2, background: "linear-gradient(135deg, #0457a4 0%, #0476d9 100%)", display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ color: "white", fontFamily: "Poppins" }}>
                            Personalized Recommendations
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, textAlign: "left", color: "#2C3E50" }}>
                        {recommendations.map((rec, index) => (
                            <Typography key={index} variant="body1" sx={{ mb: 2 }}>
                                <strong>{rec.label}:</strong> {rec.text}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            </>
        ) : (
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0457a4", fontFamily: "Poppins", textAlign: "center", mt: 4 }}>
                No Recommendation Needed
            </Typography>
        )}
    </Box>
        </Box>
    );
};

export default PredictiveAnalysis;
