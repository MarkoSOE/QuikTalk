import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import { ChatProvider } from "./ChatContext";
import Avatar from "./components/Avatar";

const App = () => {
	return (
		<div className="App">
			<ChatProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/homepage" element={<MainPage />} exact />
					<Route path="/setAvatar" element={<Avatar />} exact />
					<Route path="/signup" element={<Signup />} exact />
				</Routes>
			</ChatProvider>
		</div>
	);
};

export default App;
