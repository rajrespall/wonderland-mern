import { Box, Grid, Card, CardContent, Typography, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import useChartStore from "../../../Store/chartStore";
import Charts from './Charts';

const Stats = () => {
  const {
    usersPerMonth,
    reviewsPerMonth,
    gamesPlayed,
    gameAnalytics,
    fetchUsersPerMonth,
    fetchGamesPlayed,
    fetchGamesPlayedByDifficulty,
    fetchGameAnalytics,
    fetchReviewsPerMonth
  } = useChartStore(state => state);

  const [stats, setStats] = useState({
    users: 0,
    reviews: 0,
    gamesPlayed: 0,
  });

  useEffect(() => {
    fetchUsersPerMonth();
    fetchGamesPlayed();
    fetchGameAnalytics();
    fetchReviewsPerMonth();
  });

useEffect(() => {
  setStats({
    users: usersPerMonth.reduce((sum, item) => sum + item.value, 0),
    reviews: reviewsPerMonth.reduce((sum, item) => sum + item.value, 0),
    gamesPlayed: gameAnalytics.length
  });
}, [gamesPlayed, usersPerMonth, reviewsPerMonth, gameAnalytics]);

  const statCards = [
    { title: 'Total Users', value: stats.users },
    { title: 'Total Reviews', value: stats.reviews },
    { title: 'Games Played', value: stats.gamesPlayed },
    
  ];

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ 
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px 0 rgba(0,0,0,0.15)',
                }
              }}>
                <CardContent sx={{ 
                  textAlign: 'center',
                  width: '100%',
                  padding: '24px !important'
                }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontSize: '0.875rem',
                      marginBottom: 1
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="h3" 
                    sx={{
                      fontWeight: 600,
                      color: '#2c3e50',
                      marginBottom: 1
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Box sx={{
                    width: '40px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #3498db 0%, #2980b9 100%)',
                    margin: '8px auto 0',
                    borderRadius: '2px'
                  }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Charts />
    </>
  );
};

export default Stats;
