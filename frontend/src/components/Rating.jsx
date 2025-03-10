import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 50, color: '#FF4E50' }} />,  
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon sx={{ fontSize: 50, color: '#FC913A' }} />,  
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon sx={{ fontSize: 50, color: '#F9D423' }} />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 50, color: '#A8E06E' }} />, 
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon sx={{ fontSize: 50, color: '#248720' }} />, 
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value]?.icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function StyledRatingComponent({ value, onChange }) {
  return (
    <StyledRating
      name="custom-rating"
      value={value}
      onChange={onChange}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value]?.label || ""}
      highlightSelectedOnly
    />
  );
}

