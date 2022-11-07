const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')

router.get("/users", authController.getUsers)
router.post("/login", authController.postLogin)
router.post("/signup", authController.postSignup)
router.get("/singleuser", authController.getSingularUser)

module.exports = router;
