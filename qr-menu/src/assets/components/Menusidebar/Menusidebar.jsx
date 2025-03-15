import React from 'react';
import './MenuSidebar.css'; // Ensure correct path
function MenuSidebar({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul className="menu-categories">
        {categories.map((category, index) => (
          <li 
            key={index} 
            className={category === selectedCategory ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuSidebar; // ✅ Ensure default export
