const express = require("express");
const { getUsers, updateUserStatus } = require("../controllers/admin.users.controller");

const router = express.Router();

router.get("/", getUsers);
router.put("/update-status/:userId", updateUserStatus);

module.exports = router;
