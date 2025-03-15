// File: components/ItemList.js
import React from 'react';
import { FaLeaf } from 'react-icons/fa';

function ItemList({ items, addToCart }) {
  if (!items || items.length === 0) {
    return <div className="no-items">No items available</div>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          <div className="item-info">
            {item.veg && <FaLeaf className="veg-icon" />}
            <h3>{item.name}</h3>
            <p className="item-calories">{item.calories} kcal</p>
            <p className="item-price">₹{item.price}</p>
            {item.description && <p className="item-desc">{item.description}</p>}
          </div>
          <div className="item-action">
            <img src={item.image} alt={item.name} className="item-image" />
            <button className="add-btn" onClick={() => addToCart(item)}>ADD</button>
          </div>
        </div>
      ))}
    </div>
  );
}
