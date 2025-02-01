const { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth"); 
const { auth, googleProvider } = require("../config/firebase.js");  
const User = require("../models/user.model.js");
const  adminAuth  = require('firebase-admin'); 


adminAuth.initializeApp({
  credential: adminAuth.credential.cert(require('../config/serviceAccountKey.json')),
});

const googleLogin = async (req, res) => {
  const { idToken } = req.body;  // pag kuha ng id token sa frontend 

  try {
    // Verify the ID token with Firebase Admin SDK
    const decodedToken = await adminAuth.auth().verifyIdToken(idToken);  // Verifying the token using adminAuth
    const firebaseUid = decodedToken.uid;  // Extract the UID from the decoded token

    // Check pag may user na
    let user = await User.findOne({ firebaseUid });
    
    if (!user) {
      //Pag wala edi create 
      user = await User.create({
        username: decodedToken.name || 'No Name',  // default name pag  walang name na proprovide 
        email: decodedToken.email,  // Store the user's email from the token
        password: 'firebase_managed',  //Password/firebase_manage
        firebaseUid: firebaseUid  // Firebase UID
      });
    }

    // User details
    res.status(200).json({
      user: {
        id: user._id,  // MongoDB user ID
        username: user.username,
        email: user.email,
        firebaseUid: firebaseUid  // Firebase UID
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

const logout = async (req, res) => {
  try {
      await auth.signOut();
      res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
      console.error('Logout error:', error);
      res.status(400).json({ error: error.message });
  }
};

module.exports = { googleLogin, registerWithEmail, loginWithEmail, logout };