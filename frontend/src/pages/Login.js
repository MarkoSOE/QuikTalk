/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBInput,
	MDBIcon,
} from "mdb-react-ui-kit";

import Cookies from "js-cookie";

export default function Example() {
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
			{/* <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt="Your Company"
						/>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Sign in to your account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							If you're new:{" "}
							<a
								href="../Signup"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Signup Now
							</a>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="-space-y-px rounded-md shadow-sm">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Email address"
									onChange={onChange}
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Password"
									onChange={onChange}
								/>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div> */}
			<MDBContainer fluid>
				<MDBRow className="d-flex justify-content-center align-items-center h-100">
					<MDBCol col="12">
						<MDBCard
							className="bg-dark text-white my-5 mx-auto "
							style={{ borderRadius: "1rem", maxWidth: "400px" }}
						>
							<MDBCardBody
								onSubmit={onSubmit}
								method="POST"
								className="p-5 d-flex flex-column align-items-center mx-auto w-100"
							>
								<h2 className="fw-bold mb-2 text-uppercase">Login</h2>
								<p className="text-white-50 mb-5">
									Please enter your login and password!
								</p>
								<form onSubmit={onSubmit} method="POST">
									<MDBInput
										wrapperClass="mb-4 mx-5 w-100"
										labelClass="text-white"
										id="email-address"
										name="email"
										type="email"
										autoComplete="email"
										label="Email address"
										size="lg"
										onChange={onChange}
									/>
									<MDBInput
										wrapperClass="mb-4 mx-5 w-100"
										labelClass="text-white"
										id="formWhite"
										name="password"
										type="password"
										autoComplete="current-password"
										label="Password"
										size="lg"
										onChange={onChange}
									/>

									<MDBBtn
										type="submit"
										className="mx-2 px-5"
										color="white"
										size="lg"
									>
										Login
									</MDBBtn>
								</form>

								<div className="d-flex flex-row mt-3 mb-5">
									<MDBBtn
										tag="a"
										color="none"
										className="m-3"
										style={{ color: "white" }}
									>
										<MDBIcon fab icon="facebook-f" size="lg" />
									</MDBBtn>

									<MDBBtn
										tag="a"
										color="none"
										className="m-3"
										style={{ color: "white" }}
									>
										<MDBIcon fab icon="twitter" size="lg" />
									</MDBBtn>

									<MDBBtn
										tag="a"
										color="none"
										className="m-3"
										style={{ color: "white" }}
									>
										<MDBIcon fab icon="google" size="lg" />
									</MDBBtn>
								</div>

								<div>
									<p className="mb-0">
										Don't have an account?{" "}
										<a href="#!" className="text-white-50 fw-bold">
											Sign Up
										</a>
									</p>
								</div>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			<ToastContainer />
		</>
	);
}
