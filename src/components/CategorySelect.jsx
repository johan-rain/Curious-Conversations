import React, { useState } from 'react';
import useCategories from '../hooks/useCategories';

function CategorySelect({ onSelect }) {
	const { categories } = useCategories();
	const [selectedCategory, setSelectedCategory] = useState();

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		onSelect(category);
	}

	return (
		<div className="category-buttons">
			{categories.map(category => (
				<button className='mb-4' key={category} onClick={() => handleCategorySelect(category)}>
					{category}
				</button>
			))}
		</div>
	);
}

export default CategorySelect;
