// ------------------------------
// Slight issue is that when another person from the same chat sends a message, the sidebar last message doesn't update. It only updates when the logged in user sends the last message

// ------------------------------

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
		currentUser,
		messages,
	} = useContext(ChatContext);

	const currentTime = new Date();

	//find the difference between the current time and the last message time
	const latestMessageTime = (curentTime, messageSentTime) => {
		const difference = curentTime - messageSentTime;

		const minutes = Math.floor(difference / 1000 / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(months / 12);

		if (minutes < 1) {
			return "Just now";
		} else if (minutes === 1) {
			return "1 minute ago";
		} else if (minutes < 60) {
			return minutes + " minutes ago";
		} else if (hours === 1) {
			return "1 hour ago";
		} else if (hours < 24) {
			return hours + " hours ago";
		} else if (days === 1) {
			return "1 day ago";
		} else if (days < 30) {
			return days + " days ago";
		} else if (months === 1) {
			return "1 month ago";
		} else if (months < 12) {
			return months + " months ago";
		} else if (months >= 12) {
			return years + " years ago";
		} else {
			return "";
		}
	};

	//here we want to get all the conversations that belong to the logged in user
	useEffect(() => {
		try {
			const getChat = async () => {
				const data = await axios.get(`/conversation/getallConvos`, {
					params: {
						user_id: currentUser?._id,
					},
				});
				console.log(data);
				setChats(data.data);
			};
			getChat();
		} catch (error) {
			console.error(error);
		}
	}, [messages]);

	//want to get a conversation by id and setSelectedChat to that conversation
	const openChat = async (id) => {
		try {
			const data = await axios.get(`/conversation/${id}`);
			setShowChatBox(true);
			return setSelectedChat(data.data);
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
							strokeWidth={1.5}
							stroke="white"
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
							{/* want this to be the other person in the conversations name */}
							{chat?.chatname.length > 20
								? chat?.chatname.substring(0, 20) + ".."
								: chat?.chatname}
						</h6>
					) : (
						<h6 className="conversation-sender">
							{chat?.chatname.length > 20
								? chat?.chatname.substring(0, 20) + ".."
								: chat?.chatname}
						</h6>
					)}
					<span className="conversation-brief">
						{chat?.latestmessage
							? `${chat.latestmessage?.createdby?.firstname} : ${chat?.latestmessage?.message}`
							: ""}

						{/* MIGHT IMPLETEMENT BELOW IF I WANT TO INCLUDE A ISTYPING FUNCTION WITH socket */}
						{/* 												
						{chat?.latestmessage?.createdby?.firstname
							? chat?.latestmessage?.createdby?.firstname
							: ""}{" "}
						:
						{userIsTyping[chat?._id]
							? "Typing..."
							: getMessage(chat?.latestmessage?.message)} */}
					</span>
				</div>
				<div className="conversation-date">
					<span className="conversation-timestamp">
						{latestMessageTime(
							currentTime,
							new Date(chat?.latestmessage?.updatedAt)
						)}
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
	return <div className="conversation-list-wrapper"> {messageList} </div>;
};

export default Messages;
