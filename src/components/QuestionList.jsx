import React from 'react';
import '../assets/scss/App.scss'
import useQuestions from '../hooks/useQuestions';
import { Image } from 'react-bootstrap'


function QuestionList({onClick}) {
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
		<>
			<div className="card" onClick={onClick}>
				<div className="card-back">
					<div className="questions">
						{questions[currentQuestion] ? <p>{questions[currentQuestion].text}</p> : <p>Loading...</p>}
					</div>
				</div>

				<div className="card-front">
					<Image fluid className='logo' src='/src/assets/icons/logo.png' />
					<p className='logo-text'>Curious Conversations</p>
				</div>
			</div>

			<button className="questions-btn mt-3" onClick={handleNextQuestion}>
				Next Question
			</button>
		</>
		
	);
}

export default QuestionList;
