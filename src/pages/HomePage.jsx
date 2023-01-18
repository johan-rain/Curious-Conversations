import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import FlippableCard from '../components/FlippableCard';
import CategorySelect from '../components/CategorySelect';

const HomePage = () => {
	const [selectedCategory, setSelectedCategory] = useState();

	return (
		<Container fluid className='home'>
			<CategorySelect onSelect={setSelectedCategory} />
			<FlippableCard selectedCategory={selectedCategory} />
		</Container>
	);
}

export default HomePage;
