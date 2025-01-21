const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.route.js");

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);

module.exports = app;