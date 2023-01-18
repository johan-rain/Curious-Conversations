import '../assets/scss/App.scss';
import QuestionList from './QuestionList';
import {CSSTransition} from 'react-transition-group';
import {useState, useCallback} from 'react';

function FlippableCard() {
	const [showFront, setShowFront] = useState(true);
	const toggleShowFront = useCallback(() => { setShowFront((v) => !v) }, [setShowFront])

	return(
		<div className="flippable-card-container">
			<CSSTransition
				in={showFront}
				timeout={300}
				classNames='flip'
			>
				<QuestionList onClick={toggleShowFront}/>
			</CSSTransition>
		</div>
	);
}

export default FlippableCard;