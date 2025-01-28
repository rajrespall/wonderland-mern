const { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { auth, googleProvider } = require("../config/firebase.js");
const User = require("../models/user.model.js");

const googleLogin = async (req, res) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerWithEmail = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user in MongoDB
      const newUser = await User.create({
          username,
          email,
          password: "firebase_managed", 
          firebaseUid: firebaseUser.uid
      });

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
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user from MongoDB
      const user = await User.findOne({ email });
      if (!user) {
          throw new Error('User not found in database');
      }

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

module.exports = { googleLogin, registerWithEmail, loginWithEmail };