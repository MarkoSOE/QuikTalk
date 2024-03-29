const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversations");

// router.get("/");
router.get("/getallConvos", conversationController.getAllConversations);
router.post("/createConvo", conversationController.createConversation);
router.get("/getUserAvatars/:id", conversationController.getUserAvatars);
router.get("/:id", conversationController.getConversationById);

module.exports = router;
