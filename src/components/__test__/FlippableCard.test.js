import { render, fireEvent } from '@testing-library/react';
import FlippableCard from './FlippableCard';

describe('FlippableCard', () => {
	it('should not render if showWelcomeMessage is true', () => {
		const { queryByTestId } = render(<FlippableCard showWelcomeMessage={true} />);
		
		expect(queryByTestId('flippable-card')).toBeNull();
	});

	it('should render if showWelcomeMessage is false', () => {
		const { queryByTestId } = render(<FlippableCard showWelcomeMessage={false} />);
		
		expect(queryByTestId('flippable-card')).toBeInTheDocument();
	});

	it('should change the current question when selectedCategory changes', () => {
		const { queryByTestId, rerender } = render(<FlippableCard selectedCategory={'category1'} showWelcomeMessage={false} />);
		
		expect(queryByTestId('current-question')).toHaveTextContent('0');
		
		rerender(<FlippableCard selectedCategory={'category2'} showWelcomeMessage={false} />);
		
		expect(queryByTestId('current-question')).toHaveTextContent('0');
	});

	it('should toggle the show front state when the button is clicked', () => {
		const { queryByTestId } = render(<FlippableCard showWelcomeMessage={false} />);
		
		expect(queryByTestId('show-front')).toHaveTextContent('true');
		
		fireEvent.click(queryByTestId('toggle-button'));
		
		expect(queryByTestId('show-front')).toHaveTextContent('false');
		
		fireEvent.click(queryByTestId('toggle-button'));
		
		expect(queryByTestId('show-front')).toHaveTextContent('true');
	});
});
