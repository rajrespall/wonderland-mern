const Admin = require("../models/admin.model.js");
const { adminAuth } = require("../config/firebase-admin"); 


const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: "admin" });

    if (!existingAdmin) {
     
      const firebaseUser = await adminAuth.createUser({
        email: "admin@wonderland.com", 
        password: "admin123",
      });

      const newAdmin = new Admin({
        username: "admin",
        email: "admin@wonderland.com",
        password: firebaseUser.uid, 
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
