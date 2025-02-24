const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");

//Route Imports
const authRoutes = require("./routes/auth.route.js");
const generalInfoRoutes = require("./routes/geninfo.route.js");
const assessmentRoutes = require("./routes/assessment.route.js");
const resourceRoutes = require("./routes/resources.route.js");
const colorRoutes = require("./routes/color.route.js");
const matchRoutes = require("./routes/match.route.js"); 

// Allow multiple frontend ports
const ALLOWED_ORIGINS = [
    'http://localhost:5173', //main  
    'http://localhost:5174', //wondercolor
    'http://localhost:5175', //wondermatch
    'http://localhost:5176', //wonderpuz
    'http://localhost:5177' //wondercards
];

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
app.use("/api/color", colorRoutes);
app.use('/api/match', matchRoutes); 

module.exports = app;