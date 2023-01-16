import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'
import SyncLoader from 'react-spinners/SyncLoader'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userName, setUserName] = useState(null)
	const [userEmail, setUserEmail] = useState(null)
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true)
	// function for user signup
	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}
	// function for user login
	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}
	// function for user logout
	const logout = () => {
		return signOut(auth)
	}
	// function to reload user's data
	const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		return true
	}
	// function to reset user's password
	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email)
	}
	// function to update user's email
	const setEmail = (email) => {
		return updateEmail(currentUser, email)
	}
	// function to update user's password
	const setPassword = (newPassword) => {
		return updatePassword(currentUser, newPassword)
	}
	// function to update user's display name
	const setDisplayName = async (displayName) => {
		return updateProfile(auth.currentUser, {
			displayName,
		})
	}
	// useEffect to subscribe to the Firebase's onAuthStateChanged event
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setUserName(user?.displayName)
			setUserEmail(user?.email)
			setLoading(false)
		})

		return unsubscribe
	}, [])
	// object to hold the context values
	const contextValues = {
		currentUser,
		login,
		logout,
		signup,
		reloadUser,
		resetPassword,
		setDisplayName,
		setEmail,
		setPassword,
		userName,
		userEmail,
		error,
		setError,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading ? (
				<div id="initial-loader">
					<SyncLoader color={'#888'} size={15} speedMultiplier={1.1} />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
}
