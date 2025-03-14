import React from 'react';
import './Cart.css'; // Ensure correct path

function Cart({ cart, removeFromCart, addToCart }) { // ✅ addToCart added
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>₹{item.price} x {item.quantity}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => removeFromCart(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item)}>+</button> {/* ✅ Now it works */}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: ₹{total}</h3>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}

export default Cart; // ✅ Ensure default export
