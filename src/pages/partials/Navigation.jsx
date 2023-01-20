import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	const { currentUser, userName, userEmail } = useAuthContext()

	return (
		<Navbar className='nav-bar' variant="white" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<img
						src="/assets/icons/logo.png"
						width="50"
						height="50"
						className="d-inline-block align-items-center"
						alt="Curious Conversations logo"
					/>{' '}
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="" />
				<Navbar.Collapse id="">
					<Nav className="nav-bar ms-auto align-items-center">
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
