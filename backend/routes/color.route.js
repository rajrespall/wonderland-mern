const express = require('express');
const { uploadImage } = require('../controllers/color.controller.js');
const verifyToken = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/upload', verifyToken, uploadImage);

module.exports = router;