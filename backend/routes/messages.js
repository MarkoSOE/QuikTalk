const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages");

router.post("/createMessage", messageController.createMessage);

module.exports = router;
