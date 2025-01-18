const dotenv = require("dotenv");
const app = require("./app.js");
const connectDB = require("./config/db.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
});