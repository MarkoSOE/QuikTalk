const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        require: true,
        trim: true,
    },
    conversationReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
}, {timestamps: true})

module.exports = mongoose.model("Message")