const express = require('express')
const router = express.Router()
const conversationController = require('../controllers/conversations')

router.post('/createConvo', conversationController.createConversation)


module.exports = router