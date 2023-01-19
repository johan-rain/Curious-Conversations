import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import FlippableCard from '../components/FlippableCard';
import CategorySelect from '../components/CategorySelect';

const HomePage = () => {
	const [selectedCategory, setSelectedCategory] = useState();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
	
	const handleCategoryChange = () => {
		setCurrentQuestion(0);
		setShowWelcomeMessage(false);
	}

	return (
		<Container fluid className='home'>
			{showWelcomeMessage && (
				<div className="welcome">
					<h1 className='welcome-title'>Welcome to Curious Conversations</h1>
					<p>This app is suppose to help you start up conversations with either strangers or the people closest to you.<br/> Chose a category and lets get started</p>
				</div>
			)}
			<CategorySelect onSelect={setSelectedCategory} onCategoryChange={handleCategoryChange}/>
			<FlippableCard selectedCategory={selectedCategory} showWelcomeMessage={showWelcomeMessage}/>
		</Container>
	);
}

export default HomePage;
