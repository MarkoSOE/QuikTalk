import { useContext, useEffect } from "react";
import "../index.css";
import SideBar from "../components/SideBar";
import ChatView from "../components/ChatView";
import ChatContext from "../ChatContext";
import { useNavigate } from "react-router-dom";
import CreateAChat from "../components/SideBar/CreateAChat";

const MainPage = () => {
	//global states
	const {
		currentUser,
		setCurrentUser,
		showChatBox,
		showMessageList,
		width,
		setWidth,
		setShowChatBox,
		setShowMessageList,
	} = useContext(ChatContext);

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

	// Rendering components from viewport width

	useEffect(() => {
		const handleResizeWindow = () => {
			setWidth(window.innerWidth);
		};
		if (width < 930) {
			setShowChatBox(false);
			setShowMessageList(false);
		}
		if (width > 930) {
			setShowChatBox(true);
			setShowMessageList(true);
		}
		window.addEventListener("resize", handleResizeWindow);

		return () => {
			window.removeEventListener("resize", handleResizeWindow);
		};
	});

	return (
		<main className="homepage">
			{showMessageList && <SideBar />}
			{/* {showChatBox && <CreateAChat />} */}
			{showChatBox && <ChatView currentUser={currentUser} />}
		</main>
	);
};

export default MainPage;
