/* use this to implement token all over the App. Implement at Index.js as well */
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [getUser, setGetUser] = useState(
		localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user'))
			: null
	);

	return (
		<AuthContext.Provider value={{ getUser, setGetUser }}>
			{children}
		</AuthContext.Provider>
	);
};

// export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;

// import React, { useReducer, createContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

// const initialState = {
// 	user: localStorage.getItem('user')
// 		? JSON.parse(localStorage.getItem('user'))
// 		: {},
// };

// // /* this is to ensure that if the expiration time on the token assigned to the user has reached, the user is automatically logged out */
// // if (localStorage.getItem('user')) {
// // 	/* use jwt-decode to decode the token and get the expiration (exp) time */
// // 	const decodedToken = jwtDecode(localStorage.getItem('user'));

// // 	/* this checks to see if the exp has expired */
// // 	if (decodedToken.exp * 1000 < Date.now()) {
// // 		localStorage.removeItem('user');
// // 	} else {
// // 		initialState.user = decodedToken;
// // 	}
// // }

// // console.log('get initial state token =>', initialState.user);

// const AuthContext = createContext({
// 	user: null,
// 	login: (userData) => {} /* function that would take userData as variable */,
// 	logout: () => {} /* function with no variable */,
// });

// // const authReducer = (state, action) => {
// // 	/* destructure type and payload from action */
// // 	const { type, payload } = action;

// // 	/* if we have a type of "LOGIN" or "LOGOUT", thats what the switch means */
// // 	switch (type) {
// // 		case 'LOGIN':
// // 			/* return the whole state and the user with a payload in an object format */
// // 			return { ...state, user: payload };
// // 		case 'LOGOUT':
// // 			/* return the whole state and the user with null in an object format */
// // 			return { ...state, user: null };

// // 		default:
// // 			return state;
// // 	}
// // };
// const authReducer = (state, action) => {
// 	/* destructure type and payload from action */
// 	const { type, payload } = action;

// 	/* if we have a type of "LOGIN" or "LOGOUT", thats what the switch means */
// 	switch (type) {
// 		case 'LOGIN':
// 			/* return the whole state and the user with a payload in an object format */
// 			const getUser = payload.user;
// 			if (!getUser) {
// 				localStorage.setItem('user', JSON.stringify(payload.user));
// 				return { ...state, user: payload.user };
// 			} else {
// 				localStorage.setItem('user', JSON.stringify(getUser));
// 				return { ...state, user: getUser };
// 			}
// 		case 'LOGOUT':
// 			/* return the whole state and the user with null in an object format */
// 			return { ...state, user: null };

// 		default:
// 			return state;
// 	}
// };

// const AuthProvider = (props) => {
// 	/* authReducer function is always passed into state, {user:null} is initialState */
// 	const [state, dispatch] = useReducer(authReducer, initialState);
// 	const navigate = useNavigate();

// 	/* implement login function as in AuthContext */
// 	function login(userData) {
// 		dispatch({
// 			type: 'LOGIN',
// 			payload: { user: userData },
// 		});
// 	}

// 	/* implement logout function as in AuthContext */
// 	function logout() {
// 		dispatch({
// 			type: 'LOGOUT',
// 		});
// 		localStorage.removeItem('user');
// 		navigate('/');
// 	}
// 	return (
// 		<AuthContext.Provider
// 			value={{ login, logout, user: state.user }}
// 			{...props}
// 		/>
// 	);
// };

// export { AuthContext, AuthProvider };
