import React, { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const SignupPage = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { signup, reloadUser } = useAuthContext()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		// prevent default form behavior
		e.preventDefault()
		// check if passwords match
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords do not match")
		}
		// clear error message
		setError(null);

		try {
			// set loading status and call signup function
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value)
			// call reloadUser function to update user data
			await reloadUser()
			// navigate to homepage
			navigate('/')
		} catch (err) {
			// set error message and clear loading status
			setError(err.message)
			setLoading(false)
		}
	}

	return (
		<Container className="py-3 center-y">
					<Card>
						<Card.Body>
							<Card.Title className="mb-2 text-center">Sign Up</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="email" className="mb-2">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password" className="mb-2">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Form.Group id="password-confirm" className="mb-2">
									<Form.Label>Password Confirmation</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef} required />
								</Form.Group>

								<Button disabled={loading} type="submit">Create Account</Button>
							</Form>

						</Card.Body>
					</Card>

					<div className="user-links text-center mt-3">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
		</Container>
	)
}

export default SignupPage
