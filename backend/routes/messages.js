const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages");

router.get("/getmessage/:id", messageController.getMessage);
router.post("/createMessage", messageController.createMessage);

module.exports = router;
