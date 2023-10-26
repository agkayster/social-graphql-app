import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../hooks/useTokenContext';

// Ensures that users cannot get to url routes without a token //
// SecureRoute is exported to App.js //
const SecureRoute = ({ Component, ...rest }) => {
	// const userDetail = JSON.parse(localStorage.getItem('user'));
	const { getUser } = useContext(AuthContext);
	// console.log('get user detail from navbar =>', userDetail);
	const token = getUser?.token;

	return token ? <Navigate to='/' /> : <Component />;
};
// const SecureRoute = ({ Component, ...rest }) => {
// 	// const userDetail = JSON.parse(localStorage.getItem('user'));
// 	const { getUser } = useContext(AuthContext);
// 	// console.log('get user detail from navbar =>', userDetail);
// 	const token = getUser?.token;

// 	return (
// 		<Route
// 			{...rest}
// 			render={(props) =>
// 				token ? <Navigate to='/' /> : <Component {...props} />
// 			}/>
// 	);
// };

export default SecureRoute;
