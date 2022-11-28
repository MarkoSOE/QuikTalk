import { useContext, useEffect } from "react";
import axios from "axios";

import "../index.css";
import SideBar from "../components/SideBar";
import ChatView from "../components/ChatView";
import ChatContext from "../ChatContext";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
	//set up state to contain the message to be sent to the backend
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

	const navigate = useNavigate();

	//Redirect to login if no user found
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/");
		}
	}, []);

	return (
		<main className="homepage">
			{showMessageList && <SideBar />}
			{showChatBox && <ChatView />}
		</main>
	);
};

export default MainPage;
