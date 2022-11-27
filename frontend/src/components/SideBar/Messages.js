import { useContext, useEffect, useState } from "react";
import ChatContext from "../../ChatContext";
import axios from "axios";

const Messages = () => {
	const {
		setSelectedChat,
		selectedChat,
		chats,
		setChats,
		setShowChatBox,
		setShowMessageList,
		userIsTyping,
	} = useContext(ChatContext);

	const [test, setTest] = useState([]);

	const currentTime = new Date();

	//taking in an id of a message, and retriveing the message from the messages collection. this can't work because react can't render a promise object on the page. I need to figure out how to get the message from the database and then render it on the page.

	//here we want to get all the conversations that belong to the logged in user
	useEffect(() => {
		try {
			const getChat = async () => {
				const data = await axios.get(`/conversation/getallConvos`);
				console.log(data);
				setChats(data.data);
			};
			getChat();
		} catch (error) {
			console.error(error);
		}
	}, []);

	let openChat;

	//want to get a conversation by id and setSelectedChat to that conversation
	const getChatById = async (id) => {
		try {
			const data = await axios.get(`/conversation/${id}`);
			setSelectedChat(data.data);
			setShowChatBox(true);
			setShowMessageList(false);
		} catch (error) {
			console.error(error);
		}
	};

	// openChat = async (id) => {
	// 	try {
	// 		const { data } = await axios.get(`/conversation/${id}`);
	// 		return selectedChat(data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];
	const skeletonLoader = skeletonArray.map((box, index) => {
		return (
			<div className="skeleton" key={index}>
				<div className="s-img"></div>
				<div className="s-line first"></div>
				<div className="s-line second"></div>
				<div className="s-line third"></div>
			</div>
		);
	});

	if (!chats.length)
		return <div className="skeleton-container"> {skeletonLoader} </div>;

	const messageList = chats.map((chat, index) => {
		return (
			<section
				className="user-conversation-container"
				style={{
					borderLeft:
						selectedChat?._id === chat?._id ? "10 px solid pink" : "none",
				}}
				key={index}
			>
				{chat.isgroupchat ? (
					<div className="thumbnail-container">
						<svg
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
								d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
							/>
						</svg>
					</div>
				) : (
					<div className="thumbnail-container">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>
					</div>
				)}
				<div className="conversation-info">
					{!chat.isgroupchat ? (
						<h6 className="conversation-sender">
							{/* {getSenderName(loggedUserID, chat).length > 20
								? getSenderName(loggedUserID, chat).substring(0, 20) + "..."
								: getSenderName(loggedUserID, chat)} */}
						</h6>
					) : (
						<h6 className="conversaton-sender">
							{chat?.chatname.length > 20
								? chat?.chatname.substring(0, 20) + ".."
								: chat?.chatname}
						</h6>
					)}
					<span className="conversation-brief">
						{/* {userIsTyping[chat?._id]
							? "Typing..."
							: getMessage(chat?.latestmessage)} */}
					</span>
				</div>
				<div className="conversation-date">
					<span className="conversation-timestamp">
						{/* {latestMessageTime(
							currentTime,
							new Date(chat?.latestMessage?.updatedAt)
						)} */}
					</span>
				</div>
				<div
					className="invisible-msg-wrapper"
					id={chat?._id}
					onClick={(e) => getChatById(e.target.id)}
				></div>
			</section>
		);
	});
	return <div className="conversation-list wrapper"> {messageList} </div>;
};

export default Messages;
