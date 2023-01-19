import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import FlippableCard from '../components/FlippableCard';
import CategorySelect from '../components/CategorySelect';

const HomePage = () => {
	const [selectedCategory, setSelectedCategory] = useState();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	
	const handleCategoryChange = () => {
		setCurrentQuestion(0);
	}

	return (
		<Container fluid className='home'>
			<CategorySelect onSelect={setSelectedCategory} onCategoryChange={handleCategoryChange}/>
			<FlippableCard selectedCategory={selectedCategory} />
		</Container>
	);
}

export default HomePage;
