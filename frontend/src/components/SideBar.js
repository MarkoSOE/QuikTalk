import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CreateAChat from "./SideBar/CreateAChat";
import ChatContext from "../ChatContext";
import Messages from "./SideBar/Messages";

const SideBar = () => {
	const { search, setSearch, setShowModal, setSelectedChat } =
		useContext(ChatContext);

	const [searchResult, setSearchResult] = useState([]);
	const [showOnline, setShowOnline] = useState(false);
	const [openDD, setOpenDD] = useState(false);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		if (search === "") {
			setShowOnline(true);
		}
		if (search !== "") {
			setShowOnline(false);

			//search for specific user
			const fetchUsers = async () => {
				try {
					const { data } = await axios.get("/singleuser", {
						firstname: search,
					});
					setSearchResult(data);
				} catch (error) {
					console.error(error);
				}
			};
			fetchUsers();
		}
	}, [search]);

	const openDDMenu = () => {
		setOpenDD((preState) => !preState);
	};

	const signOut = async () => {
		await axios.get("/logout");
	};

	const handleSearchInput = (e) => {
		setSearch(e.target.value);
	};

	return (
		<article className="conversation-list">
			This is a test
			<div className="container">
				<div className="messages" onclick={openDDMenu}>
					Messages:
				</div>
				{openDD && (
					<div>
						<ul>
							<li className="menu-item" onClick={() => setShowToast(true)}>
								Display Preference
							</li>
							<li className="menu-item" onClick={signOut}>
								Logout
							</li>
						</ul>
					</div>
				)}
				<CreateAChat />
				<div className="find-chat">
					<input
						type="text"
						className="search-input"
						placeholder="Find a user to chat with"
						value={search}
						onChange={handleSearchInput}
					/>
				</div>
				<div className="conversations">Conversations</div>
			</div>
			{showOnline ? (
				<Messages />
			) : (
				<SearchResult loading={loading} data={searchResult} />
			)}
		</article>
	);
};

export default SideBar;
