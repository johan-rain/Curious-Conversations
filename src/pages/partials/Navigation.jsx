import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { NavDropdown } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';

const Navigation = () => {
	const { currentUser, userName, userEmail, userRole } = useAuthContext()

	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (userRole === 'admin') {
		setIsAdmin(true);
		} else {
		setIsAdmin(false);
		}
	}, [userRole]);

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
									<NavDropdown
										title={
											<>
												{userName || userEmail}
												{isAdmin && (
												<img
													src="/assets/icons/admin.png"
													width="16"
													height="16"
													className="ms-2"
													alt="Admin icon"
												/>
												)}
											</>
										}
										>
										<NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
										<NavDropdown.Divider />
										<NavLink to="/liked-questions" className="dropdown-item">Liked Questions</NavLink>
										<NavDropdown.Divider />
										<NavLink to="/submit-question" className="dropdown-item">Submit Questions</NavLink>
										{isAdmin && (
										<>
										<NavDropdown.Divider />
										<NavLink to="/admin" className="dropdown-item">Admin</NavLink>
										</>
										)}
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
