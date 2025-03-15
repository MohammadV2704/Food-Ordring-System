// File: QRGenerator.js
// This file is for restaurant owners to generate QR codes with their restaurant data

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

function QRGenerator() {
  const [restaurantData, setRestaurantData] = useState({
    restaurant: {
      name: "Example Restaurant",
      location: "123 Main St",
      logo: "/logo.png"
    },
    categories: ["Starters", "Main Course", "Desserts", "Beverages"],
    items: {
      "Starters": [
        { id: 1, name: "Veg Spring Rolls", price: 120, calories: 220, veg: true, image: "/rolls.jpg" },
        { id: 2, name: "Chicken Wings", price: 180, calories: 350, veg: false, image: "/wings.jpg" }
      ],
      "Main Course": [
        { id: 3, name: "Paneer Butter Masala", price: 220, calories: 450, veg: true, image: "/paneer.jpg" },
        { id: 4, name: "Chicken Biryani", price: 280, calories: 650, veg: false, image: "/biryani.jpg" }
      ]
      // Add more categories and items as needed
    }
  });
  
  const [qrValue, setQrValue] = useState("");
  
  // Update QR code value when restaurant data changes
  useEffect(() => {
    setQrValue(JSON.stringify(restaurantData));
  }, [restaurantData]);
  
  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      restaurant: {
        ...restaurantData.restaurant,
        [name]: value
      }
    });
  };
  
  const addCategory = () => {
    const category = prompt("Enter new category name:");
    if (category && !restaurantData.categories.includes(category)) {
      setRestaurantData({
        ...restaurantData,
        categories: [...restaurantData.categories, category],
        items: {
          ...restaurantData.items,
          [category]: []
        }
      });
    }
  };
  
  const addItem = (category) => {
    const newId = Math.max(0, ...Object.values(restaurantData.items).flat().map(item => item.id)) + 1;
    const newItem = {
      id: newId,
      name: "New Item",
      price: 100,
      calories: 200,
      veg: true,
      image: "/default.jpg"
    };
    
    setRestaurantData({
      ...restaurantData,
      items: {
        ...restaurantData.items,
        [category]: [...restaurantData.items[category], newItem]
      }
    });
  };
  
  const updateItem = (category, itemId, field, value) => {
    setRestaurantData({
      ...restaurantData,
      items: {
        ...restaurantData.items,
        [category]: restaurantData.items[category].map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        )
      }
    });
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("restaurant-qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${restaurantData.restaurant.name.replace(/\s+/g, '_')}_QR.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  
  return (
    <div className="qr-generator">
      <h1>Restaurant QR Code Generator</h1>
      
      <div className="form-section">
        <h2>Restaurant Information</h2>
        <div className="form-group">
          <label>Restaurant Name:</label>
          <input 
            type="text" 
            name="name" 
            value={restaurantData.restaurant.name} 
            onChange={handleRestaurantChange} 
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input 
            type="text" 
            name="location" 
            value={restaurantData.restaurant.location} 
            onChange={handleRestaurantChange} 
          />
        </div>
        <div className="form-group">
          <label>Logo URL:</label>
          <input 
            type="text" 
            name="logo" 
            value={restaurantData.restaurant.logo} 
            onChange={handleRestaurantChange} 
          />
        </div>
      </div>
      
      <div className="menu-section">
        <h2>Menu Categories</h2>
        <button className="add-btn" onClick={addCategory}>+ Add Category</button>
        
        {restaurantData.categories.map((category) => (
          <div key={category} className="category-section">
            <h3>{category}</h3>
            <button className="add-btn" onClick={() => addItem(category)}>+ Add Item</button>
            
            <table className="items-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Calories</th>
                  <th>Veg</th>
                  <th>Image URL</th>
                </tr>
              </thead>
              <tbody>
                {restaurantData.items[category]?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input 
                        type="text" 
                        value={item.name} 
                        onChange={(e) => updateItem(category, item.id, 'name', e.target.value)} 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={item.price} 
                        onChange={(e) => updateItem(category, item.id, 'price', Number(e.target.value))} 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={item.calories} 
                        onChange={(e) => updateItem(category, item.id, 'calories', Number(e.target.value))} 
                      />
                    </td>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={item.veg} 
                        onChange={(e) => updateItem(category, item.id, 'veg', e.target.checked)} 
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={item.image} 
                        onChange={(e) => updateItem(category, item.id, 'image', e.target.value)} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      
      <div className="qr-section">
        <h2>Generated QR Code</h2>
        <div className="qr-container">
          <QRCode 
            id="restaurant-qr-code"
            value={qrValue} 
            size={256} 
            level="H" 
            includeMargin={true} 
          />
        </div>
        <button className="download-btn" onClick={downloadQRCode}>
          Download QR Code
        </button>
        <p className="info-text">
          Scan this QR code with your restaurant app to load all menu data
        </p>
      </div>
    </div>
  );
}

export default QRGenerator;