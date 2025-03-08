const express = require("express");
const { loginAdmin, checkAuth, logoutAdmin } = require("../controllers/admin.auth.controller.js");
const verifyAdmin = require("../middleware/admin.auth.middleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/check-auth", verifyAdmin, checkAuth); // ✅ Check if admin is authenticated
router.post("/logout", logoutAdmin); // ✅ Clears cookie

module.exports = router;
