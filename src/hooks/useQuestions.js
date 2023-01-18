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
		}
	}, [data, loading, selectedCategory]);

	const handleNextQuestion = () => {
		if (currentQuestion === questions.length - 1) {
			setCurrentQuestion(0);
		} else {
			setCurrentQuestion(currentQuestion + 1);
		}
	}

	return {
		questions,
		currentQuestion,
		handleNextQuestion,
		loading
	};
}

export default useQuestions