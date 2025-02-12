const express = require('express');
const router = express.Router();
const { getUserAssessment } = require('../controllers/recors.controller');

router.get('/assessment/:userId', getUserAssessment);

module.exports = router;
