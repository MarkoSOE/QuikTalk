const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/users", authController.getUsers);
router.post("/login", authController.postLogin);
router.get("/login/success", authController.getLoginSuccess);
router.get("/logout", authController.logout);
router.post("/signup", authController.postSignup);
router.get("/singleuser", authController.getSingularUser);
router.get("/currentuser", authController.getCurrentUser);

module.exports = router;
