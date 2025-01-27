import React, { useState } from 'react';
import './Payment.css';

const Payment = ({ selectedCar }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handlePayment = () => {
    if (selectedMethod === "Credit/Debit Card" && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) {
      alert('Please enter complete card details.');
    } else if (selectedMethod) {
      alert(`Payment Successful with ${selectedMethod}!`);
      // Implement payment logic here
    } else {
      alert('Please select a payment method');
    }
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  return (
    <div className="payment">
      <h2>Payment</h2>
      
      <div className="payment-methods">
        <label>
          <input 
            type="radio" 
            value="Credit/Debit Card" 
            name="paymentMethod" 
            onChange={handleMethodChange}
          />
          <img src='./picture/credit-card.png' alt="Credit/Debit Card" className="payment-img" />
          Credit/Debit Card
        </label>

        {selectedMethod === 'Credit/Debit Card' && (
          <div className="card-details">
            <input
              type="text"
              placeholder="Card Number"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
              className="card-input"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleCardInputChange}
              className="card-input"
            />
            <input
              type="text"
              placeholder="CVV"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardInputChange}
              className="card-input"
            />
          </div>
        )}
        
        <label>
          <input 
            type="radio" 
            value="PayPal" 
            name="paymentMethod" 
            onChange={handleMethodChange}
          />
          <img src='./picture/paypal.png' alt="PayPal" className="payment-img" />
          PayPal
        </label>
        
        <label>
          <input 
            type="radio" 
            value="Mobile Payment" 
            name="paymentMethod" 
            onChange={handleMethodChange}
          />
          <img src='./picture/mobile-payment.png' alt="Mobile Payment" className="payment-img" />
          Mobile Payment (e.g., Google Pay, Apple Pay)
        </label>
      </div>
      
      <button className="btn2" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;