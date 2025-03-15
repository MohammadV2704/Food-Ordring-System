// File: components/Header.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Menusidebar from '../Menusidebar/Menusidebar';

const Header = ({ restaurant, vegOnly, setVegOnly }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={restaurant.logo} alt={restaurant.name} className="logo" />
        <div className="restaurant-info">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.location}</p>
        </div>
      </div>
      <div className="search-container">
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search for items..." />
        </div>
        <div className="veg-toggle">
          <span>Veg only</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={vegOnly} 
              onChange={() => setVegOnly(!vegOnly)} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;