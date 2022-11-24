import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
	const [currentUser, setCurrentUser] = useState("");

	const navigate = useNavigate();

	//userinfo
	useState(() => {
		const getCurrentUser = async () => {
			try {
				const { data } = await axios.get("/currentuser");
				setCurrentUser(data._id);
			} catch (error) {
				console.error(error);
			}
		};
		getCurrentUser();
	}, []);

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
		navigate("/");
	};

	const handleSearchInput = (e) => {
		setSearch(e.target.value);
	};

	return (
		<aside>
			<div className="aside-top-bar-wrapper">
				<div className="message-tab-info-wrapper">
					<div className="menu wrapper">
						<h3 className="msg-tab-title" onClick={openDDMenu}>
							Messages
						</h3>
						{openDD && (
							<div className="dd-menu">
								<ul className="dd-wrapper">
									<li className="menu-item">display preference</li>
									<li className="menu-item" onClick={signOut}>
										logout
									</li>
								</ul>
							</div>
						)}
					</div>
					<CreateAChat />
				</div>
				<div className="search-container">
					<input
						type="text"
						className="search-input"
						placeholder="Find a user to chat with"
						value={search}
						onChange={handleSearchInput}
					></input>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="white"
						className="w-6 h-6 search-icon"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</div>
				{showOnline ? <Messages /> : <h1> loading </h1>}
			</div>
		</aside>
	);
};

export default SideBar;
