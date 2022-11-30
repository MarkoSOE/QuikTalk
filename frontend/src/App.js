import "./index.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import io from "socket.io-client";

import { ChatProvider } from "./ChatContext";

const App = () => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");

	return (
		<div className="App">
			<ChatProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/homepage"
						element={
							<MainPage
								username={username}
								setUsername={setUsername}
								room={room}
								setRoom={setRoom}
							/>
						}
						exact
					/>
					<Route path="/signup" element={<Signup />} exact />
				</Routes>
			</ChatProvider>
		</div>
	);
};

export default App;
