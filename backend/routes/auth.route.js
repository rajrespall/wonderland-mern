const express = require("express");
const { 
  googleLogin, 
  registerWithEmail, 
  loginWithEmail, 
  logout, 
  verifyEmail, 
  resendOTP 
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/google-login", googleLogin);
router.post("/register", registerWithEmail);
router.post("/login", loginWithEmail);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);

module.exports = router;