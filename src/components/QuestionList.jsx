import React, { useState } from 'react';
import '../assets/scss/App.scss'
import useQuestions from '../hooks/useQuestions';
import useHandleLikes from '../hooks/useHandleLikes';
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../contexts/AuthContext';


const QuestionList = ({onClick, selectedCategory, showFront}) => {
	const { currentUser } = useAuthContext();
	const { likeQuestion, unlikeQuestion } = useHandleLikes();
	const [isLiked, setIsLiked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { 
		questions,
		currentQuestion,
		handleNextQuestion,
		handlePrevQuestion, 
	} = useQuestions(selectedCategory);

	// Filter the questions array to only include the ones that match the selected category
	const filteredQuestions = questions.filter(question => question.category === selectedCategory);
	
	// CODE DOES NOT WORK YET
	const handleLikeClick = async () => {
		if (!currentUser) {
			alert('Please login to like or unlike a question.');
			return;
		}
		if (!filteredQuestions[currentQuestion]) {
			return;
		}
		setIsLoading(true);
		const questionId = filteredQuestions[currentQuestion].id;
		if (isLiked) {
			await unlikeQuestion(questionId);
			setIsLiked(false);
		} else {
			await likeQuestion(questionId);
			setIsLiked(true);
		}
		setIsLoading(false);
	};

	return (
		<>
			<div className="q-card" onClick={onClick}>
				<div className="card-back">
					<div className="questions">
						{/* If there is a question for the current index, show it, otherwise show a loading message */}
						<p className='questions-title'>{selectedCategory}</p>
					{filteredQuestions[currentQuestion] ? <p>{filteredQuestions[currentQuestion].text}</p> : <p>Loading...</p>}
					</div>
				</div>

				<div className="card-front">
					<Image className='logo' src='/assets/icons/logo.png' />
					<p className='logo-text'>Curious Conversations</p>
					<p className='logo-click'>Click Me</p>
				</div>
			</div>
			{/* Only render the next question button if there are questions to display */}
			{!showFront && (
				<>
					{currentQuestion !== 0 && (
						<button className={`prev-btn ${!showFront ? 'show' : ''}`} 
							onClick={handlePrevQuestion}>
							<FontAwesomeIcon icon={faBackward}/>
						</button>
					)}

					{questions.length > 0 && (
						<button className={`next-btn ${!showFront ? 'show' : ''}`} 
							onClick={handleNextQuestion}>
							<FontAwesomeIcon icon={faForward} />
						</button>
					)}
					{/* Code does not work yet */}
					<button className='like-btn' onClick={handleLikeClick}> 
						{isLoading ? "Loading..." : isLiked ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartBroken} />}
					</button>
				</>
			)}
		</>
	);
}

export default QuestionList;
