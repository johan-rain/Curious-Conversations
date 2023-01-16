import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	const { currentUser, userName, userEmail } = useAuthContext()

	return (
		<Navbar bg="white" variant="white" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<img
						src="/src/assets/icons/logo.png"
						width="50"
						height="50"
						className="d-inline-block align-items-center"
						alt="React Bootstrap logo"
					/>{' '}
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						{
							currentUser ? (
								<>
									<NavDropdown title={
										userName || userEmail
									}>
										<NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
										<NavDropdown.Divider />
										<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
									</NavDropdown>
								</>
							) : (
								<>
									{/* No user is logged in */}
									<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
									<Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
								</>
							)
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
