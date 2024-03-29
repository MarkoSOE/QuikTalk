const { ObjectId } = require("mongodb");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

exports.createConversation = async (req, res) => {
	console.log("creating a conversation");

	//Ensuring required fields are filled
	if (!req.body.users || !req.body.chatname) {
		return res.status(400).send({ message: "Please complete all the fields" });
	}

	//getting the list of users within the conversation
	let convoUsers = JSON.parse(req.body.users);
	console.log(convoUsers);

	//adding the user who sent the request into the list of users
	convoUsers.push(req.body.user._id);

	//creating a new conversation using the conversation model
	try {
		const newConversation = await Conversation.create({
			chatname: req.body.chatname,
			isgroupchat: convoUsers.length < 2,
			users: convoUsers,
			grouphost: req.body.user,
		});
		//looking for the conversation just created
		const conversationGroupMembers = await Message.findOne({
			id: newConversation._id,
		})
			.populate("users", "-password")
			.populate("grouphost", "-password");

		res.status(200).send(conversationGroupMembers);
	} catch (error) {
		console.error(error);
	}
};
exports.getAllConversations = async (req, res) => {
	console.log("getting all conversations");
	try {
		Conversation.find({ users: { $elemMatch: { $eq: req.query.user_id } } })
			.populate("users", "-password")
			.populate("grouphost", "-password")
			.populate("latestmessage")
			.sort({ updatedAt: "desc" })
			.then(async (data) => {
				data = await User.populate(data, {
					path: "latestmessage.sender",
					select: "-password",
				}).then(async (data) => {
					data = await User.populate(data, {
						path: "latestmessage.createdby",
						select: "-password",
					});
					res.status(200).send(data);
				});
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send(err);
			});
	} catch (error) {
		console.error(error);
	}
};

exports.getConversationById = async (req, res) => {
	console.log("getting conversation by id");
	console.log(req.params.id);
	try {
		const conversation = await Conversation.findById(req.params.id).lean();
		res.status(200).send(conversation);
	} catch (error) {
		console.error(error);
	}
};

exports.getUserAvatars = async (req, res) => {
	console.log("getting user avatars");
	try {
		const userAvatars = await Conversation.findById(req.params.id).populate(
			"users",
			"-password"
		);
		res.status(200).send(userAvatars);
	} catch (error) {
		console.error(error);
	}
};
