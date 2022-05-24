const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin.controller");

const checkAuth = require("../middlewares/credentialsAuthenticate.middleware");

router.post("/signup", adminController.adminRegister);
router.post("/login", adminController.adminLogin);
router.post("/logout",checkAuth, adminController.logout);

module.exports = router;
