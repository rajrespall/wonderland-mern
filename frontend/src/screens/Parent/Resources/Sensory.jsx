import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Card, CardContent, CardActions, Button, Grid, IconButton, CssBaseline, Divider, Fade, Paper } from '@mui/material';
import useResourceStore from '../../../store/resourceStore';
import Spinner from '../../../components/Spinner';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NavigationBar from '../../../components/NavigationBar';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PersonIcon from '@mui/icons-material/Person';

const Sensory = () => {
  const { resources, loading, error, fetchResources, getResourcesByType } = useResourceStore();
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const sensoryResources = getResourcesByType("Sensory");

  const handleExpandClick = (resourceId) => {
    setExpandedCards(prev => ({
      ...prev,
      [resourceId]: !prev[resourceId]
    }));
  };
  if (loading) return <Spinner />;
  if (error) return (
    <Paper elevation={3} sx={{ p: 3, m: 2, backgroundColor: '#ffebee' }}>
      <Typography color="error" variant="h6">{error}</Typography>
    </Paper>
  );

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background: 'linear-gradient(180deg, rgba(4, 87, 164, 0.05) 0%, rgba(255, 255, 255, 0.8) 100%)',
          minHeight: '100vh',
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavigationBar />
        <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 4, md: 6 } }}>
          <Fade in={true} timeout={800}>
            <Box sx={{ mt: 2, mb: 6 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  color: "transparent",
                  backgroundImage: "linear-gradient(to bottom right, #0457a4, #5da802)", 
                  WebkitBackgroundClip: "text",
                  textAlign: 'center', 
                  mb: 4, 
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    backgroundColor: '#5da802',
                    borderRadius: '2px'
                  }
                }}
              >
                Sensory Resources
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  textAlign: 'center',
                  fontFamily: 'Poppins', 
                  mb: 6, 
                  color: '#0457a4',
                  maxWidth: '800px',
                  mx: 'auto',
                  px: 2,
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                Explore expert resources designed to support sensory development and create an enriching environment for your child.
              </Typography>

              <Grid container spacing={3} alignItems="stretch">
                {sensoryResources.map((resource) => (
                  <Grid item xs={12} md={6} key={resource._id}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      borderRadius: 2,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                      }
                    }}>
                      <CardContent sx={{ p: 4, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <SensorOccupiedIcon sx={{ color: '#0457a4', mr: 2 }} />
                          <Typography
                            variant="h5"
                            sx={{ 
                              fontWeight: 600,
                              fontFamily: 'Poppins',
                              color: '#1a1a1a',
                              fontSize: '1.5rem'
                            }}
                          >
                            {resource.title}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <PersonIcon sx={{ color: '#666', mr: 1, fontSize: '1rem' }} />
                          <Typography
                            variant="subtitle2"
                            sx={{ 
                              color: '#666',
                              fontSize: '0.875rem',
                              fontFamily: 'Poppins',
                            }}
                          >
                            {resource.author}
                          </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />
                        
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#444',
                            fontFamily: 'Luckiest Guy',
                            lineHeight: 1.8,
                            maxHeight: expandedCards[resource._id] ? 'none' : '120px',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease-in-out',
                            position: 'relative',
                            '&::after': !expandedCards[resource._id] ? {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: '40px',
                              background: 'linear-gradient(transparent, #fff)'
                            } : {}
                          }}
                        >
                          {resource.content}
                        </Typography>
                      </CardContent>

                      <CardActions sx={{
                        p: 4,
                        pt: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(0,0,0,0.08)'
                      }}>
                        <Button
                          size="large"
                          variant="contained"
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            px: 4,
                            py: 1.5,
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            backgroundColor: '#0457a4',
                            '&:hover': {
                              backgroundColor: '#034584',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(4, 87, 164, 0.3)',
                              transition: 'all 0.2s ease-in-out'
                            }
                          }}
                        >
                          Read More
                        </Button>
                        <IconButton 
                          onClick={() => handleExpandClick(resource._id)}
                          sx={{ 
                            color: '#0457a4',
                            backgroundColor: 'rgba(4, 87, 164, 0.08)',
                            '&:hover': {
                              backgroundColor: 'rgba(4, 87, 164, 0.15)'
                            }
                          }}
                          aria-label={expandedCards[resource._id] ? "Show less" : "Show more"}
                        >
                          {expandedCards[resource._id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
};

export default Sensory;