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

	//here I think I should filter out the logged in users avatar? or no? if I do, it makes it easier to add in the single user chat header
	const fetchAllMessages = async () => {
		if (!selectedChat) return;
		try {
			const [{ data }, conversationUsers] = await Promise.all([
				axios.get(`/message/${selectedChat?._id}`),
				axios.get(`/conversation/getUserAvatars/${selectedChat._id}`),
			]);
			//remove currentuser avatar from the array (there has to be a better way of doing this)
			let avatars = conversationUsers.data.users.map((user) => {
				if (user.avatar !== currentUser.avatar) {
					return user.avatar;
				}
			});
			avatars = avatars.filter((avatar) => {
				return avatar !== undefined;
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
								<div className="single-chat-icon-wrapper">
									{conversationAvatars.map((avatar, index) => {
										return (
											<>
												<span className="single-chat-sender-photo" key={index}>
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
								<h1 className="single-chat-user-name">testing</h1>
								{/* <div className="single-chat-user-details">
									<h5 className="single-chat-user-name">
										{getSenderName(currentUser, selectedChat)}
									</h5>
								</div> */}
							</div>
						)}
					</div>
					<div className="open-msg-box">
						<DisplayMessage
							messages={allMessages}
							scrollRef={scrollRef}
							conversationAvatars={conversationAvatars}
						/>
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 send-icon"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
							/>
						</svg>
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
