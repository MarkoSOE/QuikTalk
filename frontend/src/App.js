import "./index.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import socketIO from "socket.io-client";

import { ChatProvider } from "./ChatContext";

const socket = socketIO("http://localhost:3000");

const App = () => {
	return (
		<div className="App">
			<ChatProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/homepage"
						element={<MainPage socket={socket} />}
						exact
					/>
					<Route path="/signup" element={<Signup />} exact />
				</Routes>
			</ChatProvider>
		</div>
	);
};

export default App;
