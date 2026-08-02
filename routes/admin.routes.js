const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const { adminDashboard } = require("../controllers/admin.controller");

router.get("/dashboard", protect, authorize("admin"), adminDashboard);

module.exports = router;