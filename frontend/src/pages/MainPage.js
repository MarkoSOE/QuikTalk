import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import "../index.css";
import SideBar from "../components/SideBar";
import ChatView from "../components/ChatView";
import ChatContext from "../ChatContext";
import { useNavigate } from "react-router-dom";

const MainPage = ({ socket }) => {
	//global states
	const {
		showModal,
		showChatBox,
		showMessageList,
		width,
		setWidth,
		setShowChatBox,
		setShowMessageList,
		showEditModal,
		showUserProfile,
	} = useContext(ChatContext);

	//local states
	const [messages, setMessages] = useState([]);
	const [typingStatus, setTypingStatus] = useState(false);
	const lastMessageRef = useRef(null);

	const navigate = useNavigate();

	//Redirect to login if no user found
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/");
		}
	}, []);

	//listen for typing status
	useEffect(() => {
		socket.on("typingResponse", (data) => setTypingStatus(true));
	}, [socket]);

	//last message behavior
	useEffect(() => {
		lastMessageRef.current?.scrollintoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<main className="homepage">
			{showMessageList && <SideBar />}
			{showChatBox && (
				<ChatView
					socket={socket}
					lastMessageRef={lastMessageRef}
					typingStatus={typingStatus}
				/>
			)}
		</main>
	);
};

export default MainPage;
