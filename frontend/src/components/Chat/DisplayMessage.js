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
				const { data } = await axios.get("/user/getcurrentuser");
				console.log(data);
				setCurrentUser(data);
			} catch (error) {
				console.error(error);
			}
		};
		getCurrentUser();
	}, []);

	const roomID = selectedChat?._id;
	const IsTyping = userIsTyping[roomID];

	const lastMessage = messages?.[messages?.length - 1]?.sender?._id;

	return (
		<div className="all-msg-container">
			{messages &&
				messages.map((m, i) => {
					return <Element key={i}>{m}</Element>;
				})}
		</div>
	);
};

export default DisplayMessage;
