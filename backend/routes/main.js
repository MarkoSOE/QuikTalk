const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')

// router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
