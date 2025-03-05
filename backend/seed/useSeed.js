const mongoose = require("mongoose");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const User = require("../models/user.model");

dotenv.config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../config/ServiceAccountKey.json")),
  });
  console.log("✅ Firebase Admin Initialized...");
}

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wonderland");
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Function to generate random usernames and emails
const getRandomUsername = (index) => `user${index}_${Math.floor(Math.random() * 1000)}`;
const getRandomEmail = (index) => `user${index}@wonderland.com`;

// Function to generate a random number of users (5 to 10) for each month
const getRandomUserCount = () => Math.floor(Math.random() * 6) + 5; // Random between 5 and 10

// Function to generate random dates per month in the past year
const getRandomDate = (year, month) => {
  const day = Math.floor(Math.random() * 28) + 1; // Ensuring valid day
  return new Date(year, month, day);
};

// Function to check if a user exists in Firebase
const checkFirebaseUserExists = async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord.uid;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return null;
    }
    throw error;
  }
};

// Function to generate users per month
const generateUsers = async () => {
  await connectDB(); // Ensure MongoDB connection is established

  const users = [];
  const currentYear = new Date().getFullYear();

  for (let month = 0; month < 12; month++) {
    const userCount = getRandomUserCount(); // Get 5-10 users for this month

    for (let i = 0; i < userCount; i++) {
      const email = getRandomEmail(i);
      const username = getRandomUsername(i);

      // Check if user exists in MongoDB
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log(`⚠️ Skipping existing user in MongoDB: ${email}`);
        continue;
      }

      // Check if user exists in Firebase
      let firebaseUid = await checkFirebaseUserExists(email);

      // Create user in Firebase if not exists
      if (!firebaseUid) {
        try {
          const firebaseUser = await admin.auth().createUser({
            email,
            password: "Test@1234",
            displayName: username,
          });
          firebaseUid = firebaseUser.uid;
          console.log(`✅ Firebase user created: ${email}`);
        } catch (firebaseError) {
          console.error(`❌ Firebase error for ${email}:`, firebaseError);
          continue; // Skip this user if Firebase creation fails
        }
      } else {
        console.log(`⚠️ Firebase user already exists: ${email}`);
      }

      // Insert user into MongoDB
      try {
        await User.create({
          username,
          email,
          password: "firebase_managed",
          firebaseUid,
          createdAt: getRandomDate(currentYear - 1, month),
          updatedAt: new Date(),
          isTestData: true,
        });

        console.log(`✅ MongoDB user created: ${username}`);
      } catch (mongoError) {
        console.error(`❌ MongoDB error inserting ${email}:`, mongoError);
      }
    }
  }

  console.log("🎉 Seeding completed!");
  mongoose.connection.close();
  console.log("🔴 MongoDB Connection Closed.");
};

// Run Seeder
generateUsers();
