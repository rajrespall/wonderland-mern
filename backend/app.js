const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.route.js");
const generalInfoRoutes = require("./routes/geninfo.route.js");
const cookieParser = require('cookie-parser')

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


app.use("/api/auth", authRoutes);
app.use("/api/general-info", generalInfoRoutes);

module.exports = app;