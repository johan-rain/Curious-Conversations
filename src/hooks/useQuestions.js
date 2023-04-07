import { useEffect, useState } from 'react';
import useGetCollection from '../hooks/useGetCollection';

const useQuestions = (selectedCategory) => {
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questionOrder, setQuestionOrder] = useState([]);
	const { data, loading } = useGetCollection();

	useEffect(() => {
		if (!loading) {
			const filteredQuestions = data.filter(
			(question) => question.category === selectedCategory
	);
		setQuestions(filteredQuestions);
		setQuestionOrder([]);
		setCurrentQuestion(0);
	} else if (selectedCategory) {
		setQuestions([]);
	}
	}, [data, loading, selectedCategory]);

	const handleNextQuestion = () => {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * questions.length);
		} while (questionOrder.includes(newIndex));

		setQuestionOrder([...questionOrder, newIndex]);
		setCurrentQuestion(newIndex);
	};

	const handlePrevQuestion = () => {
		const prevIndex = questionOrder.indexOf(currentQuestion) - 1;
		if (prevIndex >= 0) {
		setCurrentQuestion(questionOrder[prevIndex]);
		}
	};

	return {
		questions,
		currentQuestion,
		handleNextQuestion,
		handlePrevQuestion,
		loading,
	};
};

export default useQuestions;
