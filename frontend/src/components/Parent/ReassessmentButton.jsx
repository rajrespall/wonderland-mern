import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAssessmentStore from '../store/assessmentStore';

const ReassessmentButton = () => {
  const [open, setOpen] = React.useState(false);
  const startReassessment = useAssessmentStore(state => state.startReassessment);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReassessment = () => {
    startReassessment();
    navigate('/assessment');
    handleClose();
  };

  return (
    <>
      <Button 
        variant="contained" 
        onClick={handleOpen}
        sx={{
          backgroundColor: '#5da802',
          '&:hover': { backgroundColor: '#4c8a00' },
          borderRadius: '25px',
          padding: '10px 20px',
        }}
      >
        Start Reassessment
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Start a New Assessment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Starting a new assessment will let you reassess your child's current condition while preserving all previous assessment data. Your previous assessments will be available in your history.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleReassessment} color="primary" variant="contained">
            Start Reassessment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReassessmentButton;