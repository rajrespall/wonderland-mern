const { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth"); 
const { auth, googleProvider } = require("../config/firebase.js");  
const User = require("../models/user.model.js");
const  adminAuth  = require('firebase-admin'); 
const jwt = require('jsonwebtoken');
const { generateTokenandSetCookie } = require('../utils/generateTokenandSetCookie');
const { generateOTP, createOTPExpiry } = require('../utils/otpUtils');
const { sendOTPEmail, sendPasswordResetEmail } = require('../config/mailtrap');

adminAuth.initializeApp({
  credential: adminAuth.credential.cert(require('../config/serviceAccountKey.json')),
});

const googleLogin = async (req, res) => {
  const { idToken } = req.body;  

  try {
    const decodedToken = await adminAuth.auth().verifyIdToken(idToken); 
    const firebaseUid = decodedToken.uid;  

    let user = await User.findOne({ firebaseUid });
    
    if (!user) {
      user = await User.create({
        username: decodedToken.name || 'No Name',  
        email: decodedToken.email,  
        password: 'firebase_managed',  
        firebaseUid: firebaseUid,
        hasCompletedAssessment: false  
      });
    }

    generateTokenandSetCookie(res, user._id);
    // User details
    res.status(200).json({
      user: {
        id: user._id,  // MongoDB user ID
        username: user.username,
        email: user.email,
        firebaseUid: firebaseUid, 
        isFirstLogin: !user.hasCompletedAssessment
      }
    });
  } catch (error) {

    console.error("Google login failed:", error);
    res.status(400).json({ error: 'Google login failed' });  
  }
};

const registerWithEmail = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Generate OTP for email verification
      const otp = generateOTP();
      const otpExpires = createOTPExpiry();

      // Create user in MongoDB
      const newUser = await User.create({
          username,
          email,
          password: "firebase_managed", 
          firebaseUid: firebaseUser.uid,
          verificationOTP: otp,
          otpExpires
      });

      // Send verification email
      const emailSent = await sendOTPEmail(email, otp);
      
      if (!emailSent) {
        console.error("Failed to send verification email");
        // Continue registration process even if email fails
      }

      // generateTokenandSetCookie(res, newUser._id);

      res.status(201).json({
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            firebaseUid: firebaseUser.uid,
            isVerified: false
        },
        message: "Registration successful. Please verify your email."
    });
  } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: error.message });
  }
};
  
const loginWithEmail = async (req, res) => {
  const { email, password } = req.body;
  
  try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user from MongoDB
      const user = await User.findOne({ email });
      if (!user) {
          throw new Error('User not found in database');
      }

       // Check if user is verified
       if (!user.isVerified) {
          // Generate new OTP and send email for unverified users
          const otp = generateOTP();
          const otpExpires = createOTPExpiry();
          
          user.verificationOTP = otp;
          user.otpExpires = otpExpires;
          await user.save();
          
          await sendOTPEmail(email, otp);
          
          return res.status(200).json({ 
              message: "Email not verified. New verification code sent to your email.",
              requireVerification: true,
              email: user.email
          });
      }

      generateTokenandSetCookie(res, user._id);

      res.status(200).json({
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              firebaseUid: userCredential.user.uid,
              isFirstLogin: !user.hasCompletedAssessment,
              isVerified: user.isVerified
          }
      });
  } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
      const { email, otp } = req.body;
      
      if (!email || !otp) {
          return res.status(400).json({ error: "Email and OTP are required" });
      }
      
      const user = await User.findOne({ email });
      
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      
      // Check if OTP is valid and not expired
      if (user.verificationOTP !== otp || !user.otpExpires || new Date() > user.otpExpires) {
          return res.status(400).json({ 
              error: "Invalid or expired verification code", 
              expired: user.otpExpires && new Date() > user.otpExpires
          });
      }
      
      // Verify user and clear OTP fields
      user.isVerified = true;
      user.verificationOTP = null;
      user.otpExpires = null;
      await user.save();
      
      // Generate token after verification
      generateTokenandSetCookie(res, user._id);
      
      res.status(200).json({
          message: "Email verification successful",
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              firebaseUid: user.firebaseUid,
              isFirstLogin: !user.hasCompletedAssessment,
              isVerified: true
          }
      });
  } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ error: "Failed to verify email" });
  }
};

const resendOTP = async (req, res) => {
  try {
      const { email } = req.body;
      
      if (!email) {
          return res.status(400).json({ error: "Email is required" });
      }
      
      const user = await User.findOne({ email });
      
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      
      // Generate new OTP
      const otp = generateOTP();
      const otpExpires = createOTPExpiry();
      
      user.verificationOTP = otp;
      user.otpExpires = otpExpires;
      await user.save();
      
      // Send new verification email
      const emailSent = await sendOTPEmail(email, otp);
      
      if (!emailSent) {
          return res.status(500).json({ error: "Failed to send verification email" });
      }
      
      res.status(200).json({ 
          message: "Verification code sent successfully",
          email: user.email
      });
  } catch (error) {
      console.error("Resend OTP error:", error);
      res.status(500).json({ error: "Failed to send verification code" });
  }
};

const logout = async (req, res) => {
  try {
      await auth.signOut();
      res.clearCookie("token");
      res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
      console.error('Logout error:', error);
      res.status(400).json({ success: false, error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    // Check if user exists in our database
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: "User with this email does not exist" });
    }
    
    // Use Firebase Admin SDK to send password reset email
    await adminAuth.auth().generatePasswordResetLink(email)
      .then(async (link) => {
        // Send email with reset link
        const emailSent = await sendPasswordResetEmail(email, link);
        
        if (!emailSent) {
          return res.status(500).json({ error: "Failed to send password reset email" });
        }
        
        return res.status(200).json({ 
          message: "Password reset link sent successfully",
          email: user.email
        });
      });
      
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ error: "Failed to process password reset request" });
  }
};

module.exports = { 
  googleLogin, 
  registerWithEmail, 
  loginWithEmail, 
  logout, 
  verifyEmail, 
  resendOTP,
  forgotPassword 
};