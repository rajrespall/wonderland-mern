const express = require('express');
const { saveGameData } = require('../controllers/card.controller.js');
const verifyToken = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/save', verifyToken, saveGameData);

module.exports = router;