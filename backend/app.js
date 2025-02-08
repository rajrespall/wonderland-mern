const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.route.js");
const generalInfoRoutes = require("./routes/geninfo.route.js");
const assessRoutes = require("./routes/assess.route.js"); // Import assessment routes
const cookieParser = require('cookie-parser')

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(bodyParser.json());
app.use(express.json());

app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/general-info", generalInfoRoutes);
app.use("/api/assessment", assessRoutes);


module.exports = app;