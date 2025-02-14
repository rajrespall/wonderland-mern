const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

//Route Imports
const authRoutes = require("./routes/auth.route.js");
const generalInfoRoutes = require("./routes/geninfo.route.js");
const assessmentRoutes = require("./routes/assessment.route.js");
const resourceRoutes = require("./routes/resources.route.js");


const app = express();

const corsOptions = {
    origin: "http://localhost:5173", // Update this to match your frontend port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

//Routes Registration
app.use("/api/auth", authRoutes);
app.use("/api/general-info", generalInfoRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/resources", resourceRoutes);

module.exports = app;