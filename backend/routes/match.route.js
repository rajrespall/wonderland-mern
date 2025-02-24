// filepath: backend/routes/match.route.js
const express = require('express');
const {
    createMatch,
    getAllMatches,
    getMatchById
} = require('../controllers/match.controller');
const verifyToken = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/', verifyToken, createMatch);
router.get('/', verifyToken, getAllMatches);
router.get('/:id', verifyToken, getMatchById);

module.exports = router;