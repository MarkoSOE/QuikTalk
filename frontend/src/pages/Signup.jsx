import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Logo from "../assets/tailwind.png";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmpassword: "",
	});
	const { firstname, lastname, email, password, confirmpassword } = formData;
	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};
	const navigate = useNavigate();

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value.toLowerCase() });

	const formValidation = () => {
		if (firstname === "" || lastname === "") {
			toast.error("Name is required", toastOptions);
			return false;
		} else if (email === "" || password === "") {
			toast.error("Email and Password is required", toastOptions);
			return false;
		} else if (password !== confirmpassword) {
			toast.error("Password do not match", toastOptions);
			return false;
		}
		return true;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (formValidation()) {
			const newUser = {
				firstname,
				lastname,
				email,
				password,
				confirmpassword,
			};
			try {
				const config = {
					headers: {
						"Content-Type": "application/json",
					},
				};
				const body = JSON.stringify(newUser);
				await axios.post("/signup", body, config).then((res) => {
					localStorage.setItem("user", JSON.stringify(res.data));
					window.location.href = "/setAvatar";
				});
			} catch (error) {
				console.log(error.res.data);
				//add toast messages here
			}
		}
	};
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
						Already have an account? <Link to="/"> Log in</Link>{" "}
					</span>
					<input
						type="text"
						placeholder="First Name"
						name="firstname"
						onChange={onChange}
					/>
					<input
						type="text"
						placeholder="Last Name"
						name="lastname"
						onChange={onChange}
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={onChange}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={onChange}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						name="confirmpassword"
						onChange={onChange}
					/>
					<button type="submit"> Signup</button>
				</form>
			</FormContainer>
			<ToastContainer />
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
