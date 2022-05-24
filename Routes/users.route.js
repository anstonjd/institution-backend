const express = require("express");
const userController = require("../Controllers/user.controller");

const checkAuth = require("../middlewares/credentialsAuthenticate.middleware");

const router = express.Router();

router.post("/signup", userController.userRegister);

router.post("/login", userController.userLogin);

router.post("/logout", checkAuth, userController.logout);

module.exports = router;
