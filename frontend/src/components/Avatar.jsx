// make a call to the multiavatar API to get 5 avatar options and allow the new user to select one of them upon account creation, then it's stored into the mongoDB user collection

import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import ChatContext from "../ChatContext";
import multiavatar from "@multiavatar/multiavatar/esm";
import { Buffer } from "buffer";

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

	//generate 5 random avatars by API call
	useEffect(() => {
		const getAvatar = async () => {
			const data = [];
			for (let i = 0; i < 1; i++) {
				fetch(
					`https://api.multiavatar.com/4645646/${Math.round(
						Math.random() * 1000
					)}`
				)
					.then((res) => res.text())
					.then((svg) => data.push(svg));
				// const svg = await axios.get(
				// 	`https://api.multiavatar.com/4645646/${Math.round(
				// 		Math.random() * 1000
				// 	)}`.text()
				// );
				// const buffer = new Buffer(svg.data);
				// data.push(svg.toString("base64"));
				// data.push(svg);
				console.log(data);
			}
			console.log(data);
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
					<div className="avatars">
						{avatars.map((avatar, index) => {
							return (
								<img
									src={`data:image/svg+xml;utf8,${avatar}`}
									alt="avatar"
									key={avatar}
									onClick={() => setSelectedAvatar(index)}
								/>
							);
						})}
					</div>
				</Container>
			)}
		</>
	);
}

const Container = styled.div``;
