import React, { useEffect, useState } from 'react';
import ParentNav from '../../../components/ParentNav'; // Changed from NavigationBar
import { Box, Typography, Container, Card, CardContent, CardActions, Button, Grid, IconButton, CssBaseline } from '@mui/material';
import useResourceStore from '../../../store/resourceStore';
import Spinner from '../../../components/Spinner';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Emotional = () => {
  const { resources, loading, error, fetchResources, getResourcesByType } = useResourceStore();
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const emotionalResources = getResourcesByType("Emotional");

  const handleExpandClick = (resourceId) => {
    setExpandedCards(prev => ({
      ...prev,
      [resourceId]: !prev[resourceId]
    }));
  };

  if (loading) return <Spinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: '#FF9800',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: '100vh',
          p: 2
        }}
      >
        <ParentNav />
        <Container maxWidth="lg" sx={{ flex: 1 }}>
          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center', mb: 4, fontFamily: 'Poppins' }}>
              Emotional Resources
            </Typography>
          <Grid container spacing={4} alignItems="flex-start">
            {emotionalResources.map((resource) => (
              <Grid item xs={12} md={6} key={resource._id}>
                <Card sx={{
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 4, 
                  p: 2,
                  m: 1,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="div"
                      gutterBottom
                      sx={{ mb: 2 }}
                    >
                      {resource.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      gutterBottom
                      sx={{ mb: 2 }}
                    >
                      By {resource.author}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 2,
                        maxHeight: expandedCards[resource._id] ? 'none' : '100px',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease-in-out'
                      }}
                    >
                      {resource.content}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{
                    mt: 'auto',
                    p: 3,
                    pt: 0,
                    display: 'flex',
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        boxShadow: 2,
                        '&:hover': {
                          boxShadow: 4
                        }
                      }}
                    >
                      Read More
                    </Button>
                    <IconButton 
                      onClick={() => handleExpandClick(resource._id)}
                      sx={{ 
                        color: 'primary.main',
                        ml: 1 
                      }}
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
        </Container>
      </Box>
    </>
  );
};

export default Emotional;