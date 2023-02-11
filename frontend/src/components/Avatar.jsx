// make a call to the multiavatar API to get 5 avatar options and allow the new user to select one of them upon account creation, then it's stored into the mongoDB user collection

import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import ChatContext from "../ChatContext";
import { toast } from "react-toastify";

export default function Avatar() {
	//global states
	const { currentUser, setCurrentUser } = useContext(ChatContext);

	//local states
	const [avatars, setAvatars] = useState([]);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	//sending the selected avatar to the backend
	const setAvatarProfilePicture = async () => {
		if (selectedAvatar === undefined) {
			toast.error("Please select an avatar");
		} else {
			try {
				const sendAvatar = await axios.post("/setAvatarProfilePicture", {
					currentUser: currentUser,
					image: avatars[selectedAvatar],
				});
				console.log(sendAvatar);
			} catch (error) {
				console.error(error);
			}
		}
	};

	//generate 5 random avatars by API call
	useEffect(() => {
		const getAvatar = async () => {
			const data = [];
			for (let i = 0; i < 2; i++) {
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
					<div>
						<h1>Choose your avatar</h1>
					</div>
					<div className="avatars">
						{avatars.map((avatar, index) => {
							return (
								<div className={`avatar`} key={index}>
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
				</Container>
			)}
		</>
	);
}

const Container = styled.div``;
