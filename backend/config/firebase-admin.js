const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json"); 

// Prevent duplicate initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export Firebase Admin authentication and instance
const adminAuth = admin.auth();
module.exports = { admin, adminAuth };
