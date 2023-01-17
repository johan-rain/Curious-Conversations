import React from 'react';
import useQuestions from '../hooks/useQuestions';

function QuestionList() {
	const { 
		questions,
		currentQuestion,
		handleNextQuestion,
		loading 
	} = useQuestions();

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="questions">
			{questions[currentQuestion] ? <p>{questions[currentQuestion].text}</p> : <p>Loading...</p>}
			<button className="questions-btn" onClick={handleNextQuestion}>
				Next Question
			</button>
		</div>
	);
}

export default QuestionList;
