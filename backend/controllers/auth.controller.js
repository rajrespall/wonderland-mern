const { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth"); 
const { auth, googleProvider } = require("../config/firebase.js");  
const User = require("../models/user.model.js");
const  adminAuth  = require('firebase-admin'); 
const jwt = require('jsonwebtoken');
const { generateTokenandSetCookie } = require('../utils/generateTokenandSetCookie');

adminAuth.initializeApp({
  credential: adminAuth.credential.cert(require('../config/serviceAccountKey.json')),
});

const googleLogin = async (req, res) => {
  const { idToken } = req.body;  

  try {
    // Verify the ID token with Firebase Admin SDK
    const decodedToken = await adminAuth.auth().verifyIdToken(idToken); 
    const firebaseUid = decodedToken.uid;  

    let user = await User.findOne({ firebaseUid });
    
    if (!user) {
      user = await User.create({
        username: decodedToken.name || 'No Name',  
        email: decodedToken.email,  
        password: 'firebase_managed',  
        firebaseUid: firebaseUid  
      });
    }

    generateTokenandSetCookie(res, user._id);
    
    res.status(200).json({
      user: {
        id: user._id,  
        username: user.username,
        email: user.email,
        firebaseUid: firebaseUid  
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const newUser = await User.create({
          username,
          email,
          password: "firebase_managed", 
          firebaseUid: firebaseUser.uid
      });

      generateTokenandSetCookie(res, user._id);

      res.status(201).json({
          user: {
              id: newUser._id,
              username: newUser.username,
              email: newUser.email,
              firebaseUid: firebaseUser.uid
          }
      });
  } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: error.message });
  }
};
  
const loginWithEmail = async (req, res) => {
  const { email, password } = req.body;
  
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const user = await User.findOne({ email });
      if (!user) {
          throw new Error('User not found in database');
      }

      generateTokenandSetCookie(res, user._id);
      
      res.status(200).json({
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              firebaseUid: userCredential.user.uid
          }
      });
  } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ error: error.message });
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

module.exports = { googleLogin, registerWithEmail, loginWithEmail, logout };