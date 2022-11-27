const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
	{
		chatname: {
			type: String,
			trim: true,
		},
		isgroupchat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestmessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		grouphost: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
