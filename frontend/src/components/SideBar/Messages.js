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

	useEffect(() => {
		try {
			const getChat = async () => {
				const { data } = await axios.get();
				// setChats(data);
				console.log(data);
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
	const skeletonLoader = skeletonArray.map((box) => {
		return (
			<div className="skeleton">
				<div className="s-img"></div>
				<div className="s-line first"></div>
				<div className="s-line second"></div>
				<div className="s-line third"></div>
			</div>
		);
	});

	if (!chats.length)
		return <div className="skeleton-container"> {skeletonLoader} </div>;

	const messageList = chats?.chats.map((chat, index) => {
		return (
			<section
				className="user-conversation-container"
				style={{
					borderLeft:
						selectedChat?._id === chat?._id ? "10 px solid pink" : "none",
				}}
			>
				{chat.isGroupChat ? (
					<div className="thumbnail-container">
						<div className="avatars">
							<span className="avatar">
								<img src="#" />
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
						<img
							src="#"
							alt="user thumbnail"
							className="conversation-thumbnail"
						></img>
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
