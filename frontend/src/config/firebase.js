import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCXgvYzEhG3xrlvBD1WvNZHObBREy8AI3s",
  authDomain: "wonderland-ee595.firebaseapp.com",
  projectId: "wonderland-ee595",
  storageBucket: "wonderland-ee595.firebasestorage.app",
  messagingSenderId: "779338615033",
  appId: "1:779338615033:web:a2095ae86d2d1a28e93a28",
  measurementId: "G-V3DL0601RE"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
