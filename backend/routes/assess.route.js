const express = require('express');
const router = express.Router();
const assessController = require('../controllers/assess.controller');
const verifyToken = require('../middleware/auth.middleware'); // Import middleware

// Apply verifyToken middleware to ensure req.user exists
router.post('/submit', verifyToken, assessController.saveAssessment);

module.exports = router;
