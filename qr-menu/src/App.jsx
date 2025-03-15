// File: App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import './App.css';

// Components
import Header from './assets/components/Header/header';
import MenuSidebar from './assets/components/Menusidebar/Menusidebar'; 
import ItemList from './assets/components/ItemList/ItemList';
import Cart from './assets/components/Cart/Cart';
import QRScanner from './assets/components/QRScanner/Qrscanner';

function App() {
  const [restaurant, setRestaurant] = useState({
    name: "Food Corner",
    location: "Sample Location",
    logo: "/logo.png"
  });
  
  const [menuCategories, setMenuCategories] = useState([
    "Chai", "Iced Tea", "Chillers", "Coffee", "Milk", 
    "Milk Shakes", "Wraps", "Snacks", "Desi Nasta", "Instant Nasta"
  ]);
  
  const [menuItems, setMenuItems] = useState({
    "Chai": [
      { id: 1, name: "Classic Chai", price: 60, calories: 110, veg: true, image: "/chai1.jpg" },
      { id: 2, name: "Black Tea", price: 55, calories: 0, veg: true, image: "/chai2.jpg" },
      { id: 3, name: "Green Tea", price: 70, calories: 10, veg: true, image: "/chai3.jpg" },
      { id: 4, name: "Healthy Tea", price: 75, calories: 40, veg: true, image: "/chai4.jpg", description: "Green tea with honey and lime" }
    ],
    "Coffee": [
      { id: 5, name: "Black Coffee", price: 80, calories: 5, veg: true, image: "/coffee1.jpg" },
      { id: 6, name: "Cappuccino", price: 120, calories: 120, veg: true, image: "/coffee2.jpg" }
    ]
    // Other categories would be populated similarly
  });
  
  const [selectedCategory, setSelectedCategory] = useState("Chai");
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("123 Main St, City");
  const [vegOnly, setVegOnly] = useState(false);
  
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? {...cartItem, quantity: cartItem.quantity + 1} 
          : cartItem
      ));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };
  
  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    } else {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? {...cartItem, quantity: cartItem.quantity - 1} 
          : cartItem
      ));
    }
  };
  
  const handleQRScan = (data) => {
    if (data) {
      try {
        const restaurantData = JSON.parse(data);
        setRestaurant(restaurantData.restaurant);
        setMenuCategories(restaurantData.categories);
        setMenuItems(restaurantData.items);
      } catch (error) {
        console.error("Invalid QR code data", error);
      }
    }
  };
  
  const filteredItems = vegOnly 
    ? menuItems[selectedCategory]?.filter(item => item.veg) 
    : menuItems[selectedCategory];
  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/scan" element={<QRScanner onScan={handleQRScan} />} />
          <Route path="/" element={
            <>
              <Header 
                restaurant={restaurant} 
                vegOnly={vegOnly} 
                setVegOnly={setVegOnly} 
              />
              <div className="main-content">
                <MenuSidebar 
                  categories={menuCategories} 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
                <div className="right-content">
                  <div className="delivery-info">
                    <span>Delivery to: {deliveryAddress}</span>
                    <button className="change-btn">Change</button>
                  </div>
                  <h2>{selectedCategory}</h2>
                  <ItemList items={filteredItems} addToCart={addToCart} />
                </div>
              </div>
              {cart.length > 0 && <Cart cart={cart} removeFromCart={removeFromCart} />}
              <div className="scan-button">
                <Link to="/scan" className="qr-link">Scan QR Code</Link>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;