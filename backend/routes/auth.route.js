const express = require("express");
const { googleLogin, registerWithEmail, loginWithEmail } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/google-login", googleLogin);
router.post("/register", registerWithEmail);
router.post("/login", loginWithEmail);

module.exports = router;