import React, { useState, useContext } from "react";
import * as Scroll from "react-scroll";
import axios from "axios";
import ChatContext from "../../ChatContext";
import {
	Link,
	DirectLink,
	Element,
	Events,
	animateScroll as scroll,
	scrollSpy,
	scroller,
} from "react-scroll";

const DisplayMessage = ({ messages }) => {
	const { selectedChat, userIsTyping } = useContext(ChatContext);
	const [currentuser, setCurrentUser] = useState("");
	//get current user id
	useState(() => {
		const getCurrentUser = async () => {
			try {
				const { data } = await axios.get("/currentuser");
				console.log(messages);
				setCurrentUser(data._id);
			} catch (error) {
				console.error(error);
			}
		};
		getCurrentUser();
	}, []);

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

	return (
		<div className="all-msg-container">
			{messages &&
				messages.map((m, i) => {
					return (
						<>
							{m?.sender?._id === currentuser} ? (
							<div
								className="chat-msg-container right-side"
								key={m?.sender?._id}
							>
								<div className="chat-bubble-sender" key={m?.sender?._id}>
									<span className="text-bubble sender">{m?.message}</span>
									{/* add in chat time here */}
								</div>
							</div>
							) : (
							<div
								className="chat-msg-container left-side"
								key={m?.sender?._id}
							>
								{isSameSender(messages, m, i, currentuser) ||
								isLastMessage(messages, i, currentuser) ? (
									<>
										<div className="chat-bubble-left" key={i}>
											<span className="text-bubble receiver">{m?.message}</span>
											{/* add in chat time here */}
										</div>
									</>
								) : (
									<div className="chat-bubble-left indent">
										<span className="text-bubble receiver">{m.message}</span>
									</div>
								)}
							</div>
							)
						</>
					);
				})}
		</div>
	);
};

export default DisplayMessage;
