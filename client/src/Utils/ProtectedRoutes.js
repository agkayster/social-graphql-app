/* Use this for protected routes or to protect private routes for those not logged in
if user is not logged in, cannot go to single post
 */
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ user, redirectPath = '/login', children }) => {
	if (!user) {
		return <Navigate to={redirectPath} replace />;
	}
	return children;
};

export default ProtectedRoutes;
