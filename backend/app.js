const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

module.exports = app;