import { useContext, useEffect } from "react";
import axios from "axios";

import "../index.css";
import SideBar from "../components/SideBar";
import ChatView from "../components/ChatView";
import ChatContext from "../ChatContext";

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

	useEffect(() => {
		const validateUser = async () => {
			try {
				const data = await axios.get("/login/success");
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		};
		validateUser();
	}, []);

	return (
		<main className="homepage">
			{showMessageList && <SideBar />}
			{showChatBox && <ChatView />}
		</main>
	);
};

export default MainPage;
