const dotenv = require("dotenv");
const app = require("./app.js");
const connectDB = require("./config/db.js");
const createDefaultAdmin = require("./utils/admin-setup.js"); 

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    await createDefaultAdmin(); // Run the admin creation check
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database", error);
    process.exit(1);
  });