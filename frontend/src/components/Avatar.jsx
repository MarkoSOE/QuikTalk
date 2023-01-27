// make a call to the multiavatar API to get 5 avatar options and allow the new user to select one of them upon account creation, then it's stored into the mongoDB user collection

import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import ChatContext from "../ChatContext";

export default function Avatar() {
	//global states
	const { currentUser, setCurrentUser } = useContext(ChatContext);

	//local states
	const [avatars, setAvatars] = useState([]);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	//find the current user logged in
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/");
		} else {
			setCurrentUser(user);
		}
	});

	const selectAvatar = async () => {
		if (selectedAvatar === undefined) {
			//error message
		} else {
			//send the image: avatar[selectedavatar] information into the backend where the collection is stored
		}
	};

	//generate 5 random avatars by API call
	useEffect(() => {
		const data = [];
		for (let i = 0; i < 4; i++) {
			let randomAvatar = axios.get(
				`https://api.multiavatar.com/${Math.floor(Math.random() * 10000)}.svg`
			);
			data.push(randomAvatar);
		}
		setAvatars(data);
		setIsLoading(false);
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
							return <img src={avatar} alt="pic" key={avatar} />;
						})}
					</div>
				</Container>
			)}
		</>
	);
}

const Container = styled.div``;
