import { render, fireEvent, screen } from '@testing-library/react'
import SignupPage from '../SignupPage'

jest.mock('../contexts/AuthContext', () => ({
	useAuthContext: jest.fn(() => ({
		signup: jest.fn(() => Promise.resolve()),
		reloadUser: jest.fn(() => Promise.resolve())
	}))
}))

describe('SignupPage', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('displays the signup form with email, password, and password confirmation inputs', async () => {
		render(<SignupPage />)
		
		const emailInput = screen.getByLabelText(/email/i)
		const passwordInput = screen.getByLabelText(/password/i)
		const passwordConfirmInput = screen.getByLabelText(/password confirmation/i)
		
		expect(emailInput).toBeInTheDocument()
		expect(passwordInput).toBeInTheDocument()
		expect(passwordConfirmInput).toBeInTheDocument()
	})

	it('displays an error message when the passwords do not match', async () => {
		render(<SignupPage />)
		
		const emailInput = screen.getByLabelText(/email/i)
		const passwordInput = screen.getByLabelText(/password/i)
		const passwordConfirmInput = screen.getByLabelText(/password confirmation/i)
		const submitButton = screen.getByText(/create account/i)

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
		fireEvent.change(passwordInput, { target: { value: 'password123' } })
		fireEvent.change(passwordConfirmInput, { target: { value: 'password456' } })
		fireEvent.click(submitButton)

		const errorMessage = await screen.findByText(/the passwords do not match/i)
		
		expect(errorMessage).toBeInTheDocument()
	})
})