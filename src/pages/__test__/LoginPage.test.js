import { render, fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import LoginPage from '../LoginPage'
import { useAuthContext } from '../contexts/AuthContext'

jest.mock('../contexts/AuthContext', () => ({
	useAuthContext: jest.fn(() => ({
		login: jest.fn(() => Promise.resolve()),
		isAuthenticated: false,
	}))
}))

describe('LoginPage', () => {
	let history;
	beforeEach(() => {
		jest.clearAllMocks()
		history = createMemoryHistory()
	})

	it('displays the login form with email and password inputs', () => {
		render(<LoginPage />)
		
		const emailInput = screen.getByLabelText(/email/i)
		const passwordInput = screen.getByLabelText(/password/i)
		
		expect(emailInput).toBeInTheDocument()
		expect(passwordInput).toBeInTheDocument()
	})

	it('calls the login function when the form is submitted', async () => {
		render(<LoginPage />)
		
		const emailInput = screen.getByLabelText(/email/i)
		const passwordInput = screen.getByLabelText(/password/i)
		const submitButton = screen.getByText(/log in/i)

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
		fireEvent.change(passwordInput, { target: { value: 'password123' } })
		fireEvent.click(submitButton)

		const { login } = useAuthContext()
		
		expect(login).toHaveBeenCalledWith('test@example.com', 'password123')
		expect(history.location.pathname).toBe('/')
	})

	it('displays an error message if login fails', async () => {
		useAuthContext.mockImplementation(() => ({
			login: jest.fn(() => Promise.reject(new Error('Invalid credentials'))),
			isAuthenticated: false,
		}))
		render(<LoginPage />)
		
		const emailInput = screen.getByLabelText(/email/i)
		const passwordInput = screen.getByLabelText(/password/i)
		const submitButton = screen.getByText(/log in/i)

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
		fireEvent.change(passwordInput, { target: { value: 'password123' } })
		fireEvent.click(submitButton)

		const error = await screen.findByText(/Invalid credentials/i)
		
		expect(error).toBeInTheDocument()

		it('redirects to the homepage if the user is already logged in', async () => {
			useAuthContext.mockImplementation(() => ({
				login: jest.fn(),
				isAuthenticated: true,
			}))
			render(<LoginPage />)
			
			expect(history.location.pathname).toBe('/')
		})
	})
})
