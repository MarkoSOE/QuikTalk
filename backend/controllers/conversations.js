const Conversation = require("../models/Conversation");
const User = require("../models/User");

exports.createConversation = async (req, res) => {
	//Ensuring required fields are filled
	if (!req.body.users || !req.body.name) {
		return res.status(400).send({ message: "Please complete all the fields" });
	}

	//getting the list of users within the conversation
	let convoUsers = JSON.parse(req.body.users);

	//ensuring proper number of users in a group chat
	if (convoUsers.length < 2) {
		return res.status(400).send({
			message: "Two or more people are required to create a group chat",
		});
	}

	//adding the user who sent the request into the list of users
	convoUsers.push(req.user);

	//creating a new conversation using the conversation model
	try {
		const newConversation = await Conversation.create({
			chatname: req.body.chatname,
			isgroupchat: true,
			users: convoUsers,
			grouphost: req.user,
		});
		//looking for the conversation just created
		const conversationGroupMembers = await Message.findOne({
			id: newConversation._id,
		})
			.populate("users", "-password")
			.populate("grouphost", "-password");

		res.status(200).JSON(conversationGroupMembers);
	} catch (error) {
		console.error(error);
	}

	console.log(req);
	try {
		await Conversation.create({
			chatname: req.body.chatname,
			isgroupchat: req.body.isgroupchat,
			users: req.body.users,
			last,
		});
		console.log("message created");
		res.send();
	} catch (error) {}
};

// exports.getAllConversations = async (req, res) => {
// 	try {
// 		const conversations = await Conversation.find()
// 			.sort({ createdAt: "desc" })
// 			.lean();
// 		console.log(conversations);
// 		res.status(200).send(conversations);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

exports.getAllConversations = async (req, res) => {
	console.log("getting all conversations");
	console.log(req);
	// try {
	// 	Conversation.find({ users: { $elemMatch: { $eq: req.user._id } } })
	// 		.populate("users", "-password")
	// 		.populate("grouphost", "-password")
	// 		.populate("latestmessage")
	// 		.sort({ updatedAt: "desc" })
	// 		.then(async (data) => {
	// 			data = await User.populate(data, {
	// 				path: "latestmessage.sender",
	// 				select: "-password",
	// 			});
	// 			res.status(200).send(data);
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 			res.status(500).send(err);
	// 		});
	// } catch (error) {
	// 	console.error(error);
	// }
};

exports.getConversationById = async (req, res) => {
	try {
		const conversation = await Conversation.findById(req.params.id).lean();
		res.status(200).send(conversation);
	} catch (error) {
		console.error(error);
	}
};
