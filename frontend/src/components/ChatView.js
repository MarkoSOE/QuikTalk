import ChatContext from "../ChatContext";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import DisplayMessage from "../components/Chat/DisplayMessage";
import io from "socket.io-client";

var selectedChatCompare;

const socket = io("http://localhost:3001");

const ChatView = ({ currentUser }) => {
	//global states
	const { selectedChat, messages, setMessages } = useContext(ChatContext);

	//local states
	const [newMessage, setNewMessage] = useState("");
	const [allMessages, setAllMessages] = useState();
	const [conversationAvatars, setConversationAvatars] = useState([]);
	const [socketConnected, setSocketConnected] = useState(false);
	const [typing, setTyping] = useState(false);

	const scrollRef = useRef();

	//socket.io
	useEffect(() => {
		socket.on("connected", () => {
			setSocketConnected(true);
			socket.emit("setup", currentUser);
		});

		socket.on("disconnected", () => {
			setSocketConnected(false);
		});
		return () => {
			socket.off("connecteed");
			socket.off("disconnected");
		};
	}, []);

	const fetchAllMessages = async () => {
		if (!selectedChat) return;
		try {
			const [{ data }, conversationUsers] = await Promise.all([
				axios.get(`/message/${selectedChat?._id}`),
				axios.get(`/conversation/getUserAvatars/${selectedChat._id}`),
			]);
			let avatars = conversationUsers.data.users.map((user) => {
				return user.avatar;
			});
			setConversationAvatars(avatars);
			setAllMessages(data);
			socket.emit("join chat", selectedChat._id);
		} catch (error) {
			console.error(error);
		}
	};

	//send message
	const sendMessage = async (e) => {
		e.preventDefault();
		if (newMessage.trim().length === 0) return;
		if (newMessage) {
			try {
				const data = await axios.post("/message/createMessage", {
					user: currentUser,
					message: newMessage,
					chatID: selectedChat?._id,
				});
				setNewMessage("");
				setTyping(false);
				setMessages(!messages);
				socket.emit("new message", data);
				setAllMessages([...allMessages, data.data]);
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		fetchAllMessages();
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		socket.on("message recieved", (newMessageRecieved) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare?._id !== newMessageRecieved?.chatref
			) {
				console.log("will notify");
			} else {
				setAllMessages((prev) => [...prev, newMessageRecieved]);
			}
		});
	}, []);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [allMessages]);

	const userTyping = async (e) => {
		setNewMessage(e.target.value);
	};

	const getSenderName = (currentUser, chat) => {
		const [user1, user2] = chat?.users;
		return chat?.users?.[0]._id !== currentUser
			? `${user1.firstname} ${user1.lastname}`
			: `${user2.firstname} ${user2.lastname}`;
	};

	return (
		<main className="chat-box">
			{selectedChat ? (
				<>
					<div className="current-msg-top-bar">
						{selectedChat?.isgroupchat ? (
							<div className="group-chat-wrapper">
								<div className="group-chat-icon-wrapper">
									{conversationAvatars.map((avatar, index) => {
										return (
											<>
												<span className="group-chat-user-profile" key={index}>
													<img
														src={avatar}
														alt=""
														width="100"
														height="100"
														key={index}
													/>
												</span>
											</>
										);
									})}
								</div>
								<h1 className="group-chat-name">
									{selectedChat?.chatname.length > 21
										? selectedChat?.chatname.substring(0, 21) + ".."
										: selectedChat?.chatname}
								</h1>
							</div>
						) : (
							<div className="single-chat-user-wrapper">
								{conversationAvatars.map((avatar, index) => {
									return (
										<>
											<span className="group-chat-user-profile" key={index}>
												<img
													src={avatar}
													alt=""
													width="100"
													height="100"
													key={index}
												/>
											</span>
										</>
									);
								})}
								<div className="single-chat-user-details">
									<h5 className="single-chat-user-name">
										{getSenderName(currentUser, selectedChat)}
									</h5>
								</div>
							</div>
						)}
					</div>
					<div className="open-msg-box">
						<DisplayMessage messages={allMessages} scrollRef={scrollRef} />
					</div>
					<div className="message-status">
						<p> </p>
					</div>
					<div className="msg-input-container">
						<form className="send-msg-form" onSubmit={sendMessage}>
							<input
								type="text"
								placeholder="Send a message"
								className="send-msg-input"
								onChange={userTyping}
								// onKeyDown={handleTyping}
								value={newMessage}
							></input>
						</form>
						<button className="send-btn" onClick={sendMessage}></button>
					</div>
				</>
			) : (
				<div className="unopened-chat-container">
					<h1 className="unopened-chat-title">
						click a user to start a conversation
					</h1>
				</div>
			)}
		</main>
	);
};

export default ChatView;
