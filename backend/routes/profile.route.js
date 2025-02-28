const express = require('express');
const router = express.Router();
const { getProfile, upsertProfile } = require('../controllers/profile.controller');
const verifyToken = require('../middleware/auth.middleware');
const { upload } = require('../config/cloudinary');

router.get('/', verifyToken, getProfile);
router.post('/', verifyToken, upload.single('profilePicture'), upsertProfile);

module.exports = router;