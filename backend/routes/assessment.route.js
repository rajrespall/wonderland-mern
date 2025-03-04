const express = require('express');
const router = express.Router();
const { saveAssessment, getUserAssessment, getUserAssessmentHistory } = require('../controllers/assessment.controller');

// Assessment routes
router.post('/submit', saveAssessment);
router.get('/:userId', getUserAssessment);
router.get('/:userId/history', getUserAssessmentHistory);

module.exports = router;