import { render, screen } from '@testing-library/react'
import UpdateProfilePage from '../UpdateProfilePage'

describe("UpdateProfilePage", () => {

	it('displays the current user display name and email in the input fields', () => {
		render(<UpdateProfilePage />)
		
		const displayNameInput = screen.getByLabelText(/name/i);
		const emailInput = screen.getByLabelText(/email/i);
		
		expect(displayNameInput.value).toBe(currentUser.displayName);
		expect(emailInput.value).toBe(currentUser.email);
	})

	it('displays an error message if passwords do not match', () => {
		render(<UpdateProfilePage />)
		
		const passwordInput = screen.getByLabelText(/new password/i);
		const passwordConfirmInput = screen.getByLabelText(/confirm new password/i);
		const submitButton = screen.getByRole('button', { name: /submit/i });
		
		passwordInput.value = "password123";
		passwordConfirmInput.value = "password456";

		fireEvent.click(submitButton);

		const errorMessage = screen.getByText(/The passwords do not match/i);
		
		expect(errorMessage).toBeInTheDocument();
	});
})