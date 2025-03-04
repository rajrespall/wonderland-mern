const express = require('express');
const { getSocialCommunicationScore, getLogicalAbilityScore, getMotorSkillsScore } = require('../controllers/predictive.controller');
const verifyToken = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/logical-ability', verifyToken, getLogicalAbilityScore);
router.get('/motor-skills', verifyToken, getMotorSkillsScore);
router.get('/social-communication', verifyToken, getSocialCommunicationScore);

module.exports = router;