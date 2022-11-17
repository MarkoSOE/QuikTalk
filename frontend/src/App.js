import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";

import ChatContext from "./ChatContext";

const App = () => {
	return (
		<div className="App">
			<ChatContext>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/homepage" element={<MainPage />} exact />
					<Route path="/signup" element={<Signup />} exact />
				</Routes>
			</ChatContext>
		</div>
	);
};

export default App;
