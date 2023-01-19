import { useEffect } from 'react';
import '../assets/scss/App.scss';
import QuestionList from './QuestionList';
import {CSSTransition} from 'react-transition-group';
import {useState, useCallback} from 'react';

function FlippableCard({selectedCategory}) {
	const [showFront, setShowFront] = useState(true);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const toggleShowFront = useCallback(() => { setShowFront((v) => !v) }, [setShowFront])

	useEffect(() => {
		setCurrentQuestion(0);
	}, [selectedCategory]);

	return(
		<div className="FlippableCard-container">
			<CSSTransition
				in={showFront}
				timeout={300}
				classNames='flip'
			>
				<QuestionList onClick={toggleShowFront} selectedCategory={selectedCategory} />
			</CSSTransition>
		</div>
	);
}

export default FlippableCard;
