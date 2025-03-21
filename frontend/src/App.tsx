import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Members from "./features/MembersArea/components/members";
// import Search from "./components/members/search";
import Explore from "./features/MembersArea/components/members/explore";
import Sidebar from "./features/MembersArea/components/sidebar";
import Profile from "./features/MembersArea/components/members/profile/profile";
import RegisterForm from "./features/Register/components/RegisterForm";
import "./app.css";

function App() {
	return (
		<Router>
			<div className='members-container'>
				<Sidebar />
				<div className='members-wrapper'>
					<Routes>
						<Route path='/' element={<Members />} />
						{/* <Route path="/user-search" element={<Search />} /> */}
						<Route path='/explore' element={<Explore />} />
						<Route path='/profile' element={<Profile />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
