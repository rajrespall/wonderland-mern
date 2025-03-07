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
const cardRoutes = require("./routes/card.route.js");
const reviewRoutes = require("./routes/review.route.js");
const puzRoutes = require('./routes/puz.route');
const profileRoutes = require('./routes/profile.route.js'); 
const predictiveRoutes = require('./routes/predictive.route.js'); 
const institutionRoutes = require('./routes/institution.route.js'); 
const donationRoutes = require('./routes/donation.route.js');
const chartRoutes = require('./routes/chart.route.js');
const progressRoutes = require('./routes/progress.route.js');


const ALLOWED_ORIGINS = [
    'http://localhost:5173', //main  
    'http://localhost:5174', //wondercolor
    'http://localhost:5175', //wondermatch
    'http://localhost:5176', //wonderpuz
    'http://localhost:5177', //wondercards
    'http://localhost:5178' //admin
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
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

//Routes Registration
app.use("/api/auth", authRoutes);
app.use("/api/general-info", generalInfoRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/color", colorRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/card', cardRoutes); 
app.use("/api/reviews", reviewRoutes);  
app.use('/api/puz', puzRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', chartRoutes);
app.use('/api/predictive', predictiveRoutes);
app.use('/api/progress', progressRoutes);

module.exports = app;