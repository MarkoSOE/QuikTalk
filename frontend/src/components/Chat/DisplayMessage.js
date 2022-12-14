import React, {
	useContext,
	useEffect,
	useInsertionEffect,
	useRef,
} from "react";
import { Socket } from "socket.io-client";
import ChatContext from "../../ChatContext";

const DisplayMessage = ({ messages, socket, scrollRef }) => {
	const currentTime = new Date();

	const { selectedChat, userIsTyping } = useContext(ChatContext);

	const currentUser = JSON.parse(localStorage.getItem("user"));
	const currentUserId = currentUser._id;

	const roomID = selectedChat?._id;
	const IsTyping = userIsTyping[roomID];

	const lastMessage = messages?.[messages?.length - 1]?.createdby?._id;

	const isSamecreatedby = (messages, m, i, userID) => {
		return (
			i < messages.length - 1 &&
			(messages[i + 1]?.createdby?._id !== m?.createdby?._id ||
				messages[i + 1]?.createdby?._id === undefined) &&
			messages[i]?.createdby?._id !== userID
		);
	};

	const isLastMessage = (messages, i, userID) => {
		return (
			i === messages.length - 1 &&
			messages[messages.length - 1]?.createdby?._id !== userID &&
			messages[messages.length - 1]?.createdby?._id
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
		} else {
			return years + " years ago";
		}
	};

	return (
		<div className="all-msg-container">
			{messages &&
				messages.map((m, i) => {
					return (
						<div className="chat" key={i} ref={scrollRef}>
							{m?.createdby === currentUserId ? (
								<div className="mine messages" key={m?.createdby}>
									<div className="message last" key={m?.createdby?._id}>
										<span>{m?.message}</span>
									</div>
									<span className="chat-bubble-time-right">
										{getTimeofMessage(new Date(m?.createdAt))}
									</span>
								</div>
							) : (
								<div className="yours messages" key={m?.createdby}>
									{isSamecreatedby(messages, m, i, currentUser) ||
									isLastMessage(messages, i, currentUser) ? (
										<>
											<div className="message" key={m?.createdby?._id}>
												<span>{m?.message}</span>
											</div>
											<span className="chat-bubble-time-right">
												{getTimeofMessage(new Date(m?.createdAt))}
											</span>
										</>
									) : (
										<>
											<div className="message last" key={m?.createdby?._id}>
												<span>{m?.message}</span>
											</div>
											<span className="chat-bubble-time-right">
												{getTimeofMessage(new Date(m?.createdAt))}
											</span>
										</>
									)}
								</div>
							)}
						</div>
					);
				})}
			<div></div>
		</div>
	);
};

export default DisplayMessage;
