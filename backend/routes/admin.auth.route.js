const express = require("express");
const { loginAdmin } = require("../controllers/admin.auth.controller.js");

const router = express.Router();

router.post("/login", loginAdmin);

module.exports = router;
