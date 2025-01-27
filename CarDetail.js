import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CarDetail.css'; // Import the CSS file for styling

// Example vehicle data
const vehicles = [
  {
    VehicleID: 1,
    Model: 'Rolls Royce',
    Make: 'Phantom',
    Year: 2023,
    Color: 'Red',
    Price: '$79,990',
    Quantity: 5,
    imageUrl: '../picture/car1.jpg', // Add your image path
  },
  {
    VehicleID: 2,
    Model: 'Corvette',
    Make: 'Cobra',
    Year: 2022,
    Color: 'Blue',
    Price: '$55,300',
    Quantity: 3,
    imageUrl: '../picture/car2.jpg', // Add your image path
  },
  {
    VehicleID: 3,
    Model: 'Mercedes',
    Make: 'SLS AMG',
    Year: 2021,
    Color: 'White',
    Price: '$65,000',
    Quantity: 7,
    imageUrl: '../picture/car3.jpg', // Add your image path
  }
  // Add more vehicle objects here
];

function completeAlert() {
  alert("Added Successfully");
}

const CarDetail = ({ addToCart }) => {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.VehicleID === parseInt(id));
  const [purchaseQuantity, setPurchaseQuantity] = useState(1); // Quantity input state

  if (!vehicle) {
    return <div className="error-message">Vehicle not found!</div>;
  }

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Math.min(event.target.value, vehicle.Quantity));
    setPurchaseQuantity(value);
  };

  const handleAddToCart = () => {
    const selectedVehicle = { ...vehicle, purchaseQuantity };
    addToCart(selectedVehicle);
    completeAlert();
  };

  return (
    <div className="car-detail">
      <div className="car-image">
        <img src={vehicle.imageUrl} alt={vehicle.Model} />
      </div>
      <div className="car-info">
        <h2>{vehicle.Model}</h2>
        <p><strong>Make:</strong> {vehicle.Make}</p>
        <p><strong>Year:</strong> {vehicle.Year}</p>
        <p><strong>Color:</strong> {vehicle.Color}</p>
        <p><strong>Price:</strong> {vehicle.Price}</p>
        <p><strong>Available Quantity:</strong> {vehicle.Quantity}</p>

        <div className="quantity-input">
          <label>Quantity: </label>
          <input
            type="number"
            min="1"
            max={vehicle.Quantity}
            value={purchaseQuantity}
            onChange={handleQuantityChange}
          />
        </div>

        <div className="button-container">
          <button className="btn3" onClick={handleAddToCart}>Add to Cart</button>
          <Link to="/cart" className="btn3">Go to Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
