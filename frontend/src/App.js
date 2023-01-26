import "./index.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import { ChatProvider } from "./ChatContext";

const App = () => {
	return (
		<div className="App">
			<ChatProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/homepage" element={<MainPage />} exact />
					<Route path="/signup" element={<Signup />} exact />
				</Routes>
			</ChatProvider>
		</div>
	);
};

export default App;
