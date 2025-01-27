import React from 'react';
import './VehicleCard.css'; // Import CSS for styling if needed

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="vehicle-card">
      <h3>{vehicle.name}</h3>
      <p>Brand: {vehicle.brand}</p>
      <p>Model: {vehicle.model}</p>
      <p>Year: {vehicle.year}</p>
      <p>Color: {vehicle.color}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Available Quantity: {vehicle.quantity}</p> {/* Display quantity as static text */}
    </div>
  );
};

export default VehicleCard;
