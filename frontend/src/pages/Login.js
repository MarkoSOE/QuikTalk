import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/tailwind.png";
import styled from "styled-components";
import Cookies from "js-cookie";

export default function Login() {
	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000,
		pauseOnHover: true,
		draggable: false,
		theme: "dark",
	};
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const formValidation = () => {
		const { email, password } = formData;
		if (email === "") {
			toast.error("Email and Password is required", toastOptions);
			return false;
		} else if (password === "") {
			toast.error("Email and Password is required", toastOptions);
			return false;
		}
		return true;
	};

	const onSubmit = async (e) => {
		console.log(formData);
		e.preventDefault();
		if (formValidation) {
			const newUser = {
				email,
				password,
			};
			try {
				const config = {
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
					credentials: "include",
				};
				const body = JSON.stringify(newUser);
				const data = await axios.post("/login", body, config);
				//store the user data in localstorage
				localStorage.setItem("user", JSON.stringify(data.data));
				//store the user as currentUser
				window.location.href = "/homepage";
			} catch (error) {
				console.error(error);
			}
		}
	};

	// check to see if the user is aready logged in
	useEffect(() => {
		if (Cookies.get("userid")) {
			navigate("/homepage");
		}
	}, [navigate]);

	return (
		<>
			<FormContainer>
				<form action="" onSubmit={onSubmit}>
					<div className="brand">
						<img src={Logo}></img>
						<h1>QuikTalk</h1>
					</div>
					<span>
						{" "}
						Don't have an account? <Link to="/Signup"> Create one</Link>{" "}
					</span>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={onChange}
					/>
					<input
						type="password"
						placeholder="password"
						name="password"
						onChange={onChange}
					/>
					<button type="submit"> Log In</button>
				</form>
			</FormContainer>
			<ToastContainer></ToastContainer>
		</>
	);
}
const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 5rem;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #00000076;
		border-radius: 2rem;
		padding: 5rem;
	}
	input {
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		color: white;
		width: 100%;
		font-size: 1rem;
		&:focus {
			border: 0.1rem solid #997af0;
			outline: none;
		}
	}
	button {
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
	span {
		color: white;
		text-transform: uppercase;
		a {
			color: #4e0eff;
			text-decoration: none;
			font-weight: bold;
		}
		text-align: center;
	}
`;
