const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.createMessage = async (req, res) => {
	// want to insert the message into the message collection
	const { user, message, chatID } = req.body;

	if (!message || !chatID || !user) {
		console.log("unable to send your message");
		return res.status(400);
	}

	let newMessage = {
		createdby: user,
		message: message,
		chatref: chatID,
	};
	try {
		let message = await Message.create(newMessage);
		await Conversation.findByIdAndUpdate(req.body.chatID, {
			latestmessage: message,
		});
		console.log(message);
		res.json(message);
	} catch (error) {
		throw new Error(error.message);
	}
};

exports.getMessage = async (req, res) => {
	try {
		let message = await Message.findById(req.params.id);
		res.json(message.message);
	} catch (error) {
		throw new Error(error.message);
	}
};

exports.getAllMessages = async (req, res) => {
	console.log("getting all messages");
	try {
		let messages = await Message.find({ chatref: req.params.id }).populate(
			"createdby",
			"-password"
		);
		res.json(messages);
	} catch (error) {
		throw new Error(error.message);
	}
};
