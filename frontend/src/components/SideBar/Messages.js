import { useContext, useEffect } from "react";
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

	const currentTime = new Date();

	//here we want to get all the conversations that belong to the logged in user
	useEffect(() => {
		try {
			const getChat = async () => {
				const data = await axios.get("/conversation/getallConvos");
				console.log(data.data);
				setChats(data.data);
			};
			getChat();
		} catch (error) {
			console.error(error);
		}
	}, []);

	const openChat = async (id) => {
		try {
			const { data } = await axios.get(`/conversation/${id}`);
			return selectedChat(data);
		} catch (error) {
			console.error(error);
		}
	};

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
				{chat.isGroupChat ? (
					<div className="thumbnail-container">
						<div className="avatars">
							<span className="avatar">
								<img src="#" alt="test" />
							</span>
							<span className="avatar">
								<img src="#" />
							</span>
							<div className="avatar group-circle">
								<span className="group-count"> +{chat?.users.legnth - 2}</span>
							</div>
						</div>
					</div>
				) : (
					<div className="thumbnail-container">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="white"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
							/>
						</svg>

						{/* <img
							src="#"
							alt="user thumbnail"
							className="conversation-thumbnail"
						></img> */}
					</div>
				)}
				<div className="conversation-info">
					{!chat.isGroupChat ? (
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
							: messageBrief(chat?.latestMessage?.messageSent)} */}
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
					onClick={(e) => openChat(e.target.id)}
				></div>
			</section>
		);
	});
	return <div className="conversation-list wrapper"> {messageList} </div>;
};

export default Messages;
