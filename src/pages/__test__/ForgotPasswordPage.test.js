import { render, screen, fireEvent, rerender } from '@testing-library/react'
import ForgotPasswordPage from '../ForgotPasswordPage';

describe('ForgotPasswordPage', () => {
	it("renders the form and uses the emailRef correctly", () => {
		render(<ForgotPasswordPage />);

		const emailInput = screen.getByLabelText("Email");
		
		expect(emailInput).toBeInTheDocument();
		expect(emailInput).toHaveAttribute("type", "email");
		expect(emailInput).toHaveAttribute("required");
	});
	
	it("disables the submit button while loading and enables it when not loading", () => {
		render(<ForgotPasswordPage />);
		
		const submitButton = screen.getByText(/Send password reset email/i);
		
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toBeEnabled();
	
		// set loading to true and re-render
		rerender(<ForgotPasswordPage loading={true} />);
		expect(submitButton).toBeDisabled();
	});
	
	it("displays the correct error message when an error occurs", () => {
		const testError = "Test error message";
		
		render(<ForgotPasswordPage error={testError} />);
		
		const errorMessage = screen.getByText(testError);
		
		expect(errorMessage).toBeInTheDocument();
	});
	
	it("displays the correct success message when the password reset is successful", () => {
		const testMessage = "Password reset link successfully sent!";
		
		render(<ForgotPasswordPage message={testMessage} />);
		
		const successMessage = screen.getByText(testMessage);
		
		expect(successMessage).toBeInTheDocument();
	});
	
	it("calls the resetPassword function with the correct email when the form is submitted", async () => {
		const testEmail = "test@example.com";
		const mockResetPassword = jest.fn();
		
		render(<ForgotPasswordPage resetPassword={mockResetPassword} />);
	
		// set the value of the email input and submit the form
		fireEvent.change(screen.getByLabelText("Email"), { target: { value: testEmail } });
		fireEvent.submit(screen.getByRole("form"));
		
		expect(mockResetPassword).toHaveBeenCalledWith(testEmail);
	});
})

