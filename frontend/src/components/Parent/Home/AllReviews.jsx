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
        <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card 
                        key={review._id} 
                        sx={{ 
                            maxWidth: 300,
                            minWidth: 300,
                            padding: 2,
                            boxShadow: " 0px 10px 20px rgb(93, 168, 2, 0.5)",
                            backgroundColor: "white",
                            borderRadius: 0,
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>{getSentimentIcon(review.rating)}</Box>

                            <Typography variant="body1" sx={{ marginY: 2, fontStyle: "italic" }}>
                                "{review.comment}"
                            </Typography>

                            <Box display="flex" alignItems="center" gap={2} marginTop={3}>
                                <Avatar src={review.profilePicture} alt={review.userId?.username} sx={{ width: 40, height: 40 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">{review.userId?.username}</Typography>
                                    <Typography variant="body2" color="textSecondary">{review.userId?.role || "User"}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No reviews available</Typography>
            )}
        </Box>
    );
};

export default Reviews;
