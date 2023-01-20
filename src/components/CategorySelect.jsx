import React, { useState } from 'react';
import useCategories from '../hooks/useCategories';

function CategorySelect({ onSelect, onCategoryChange }) {
	const { categories } = useCategories();
	const [selectedCategory, setSelectedCategory] = useState();

	// handleCategorySelect function that updates the selected category
	// and calls the `onSelect` prop with the selected category
	const handleCategorySelect = (category) => {
		if (category !== selectedCategory) {
			onCategoryChange();
		}
		setSelectedCategory(selectedCategory === category ? null : category);
		onSelect(category);
	}
	// Render a list of buttons with each category as the text
	// and call the `handleCategorySelect` function when clicked
	return (
		<div className="category-buttons">
			{categories.map(category => (
				<button className={`category-btn ${category === selectedCategory ? 'selected' : ''}`} key={category} onClick={() => handleCategorySelect(category)}>
					{category}
				</button>
			))}
		</div>
	);
}

export default CategorySelect;
