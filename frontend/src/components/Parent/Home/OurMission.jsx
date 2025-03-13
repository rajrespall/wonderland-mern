import React from 'react';
import { Box, Typography, Container, Card } from '@mui/material';
import { styled } from '@mui/system';
import { Target, Lightbulb } from 'lucide-react';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(8, 2),
  maxWidth: '1200px',
  gap: '40px',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '350px',
  textAlign: 'center',
  borderRadius: '20px',
  padding: theme.spacing(3),
  position: 'relative',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: '#fff',
    borderRadius: '50%',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '-10px',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '50px',
    height: '5px',
    background: '#fff',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '-50px',
    borderRadius: '10px',
  },
}));

const MissionCard = styled(StyledCard)({
  borderTop: '5px solid #ff5722',
  '&::before, &::after': {
    background: '#ff5722',
  },
});

const VisionCard = styled(StyledCard)({
  borderTop: '5px solid #03a9f4',
  '&::before, &::after': {
    background: '#03a9f4',
  },
});

const CardTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginBottom: '10px',
});

const CardContentText = styled(Typography)({
  fontSize: '1rem',
  color: '#555',
});

const IconWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '10px',
});

const MissionVision = () => {
  return (
    <StyledContainer>
      {/* Mission */}
      <MissionCard>
        <IconWrapper>
          <Target size={40} color="#ff5722" />
        </IconWrapper>
        <CardTitle>Our Mission</CardTitle>
        <CardContentText>
          To provide exceptional experiences through innovation, dedication, and a passion for excellence.
        </CardContentText>
      </MissionCard>

      {/* Vision */}
      <VisionCard>
        <IconWrapper>
          <Lightbulb size={40} color="#03a9f4" />
        </IconWrapper>
        <CardTitle>Our Vision</CardTitle>
        <CardContentText>
          To inspire and lead by setting new standards in quality, sustainability, and creativity.
        </CardContentText>
      </VisionCard>
    </StyledContainer>
  );
};

export default MissionVision;
    