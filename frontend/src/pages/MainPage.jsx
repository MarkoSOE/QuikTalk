import { useContext, useEffect } from "react";
import "../index.css";
import SideBar from "../components/SideBar";
import ChatView from "../components/ChatView";
import ChatContext from "../ChatContext";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
	//global states
	const { showChatBox, showMessageList, currentUser, setCurrentUser } =
		useContext(ChatContext);

	const navigate = useNavigate();

	//Redirect to login if no user found, storing the user in context
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/");
		} else if (user.avatar === "") {
			navigate("/setAvatar");
		} else {
			setCurrentUser(user);
			console.log(currentUser);
		}
	}, []);

	return (
		<main className="homepage">
			{showMessageList && <SideBar />}
			{showChatBox && <ChatView currentUser={currentUser} />}
		</main>
	);
};

export default MainPage;
