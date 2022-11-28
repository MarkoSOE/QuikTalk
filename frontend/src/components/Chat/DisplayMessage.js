import React, { useContext } from "react";
import ChatContext from "../../ChatContext";

const DisplayMessage = ({ messages }) => {
	const currentTime = new Date();

	const { selectedChat, userIsTyping } = useContext(ChatContext);

	const currentUser = JSON.parse(localStorage.getItem("user"));

	const roomID = selectedChat?._id;
	const IsTyping = userIsTyping[roomID];

	const lastMessage = messages?.[messages?.length - 1]?.sender?._id;

	const isSameSender = (messages, m, i, userID) => {
		return (
			i < messages.length - 1 &&
			(messages[i + 1]?.sender?._id !== m?.sender?._id ||
				messages[i + 1]?.sender?._id === undefined) &&
			messages[i]?.sender?._id !== userID
		);
	};

	const isLastMessage = (messages, i, userID) => {
		return (
			i === messages.length - 1 &&
			messages[messages.length - 1]?.sender?._id !== userID &&
			messages[messages.length - 1]?.sender?._id
		);
	};

	//find the difference between the message sent time and the current time
	const getTimeofMessage = (time) => {
		const difference = currentTime - time;
		const minutes = Math.floor(difference / 1000 / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(months / 12);

		if (minutes < 1) {
			return "Just now";
		} else if (minutes < 60) {
			return minutes + " minutes ago";
		} else if (hours < 24) {
			return hours + " hours ago";
		} else if (days < 30) {
			return days + " days ago";
		} else if (months < 12) {
			return months + " months ago";
		} else {
			return years + " years ago";
		}
	};

	return (
		<div className="all-msg-container">
			{messages &&
				messages.map((m, i) => {
					return (
						<>
							{m?.sender?._id === currentUser ? (
								<div
									className="chat-msg-container right-side"
									key={m?.sender?._id}
								>
									<div className="chat-bubble-sender" key={m?.sender?._id}>
										<span className="text-bubble sender">{m?.message}</span>
										{getTimeofMessage(new Date(m?.createdAt))}
									</div>
								</div>
							) : (
								<div
									className="chat-msg-container left-side"
									key={m?.sender?._id}
								>
									{isSameSender(messages, m, i, currentUser) ||
									isLastMessage(messages, i, currentUser) ? (
										<>
											<div className="chat-bubble-left" key={i}>
												<span className="text-bubble receiver">
													{m?.message}
												</span>
												{getTimeofMessage(new Date(m?.createdAt))}
											</div>
										</>
									) : (
										<div className="chat-bubble-left indent">
											<span className="text-bubble receiver">{m.message}</span>
											{getTimeofMessage(new Date(m?.createdAt))}
										</div>
									)}
								</div>
							)}
						</>
					);
				})}
		</div>
	);
};

export default DisplayMessage;
