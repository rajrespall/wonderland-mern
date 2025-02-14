const express = require('express');
const router = express.Router();
const { saveAssessment, getUserAssessment } = require('../controllers/assessment.controller');

// Assessment routes
router.post('/submit', saveAssessment);
router.get('/:userId', getUserAssessment);

module.exports = router;