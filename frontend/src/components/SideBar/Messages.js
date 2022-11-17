import { useContext } from "react";
import ChatContext from "../../ChatContext";

const Messages = () => {
	const {
		setSelectedChat,
		selectedChat,
		chats,
		setChats,
		setShowChatBox,
		setShowMessageList,
		userIsTyping,
	} = useContext(ChatContext);

	const currentTime = new Date();
};

export default Messages;
