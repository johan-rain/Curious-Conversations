import { useEffect, useState } from 'react';
import useGetCollection from '../hooks/useGetCollection';

export default function useQuestions() {
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const { data, loading } = useGetCollection();

	useEffect(() => {
		if (!loading) {
		setQuestions(data);
		}
	}, [data, loading]);

	const handleNextQuestion = () => {
		setCurrentQuestion(Math.floor(Math.random() * questions.length));
	};

	return {
		questions,
		currentQuestion,
		handleNextQuestion,
		loading
	};
}