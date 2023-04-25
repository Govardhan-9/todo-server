const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { isAuthorized } = require("../middleware/auth.middleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", isAuthorized, authController.logout);

module.exports = router;
