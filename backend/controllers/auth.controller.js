const { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { auth, googleProvider } = require("../config/firebase.js");

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
    const { email, password } = req.body;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
  
const loginWithEmail = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

module.exports = { googleLogin, registerWithEmail, loginWithEmail };