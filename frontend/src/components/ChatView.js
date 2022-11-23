import ChatContext from "../ChatContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DisplayMessage from "../components/Chat/DisplayMessage";

var socket, selectedChatCompare;

const ChatView = () => {
	const {
		selectedChat,
		setUserIsTyping,
		setShowChatBox,
		setShowMessageList,
		setSelectedChat,
	} = useContext(ChatContext);

	const [newMessage, setNewMessage] = useState("");
	const [allMessages, setAllMessages] = useState();
	const [typing, setTyping] = useState(false);

	const fetchAllMessages = async () => {
		if (!selectedChat) return;
		try {
			const { data } = await axios.get(`/conversation/${selectedChat?._id}`);
			setAllMessages(data);
			socket.emit("join chat", selectedChat?._id);
		} catch (error) {
			console.error(error);
		}
	};

	const sendMessage = async (e) => {};

	const userTyping = async (e) => {};

	return (
		<main className="chat-box">
			{selectedChat ? (
				<>
					<div className="current-msg-top-bar">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
							/>
						</svg>
						<div className="open-msg-box">
							<DisplayMessage messages={allMessages} />
						</div>
						<div className="msg-input-container">
							<form className="send-msg-form" onSubmit={sendMessage}>
								<input
									type="text"
									placeholder="Send a message"
									className="send-msg-input"
									onChange={userTyping}
									value={newMessage}
								></input>
							</form>
							<button className="send-btn" onClick={sendMessage}></button>
						</div>
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
