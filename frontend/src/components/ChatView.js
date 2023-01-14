import ChatContext from "../ChatContext";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import axios from "axios";
import DisplayMessage from "../components/Chat/DisplayMessage";

var selectedChatCompare;

const ChatView = ({ socket }) => {
	const {
		selectedChat,
		setUserIsTyping,
		setShowChatBox,
		setShowMessageList,
		setSelectedChat,
		currentUser,
		setCurrentUser,
	} = useContext(ChatContext);

	const scrollRef = useRef();

	const [newMessage, setNewMessage] = useState("");
	const [allMessages, setAllMessages] = useState();
	const [typing, setTyping] = useState(false);
	const [arrivalMessage, setArrivalMessage] = useState(null);

	//get all messages
	const fetchAllMessages = async () => {
		if (!selectedChat) return;
		try {
			const { data } = await axios.get(`/message/${selectedChat?._id}`);
			console.log(data);
			setAllMessages(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchAllMessages();
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	//listen for new messages
	// useEffect(() => {
	// 	socket.current.on("messageResponse", (data) => {
	// 		setAllMessages([...allMessages, data]);
	// 	});
	// }, [socket, allMessages]);

	//hold on for now
	const handleTyping = () => {
		// socket.emit("typing", `${currentUser._id} is typing...`);
	};

	// const recieveMessage = useCallback(() => {
	// 	if (socket.current) {
	// 		socket.current.on("msg-receive", (msg) => {
	// 			console.log({ msg });
	// 			setArrivalMessage({
	// 				chatId: msg.chatId,
	// 				message: msg.message,
	// 				sender: msg.sender,
	// 			});
	// 		});
	// 	}
	// }, []);

	// useEffect(() => {
	// 	recieveMessage();
	// }, [recieveMessage]);

	//socket checks for a message being
	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-receive", (msg) => {
				console.log(msg);
				setArrivalMessage({ msg });
			});
		}
	}, []);

	useEffect(() => {
		arrivalMessage &&
			// selectedChatCompare?._id === arrivalMessage?.chatId &&
			setAllMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [allMessages]);

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
				socket.current.emit("message", {
					user: currentUser,
					message: newMessage,
					chatID: selectedChat?._id,
				});
				setAllMessages([...allMessages, data]);
				setNewMessage("");
				setTyping(false);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const userTyping = async (e) => {
		setNewMessage(e.target.value);
	};

	const handleBackButton = () => {
		setShowChatBox(false);
		setShowMessageList(false);
		setSelectedChat("");
		setNewMessage();
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
						<svg
							onClick={handleBackButton}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="white"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
							/>
						</svg>
						{selectedChat?.isgroupchat ? (
							<div className="group-chat-wrapper">
								<div className="group-chat-icon-wrapper">
									<span className="group-chat-user-profile">
										Profile Picture 1
									</span>
									<span className="group-chat-user-profile">
										Profile Picture 2
									</span>
									<div className="avatar group-circle">
										<span className="group-count">some count</span>
									</div>
								</div>
								<h1 className="group-chat-name">
									{selectedChat?.chatname.length > 21
										? selectedChat?.chatname.substring(0, 21) + ".."
										: selectedChat?.chatname}
								</h1>
							</div>
						) : (
							<div className="single-chat-user-wrapper">
								<div className="single-chat-user-details">
									<h5 className="single-chat-user-name">
										{getSenderName(currentUser, selectedChat)}
									</h5>
								</div>
							</div>
						)}
					</div>
					<div className="open-msg-box">
						<DisplayMessage
							messages={allMessages}
							socket={socket}
							scrollRef={scrollRef}
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
								onKeyDown={handleTyping}
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
