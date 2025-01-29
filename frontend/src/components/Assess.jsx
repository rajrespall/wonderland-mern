import React from 'react';
import { Card, CardMedia } from '@mui/material';
import Image from '../assets/assessment.png';

const MediaCard = () => {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor:'transparent', boxShadow: 'none'}}>
      <CardMedia component="img" width={"800px"} image={Image} alt="Sample" />
    </Card>
  );
};

export default MediaCard;
