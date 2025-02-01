import React from 'react';
import { Card, CardMedia } from '@mui/material';
import Image from '../assets/assessment.png';

const MediaCard = () => {
  return (
    <Card sx={{backgroundColor:'transparent', boxShadow: 'none', width: '500px'}}>
      <CardMedia component="img" image={Image} alt="Sample" />
    </Card>
  );
};

export default MediaCard;
