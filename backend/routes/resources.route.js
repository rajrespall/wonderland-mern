const express = require('express');
const router = express.Router();
const { getUserAssessment } = require('../controllers/resources.controller');

router.get('/assessment/:userId', getUserAssessment);

module.exports = router;
