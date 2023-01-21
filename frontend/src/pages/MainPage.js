import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import "../index.css";
import SideBar from "../components/SideBar";
import ChatView from "../components/ChatView";
import ChatContext from "../ChatContext";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
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
		currentUser,
		setCurrentUser,
	} = useContext(ChatContext);

	const navigate = useNavigate();

	//Redirect to login if no user found, storing the user in context
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/");
		} else {
			setCurrentUser(user);
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
