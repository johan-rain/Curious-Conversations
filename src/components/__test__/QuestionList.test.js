import { render, fireEvent } from '@testing-library/react'
import QuestionList from './QuestionList'

describe('QuestionList', () => {

	it('should display the first question when the component is rendered', () => {
		const selectedCategory = 'category1'
		const questions = [
			{ id: 1, category: 'category1', text: 'question 1' },
			{ id: 2, category: 'category1', text: 'question 2' },
		]
		const { getByText } = render(
		<QuestionList selectedCategory={selectedCategory} questions={questions} />
		)
		expect(getByText('question 1')).toBeInTheDocument()
	})

	it('should display the next question when the next button is clicked', () => {
		const selectedCategory = 'category1'
		const questions = [
			{ id: 1, category: 'category1', text: 'question 1' },
			{ id: 2, category: 'category1', text: 'question 2' },
		]
		const { getByText } = render(
		<QuestionList selectedCategory={selectedCategory} questions={questions} />
		)
		fireEvent.click(getByText('Next'))
		expect(getByText('question 2')).toBeInTheDocument()
	})
})