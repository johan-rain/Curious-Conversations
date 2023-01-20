import { renderWithBrowserRouter, screen, userEvent } from '../../utils/test-utils'
import CategorySelect from './CategorySelect';

describe('CategorySelect', () => {
	let getByText;

	beforeEach(() => {
		const { container } = renderWithBrowserRouter(<CategorySelect />);
		getByText = container.querySelector.bind(container);
	});

	it('Should render the category select component', () => {
		const categorySelect = screen.getByText(/category-select/i);
		expect(categorySelect).toBeInTheDocument();
	});

	it('Should update the selected category when a button is clicked', () => {
		const button = screen.getByText(/category 1/i);
			userEvent.click(button);
		expect(button).toHaveClass('selected');
	});

	it('Should call the onSelect prop when a button is clicked', () => {
		const onSelect = jest.fn();
			renderWithBrowserRouter(<CategorySelect onSelect={onSelect} />);
		const button = screen.getByText(/category 1/i);
			userEvent.click(button);
		expect(onSelect).toHaveBeenCalledWith('category 1');
	});

	it('Should call the onCategoryChange prop when a button is clicked', () => {
		const onCategoryChange = jest.fn();
			renderWithBrowserRouter(<CategorySelect onCategoryChange={onCategoryChange} />);
		const button = screen.getByText(/category 1/i);
			userEvent.click(button);
		expect(onCategoryChange).toHaveBeenCalled();
	});
});