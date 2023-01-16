import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const RequireAuth = ({
	// The content that should be rendered if the user is authenticated.
	children,
	// The route that unauthenticated users should be redirected to.
	redirectTo = "/login",
}) => {
	//get the current user from the auth context
	const { currentUser } = useAuthContext()

	return (
		// if the user is authenticated render the children
		currentUser
			? children
			// otherwise redirect the user to the specified route
			: <Navigate to={redirectTo} />
	)
}

export default RequireAuth