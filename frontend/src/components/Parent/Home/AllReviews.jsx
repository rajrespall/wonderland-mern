import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Avatar, Box } from "@mui/material";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/reviews/all");
                const filteredReviews = Array.isArray(response.data) ? response.data.filter(r => r.rating >= 4).slice(0, 3) : [];
                setReviews(filteredReviews);
            } catch (err) {
                setError("Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const getSentimentIcon = (rating) => {
        if (rating >= 5) return <SentimentVerySatisfiedIcon sx={{ color: "#248720", fontSize: 30 }} />;
        if (rating === 4) return <SentimentSatisfiedIcon sx={{ color: "#A8E06E", fontSize: 30 }} />;
        if (rating === 3) return <SentimentSatisfiedIcon sx={{ color: "#F9D423", fontSize: 30 }} />;
        if (rating === 2) return <SentimentSatisfiedIcon sx={{ color: "#FC913A", fontSize: 30 }} />;
        return <SentimentNeutralIcon sx={{ color: "#FF4E50", fontSize: 30 }} />;
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

return (
    <Box 
        sx={{
            padding: 4,
            backgroundColor: '#fff',
            borderRadius: 2
        }}
    >
        <Typography 
            variant="h4" 
            sx={{ 
                textAlign: 'center', 
                marginBottom: 4,
                fontWeight: 600,
                fontFamily: 'Poppins',
                color: '#0457a4',
                borderBottom: '3px solid #5da802',
                paddingBottom: 2,
                width: 'fit-content',
                margin: '0 auto 40px auto'
            }}
        >
            Featured Reviews
        </Typography>
        
        <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card 
                        key={review._id} 
                        sx={{ 
                            maxWidth: 350,
                            minWidth: 350,
                            padding: 3,
                            boxShadow: '0px 8px 24px rgba(93, 168, 2, 0.15)',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0px 12px 28px rgba(93, 168, 2, 0.2)'
                            }
                        }}
                    >
                        <CardContent>
                            <Box 
                                sx={{ 
                                    display: "flex", 
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 2
                                }}
                            >
                                {getSentimentIcon(review.rating)}
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: '#666',
                                        backgroundColor: '#f0f2f5',
                                        padding: '4px 12px',
                                        borderRadius: 20,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>

                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    marginY: 3, 
                                    fontStyle: "italic",
                                    color: '#2c3e50',
                                    lineHeight: 1.6,
                                    fontSize: '1rem',
                                    backgroundColor: '#f8f9fa',
                                    padding: 2,
                                    borderRadius: 1,
                                    borderLeft: '4px solid #5da802'
                                }}
                            >
                                "{review.comment}"
                            </Typography>

                            <Box 
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    marginTop: 3,
                                    padding: 2,
                                    borderTop: '1px solid #eee'
                                }}
                            >
                                <Avatar 
                                    src={review.profilePicture} 
                                    alt={review.userId?.username}
                                    sx={{ 
                                        width: 48, 
                                        height: 48,
                                        border: '2px solid #5da802'
                                    }}
                                />
                                <Box>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            color: '#2c3e50'
                                        }}
                                    >
                                        {review.userId?.username}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{
                                            color: '#666',
                                            fontSize: '0.875rem',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {review.userId?.role || "User"}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography 
                    sx={{ 
                        color: '#666',
                        fontSize: '1.1rem',
                        textAlign: 'center',
                        padding: 4
                    }}
                >
                    No reviews available at the moment
                </Typography>
            )}
        </Box>
    </Box>
);
};

export default Reviews;
