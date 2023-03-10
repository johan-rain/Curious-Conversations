import { useEffect, useState } from 'react';
import useGetCollection from '../hooks/useGetCollection';

const useQuestions = (selectedCategory) => {
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const { data, loading } = useGetCollection();

	useEffect(() => {
		if (!loading) {
			const filteredQuestions = data.filter(question => question.category === selectedCategory);
			setQuestions(filteredQuestions);
		} else if (selectedCategory) {
			setQuestions([]);
		}
	}, [data, loading, selectedCategory]);

	const handleNextQuestion = () => {
		if (currentQuestion === questions.length - 1) {
			setCurrentQuestion(0);
		} else {
			setCurrentQuestion(currentQuestion + 1);
		}
	}

	const handlePrevQuestion = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(0);
		} else {
			setCurrentQuestion(currentQuestion - 1);
		}
	}

	return {
		questions,
		currentQuestion,
		handleNextQuestion,
		handlePrevQuestion,
		loading
	};
}

export default useQuestions