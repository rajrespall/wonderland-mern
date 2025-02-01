const { initializeApp, credential, getAuth } = require('firebase-admin');  
const serviceAccount = require('./serviceAccountKey.json');


initializeApp({
  credential: credential.cert(serviceAccount), 
});


const adminAuth = getAuth(); 

module.exports = { adminAuth };  
