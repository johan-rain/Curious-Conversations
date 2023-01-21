import React, { useRef, useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LoginPage = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { login } = useAuthContext()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		// prevent default form behavior
		e.preventDefault()
		setError(null);

		try {
			// set loading status and call login function
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
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
							<Card.Title className="text-center mb-3">Log In</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Button disabled={loading} type="submit">Log In</Button>
							</Form>

							<div className="user-forgot text-center mt-3">
								<Link to="/forgot-password">Forgot Password?</Link>
							</div>
						</Card.Body>
					</Card>

					<div className="user-links text-center mt-3">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
		</Container>
	)
}

export default LoginPage
