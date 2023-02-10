// make a call to the multiavatar API to get 5 avatar options and allow the new user to select one of them upon account creation, then it's stored into the mongoDB user collection

import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import ChatContext from "../ChatContext";
import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";
import { Buffer } from "buffer";
import { toast } from "react-toastify";

export default function Avatar() {
	//global states
	const { currentUser, setCurrentUser } = useContext(ChatContext);

	//local states
	const [avatars, setAvatars] = useState([]);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	// //find the current user logged in
	// useEffect(() => {
	// 	const user = JSON.parse(localStorage.getItem("user"));
	// 	if (!user) {
	// 		navigate("/");
	// 	} else {
	// 		setCurrentUser(user);
	// 	}
	// }, []);

	// const selectAvatar = async () => {
	// 	if (selectedAvatar === undefined) {
	// 		//error message
	// 	} else {
	// 		//send the image: avatar[selectedavatar] information into the backend where the collection is stored
	// 	}
	// };

	//sending the selected avatar to the backend
	const setAvatarProfilePicture = async () => {
		//send the avatar and the current user to the backend
		if(selectedAvatar === undefined){
			toast.error("Please select an avatar", toastOptions)
		}
		
	//generate 5 random avatars by API call
	useEffect(() => {
		const getAvatar = async () => {
			const data = [];
			for (let i = 0; i < 5; i++) {
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
										onClick={() => {setSelectedAvatar(index)}}
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
