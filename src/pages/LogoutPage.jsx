import React, { useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LogoutPage = () => {
	const navigate = useNavigate()
	const { logout } = useAuthContext()

	useEffect(() => {
		// function to logout user and navigate to homepage
		const logoutUser = async () => {
			await logout()
			navigate('/')
		}
		// call logoutUser function as soon as the component is rendered
		logoutUser()
		// empty dependency array to avoid infinite loop
		}, [])

	return (
		<Container className="py-3 center-y">
					<Card>
						<Card.Body>
							<Card.Text>Logging you out, please wait</Card.Text>
						</Card.Body>
					</Card>
		</Container>
	)
}

export default LogoutPage
