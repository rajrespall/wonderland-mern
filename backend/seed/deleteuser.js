const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../config/ServiceAccountKey.json")),
  });
}

const deleteAllFirebaseUsers = async () => {
  try {
    console.log("⚡ Fetching Firebase users...");
    let nextPageToken = undefined; // Initialize as undefined for the first call
    let totalDeleted = 0;

    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      const userIds = listUsersResult.users.map((user) => user.uid);

      if (userIds.length > 0) {
        console.log(`⚡ Deleting ${userIds.length} users...`);
        await admin.auth().deleteUsers(userIds);
        totalDeleted += userIds.length;
        console.log(`✅ Deleted ${userIds.length} users.`);
      }

      nextPageToken = listUsersResult.pageToken; // Update the token for the next batch
    } while (nextPageToken); // Continue until there are no more users to fetch

    console.log(`🎉 All Firebase users deleted. Total: ${totalDeleted}`);
  } catch (error) {
    console.error("❌ Error deleting Firebase users:", error.message);
  }
};

deleteAllFirebaseUsers();