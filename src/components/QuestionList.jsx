import React, { useState } from 'react';
import '../assets/scss/App.scss'
import useQuestions from '../hooks/useQuestions';
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons'


const QuestionList = ({onClick, selectedCategory, showFront}) => {
	const { 
		questions,
		currentQuestion,
		handleNextQuestion,
		handlePrevQuestion,
		loading 
	} = useQuestions(selectedCategory);

	// Filter the questions array to only include the ones that match the selected category
	const filteredQuestions = questions.filter(question => question.category === selectedCategory);

	return (
		<>
			<div className="card" onClick={onClick}>
				<div className="card-back">
					<div className="questions">
						{/* If there is a question for the current index, show it, otherwise show a loading message */}
					{filteredQuestions[currentQuestion] ? <p>{filteredQuestions[currentQuestion].text}</p> : <p>Loading...</p>}
					</div>
				</div>

				<div className="card-front">
					<Image className='logo' src='/src/assets/icons/logo.png' />
					<p className='logo-text'>Curious Conversations</p>
				</div>
			</div>
			{/* Only render the next question button if there are questions to display */}
			{questions.length > 0 && !showFront && (
				<>
					<button className={`prev-btn ${!showFront ? 'show' : ''}`} onClick={handlePrevQuestion}>
						<FontAwesomeIcon icon={faBackward}/>
					</button><button className={`next-btn ${!showFront ? 'show' : ''}`} onClick={handleNextQuestion}>
						<FontAwesomeIcon icon={faForward} />
					</button>
				</>
			)}
		</>
	);
}

export default QuestionList;
