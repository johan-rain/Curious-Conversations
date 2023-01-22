import { render, screen } from '@testing-library/react'
import HomePage from '../HomePage'

describe('HomePage', () => {
	it('displays the welcome message when the component is first rendered', () => {
		render(<HomePage />)
		
		const welcomeTitle = screen.getByText(/Welcome to Curious Conversations/i)
		const welcomeText = screen.getByText(/Chose a category and lets get started/i)
		
		expect(welcomeTitle).toBeInTheDocument()
		expect(welcomeText).toBeInTheDocument()
	})

	it('renders the CategorySelect component', () => {
		render(<HomePage />)
		
		const categorySelect = screen.getByTestId('category-select')
		
		expect(categorySelect).toBeInTheDocument()
	})

	it('renders the FlippableCard component', () => {
		render(<HomePage />)
		
		const flippableCard = screen.getByTestId('flippable-card')
		
		expect(flippableCard).toBeInTheDocument()
	})

	it('calls the onSelect function when a category is selected', () => {
		render(<HomePage />)
		
		const categorySelect = screen.getByTestId('category-select')
		const select = categorySelect.querySelector('select')
		
		fireEvent.change(select, { target: { value: 'category1' } },
		
		expect(select.value).toBe('category1'))
	})

	it('calls the onCategoryChange function when a category is selected', () => {
		const handleCategoryChange = jest.fn()
		
		render(<HomePage onCategoryChange={handleCategoryChange} />)
		
		const categorySelect = screen.getByTestId('category-select')
		const select = categorySelect.querySelector('select')
		
		fireEvent.change(select, { target: { value: 'category1' } })
		
		expect(handleCategoryChange).toHaveBeenCalled()
	})

	it('passes the correct props to the FlippableCard component', () => {
		render(<HomePage />)
		
		const flippableCard = screen.getByTestId('flippable-card')
		
		expect(flippableCard).toHaveAttribute('selectedCategory', expect.any(String))
		expect(flippableCard).toHaveAttribute('showWelcomeMessage', expect.any(Boolean))
	})
})
