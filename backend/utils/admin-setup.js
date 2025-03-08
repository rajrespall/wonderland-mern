const Admin = require("../models/admin.model.js");
const { adminAuth } = require("../config/firebase-admin"); // Import adminAuth correctly

// Function to create a default admin if none exists
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: "admin" });

    if (!existingAdmin) {
      // Create a Firebase user and get the UID
      const firebaseUser = await adminAuth.createUser({
        email: "admin@example.com", // Firebase requires an email
        password: "admin123",
      });

      const newAdmin = new Admin({
        username: "admin",
        password: firebaseUser.uid, // Store Firebase UID instead of plain password
      });

      await newAdmin.save();
      console.log("✅ Default admin created successfully.");
    } else {
      console.log("✅ Admin already exists. No new admin created.");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

module.exports = createDefaultAdmin;
