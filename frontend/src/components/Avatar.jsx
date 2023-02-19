// make a call to the multiavatar API to get 5 avatar options and allow the new user to select one of them upon account creation, then it's stored into the mongoDB user collection

import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import ChatContext from "../ChatContext";
import { toast, ToastContainer } from "react-toastify";
import { Buffer } from "buffer";
import getImageDataURL from "../tools/svgBase64";

export default function Avatar() {
	//global states
	const { currentUser, setCurrentUser } = useContext(ChatContext);

	//local states
	const [avatars, setAvatars] = useState([]);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	//obtain current user
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/");
		} else {
			setCurrentUser(user);
			console.log(currentUser);
		}
	}, []);

	//sending the selected avatar to the backend
	const setAvatarProfilePicture = async () => {
		if (selectedAvatar === undefined) {
			toast.error("Please select an avatar");
		} else {
			try {
				let image = getImageDataURL(avatars[selectedAvatar]);
				const sendAvatar = await axios.post("/setAvatarProfilePicture", {
					currentUser: currentUser,
					image: image,
				});
				console.log(sendAvatar);
				if (sendAvatar.data.isSet) {
					console.log("avatar selection confirmed");
					// navigate("/");
				} else {
					toast.error(
						"Error when setting avatar, please try again",
						toastOptions
					);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	//generate 5 random avatars by API call
	useEffect(() => {
		const getAvatar = async () => {
			const data = [];
			for (let i = 0; i < 3; i++) {
				const svg = await axios.get(
					`https://api.multiavatar.com/4645646/${Math.round(
						Math.random() * 1000
					)}?apikey=VDf3oIYO07JnZF`
				);
				data.push(svg.data);
			}
			setAvatars(data);
			setIsLoading(false);
		};
		getAvatar();
	}, []);

	return (
		<>
			{isLoading ? (
				<Container>
					<img src="" alt="loading" className="Loader" />
				</Container>
			) : (
				<Container>
					<div className="title-container">
						<h1>Choose your avatar</h1>
					</div>
					<div className="avatars">
						{avatars.map((avatar, index) => {
							return (
								<div
									className={`avatar ${
										selectedAvatar === index ? "selected" : ""
									}`}
									key={index}
								>
									<img
										src={`data:image/svg+xml;base64,${btoa(avatar)}`}
										alt=""
										width="100"
										height="100"
										onClick={() => {
											setSelectedAvatar(index);
										}}
									/>
								</div>
							);
						})}
					</div>
					<button onClick={setAvatarProfilePicture} className="submit-btn">
						Set as profile picture
					</button>
					<ToastContainer />
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
	background-color: #131324;
	height: 100vh;
	width: 100vw;
	.loader {
		max-inline-size: 100%;
	}
	.title-container {
		h1 {
			color: white;
			font-size: 2rem;
		}
	}
	.avatars {
		display: flex;
		gap: 1rem;
		flex-flow: row wrap;
		.avatar {
			border: 0.4rem solid transparent;
			padding: 0.4rem;
			border-radius: 5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: 0.5s ease-in-out;
			img {
				height: 6rem;
				transition: 0.5s ease-in-out;
			}
		}
		.selected {
			border: 0.4rem solid #4e0eff;
		}
	}
	.submit-btn {
		background-color: #4e0eff;
		color: white;
		padding: 1rem 2rem;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		text-transform: uppercase;
		&:hover {
			background-color: #4e0eff;
		}
	}
`;
