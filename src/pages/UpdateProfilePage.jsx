import { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert,} from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const UpdateProfilePage = () => {
	const displayNameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(null)
	const {
		currentUser,
		reloadUser,
		setDisplayName,
		setEmail,
		setPassword,
	} = useAuthContext()

	const handleSubmit = async (e) => {
		// prevent default form behavior
		e.preventDefault()
		// check if passwords match
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords do not match")
		}
		// clear error message and message
		setError(null);
		setMessage(null);

		try {
			//set loading state to true while updating profile
			setLoading(true)
			//check if display name input field has been modified
			if (displayNameRef.current.value !== currentUser.displayName) {
				//if modified, update display name with new value from input field	
				await setDisplayName(displayNameRef.current.value)
			}
			//check if email input field has been modified
			if (emailRef.current.value !== currentUser.email) {
				//if modified, update password with new value from input field
				await setEmail(emailRef.current.value)
			}
			//check if password input field has been modified
			if (passwordRef.current.value) {
				//if modified, update password with new value from input field
				await setPassword(passwordRef.current.value)
			}
			//reload user data to reflect updated profile
			await reloadUser()
			//set success message and set loading state to false
			setMessage("Profile successfully updated")
			setLoading(false)

		} catch (e) {
			//log error message and set error and loading state to false
			console.log("Error updating profile", e)
			setError(e.message)
			setLoading(false)
		}
	}

	return (
		<Container className="py-3 center-y">
					<Card>
						<Card.Body>
							{error && (<Alert variant="danger">{error}</Alert>)}
							{message && (<Alert variant="success">{message}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="displayName" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} />
								</Form.Group>

								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
								</Form.Group>

								<Form.Group id="password" className="mb-3">
									<Form.Label>New Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} autoComplete="new-password" />
								</Form.Group>

								<Form.Group id="password-confirm" className="mb-3">
									<Form.Label>Confirm New Password</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef} autoComplete="new-password" />
								</Form.Group>

								<Button disabled={loading} type="submit">Update</Button>
							</Form>
						</Card.Body>
					</Card>
		</Container>
	)
}

export default UpdateProfilePage
