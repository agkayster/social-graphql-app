// import DisplayData from './DisplayData';
import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';

import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Navbar from './components/navbar';
import Posts from './components/Pages/Posts';
import NewPost from './components/NewPost';
import Post from './components/Post';
import { AuthContext } from './hooks/useTokenContext';
// import AuthContextProvider from './hooks/useTokenContext';
import ProtectedRoutes from './Utils/ProtectedRoutes';
import SecureRoute from './Utils/SecureRoutes';
// import { useAuthContext } from './hooks/useTokenContext';

const App = () => {
	/* you can't use useContext in App, if it is wrapped with AuthContextProvider, 
	wrap AuthContextProvider in index.js */
	const { getUser } = useContext(AuthContext);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='posts' element={<Posts />} />
				<Route path='newPost' element={<NewPost />} />
				<Route
					path='posts/:postId'
					element={
						/* user must be logged in to see single post */
						<ProtectedRoutes user={getUser?.username}>
							<Post />
						</ProtectedRoutes>
					}
				/>
				<Route
					path='login'
					element={<SecureRoute Component={Login} />}
				/>
				<Route
					path='register'
					element={<SecureRoute Component={Register} />}
				/>
			</Routes>
		</>
	);
};

export default App;
