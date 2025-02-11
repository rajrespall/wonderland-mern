const express = require("express");
const { createGeneralInfo, getGeneralInfo, updateGeneralInfo } = require("../controllers/geninfo.controller");
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();
router.use(authMiddleware);
router.post("/", createGeneralInfo);
router.get("/", getGeneralInfo);
router.put("/", updateGeneralInfo);
module.exports = router;