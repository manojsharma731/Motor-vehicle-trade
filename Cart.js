// src/component/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart }) => {
  // Function to convert price string to a number
  const parsePrice = (priceString) => {
    // Remove the dollar sign and commas, then convert to a float
    return parseFloat(priceString.replace(/[$,]/g, ''));
  };

  // Calculate the grand total by summing the total for each item (quantity * price)
  const grandTotal = cart.reduce((sum, item) => {
    const itemTotal = parsePrice(item.Price) * item.purchaseQuantity;
    return sum + itemTotal;
  }, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">No items in the cart.</p>
      ) : (
        <ul className="cart-items">
          {cart.map((car, index) => (
            <li key={index} className="cart-item">
              <img src={car.imageUrl} alt={car.Model} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{car.Model}</h3>
                <p><strong>Price per unit:</strong> ${car.Price}</p>
                <p><strong>Quantity:</strong> {car.purchaseQuantity}</p>
                <p><strong>Total:</strong> ${parsePrice(car.Price) * car.purchaseQuantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Grand Total: ${grandTotal.toFixed(2)}</h3> {/* Format to two decimal places */}
        </div>
      )}
      <Link to="/payment" className="btn">Proceed to Payment</Link>
    </div>
  );
};

export default Cart;
