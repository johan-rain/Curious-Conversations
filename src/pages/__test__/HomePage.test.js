import { renderWithBrowserRouter, screen, userEvent } from '../../utils/test-utils'
import HomePage from '../HomePage';

describe('HomePage', () => {
  let getByText;

  beforeEach(() => {
		const { container } = renderWithBrowserRouter(<HomePage />);
		getByText = container.querySelector.bind(container);
	});

  it('Should render the welcome message', () => {
    const title = getByText('welcome-title');
    const message = getByText('welcome-message');
    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('Should render the category select component', () => {
    const categorySelect = getByText('category-select');
    expect(categorySelect).toBeInTheDocument();
  });

  it('Should update the selected category when a button is clicked', () => {
    const button = getByText('category-1');
    fireEvent.click(button);
    expect(button).toHaveClass('selected');
  });

  it('Should not render the welcome message when a category is selected', () => {
    const button = getByText('category-1');
    fireEvent.click(button);
    const title = getByText('welcome-title');
    expect(title).not.toBeInTheDocument();
  });
});
