import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import { Close, Download } from '@mui/icons-material';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    fetchUserImages();
  }, []);
  
  const fetchUserImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/color/user/images', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setImages(response.data.images);
      } else {
        setError('Failed to fetch images');
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(err.response?.data?.message || 'Error fetching your artwork');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  // Function to download image
  const handleDownload = (url, filename = 'wonderland-artwork.png') => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography 
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fontSize: 30,
          color: '#0457a4',
          mb: 3
        }}
      >
        My Artworks
      </Typography>
      
      {images.length === 0 ? (
        <Box p={4} textAlign="center">
          <Typography variant="h6" color="textSecondary">
            No artworks found. Create some colorful masterpieces in the coloring game!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image._id}>
              <Card 
                sx={{ 
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    cursor: 'pointer'
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => handleImageClick(image)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image.imageUrl}
                  alt="User artwork"
                  sx={{ objectFit: 'contain', backgroundColor: '#f8f8f8' }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Created on {formatDate(image.createdAt)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Image preview dialog */}
      <Dialog 
        open={!!selectedImage} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
          {selectedImage && (
            <>
              <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
                <IconButton onClick={() => handleDownload(selectedImage.imageUrl)}>
                  <Download sx={{ color: 'white' }} />
                </IconButton>
                <IconButton onClick={handleCloseDialog}>
                  <Close sx={{ color: 'white' }} />
                </IconButton>
              </Box>
              <CardMedia
                component="img"
                image={selectedImage.imageUrl}
                alt="Artwork preview"
                sx={{ 
                  width: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  backgroundColor: '#000'
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;