const express = require('express');
const { getLogicalAbilityScore } = require('../controllers/predictive.controller');
const verifyToken = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/logical-ability', verifyToken, getLogicalAbilityScore);

module.exports = router;
