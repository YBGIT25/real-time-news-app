import React, { useState } from 'react';

const Dropdown = ({ categories, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);  // Call the parent function to pass the selected category
  };

  return (
    <select value={selectedCategory} onChange={handleChange}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
