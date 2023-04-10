import { useEffect, useState, useCallback } from 'react';
import '../assets/scss/App.scss';
import QuestionList from './QuestionList';
import {CSSTransition} from 'react-transition-group';
import useUserLikedQuestions from '../hooks/useUserLikedQuestions';

function FlippableCard({selectedCategory, showWelcomeMessage}) {
	const [showFront, setShowFront] = useState(true);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const toggleShowFront = useCallback(() => { setShowFront((v) => !v) }, [setShowFront])
	const { likedQuestions } = useUserLikedQuestions();

	useEffect(() => {
		setCurrentQuestion(0);
	}, [selectedCategory]);

	return(
		!showWelcomeMessage && (
			<div className="FlippableCard-container">
				<CSSTransition
					in={showFront}
					timeout={400}
					classNames='flip'
				>
					<QuestionList 
						onClick={toggleShowFront}
						selectedCategory={selectedCategory}
						showFront={showFront}
						likedQuestions={likedQuestions}/>
				</CSSTransition>
			</div>
		)
	);
}

export default FlippableCard;
