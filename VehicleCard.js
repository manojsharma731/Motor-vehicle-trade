import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './VehicleCard.css'; // Create a separate CSS file for styling.
const VehicleCard = () => {
  const vehicleData = [
    {
      id: 1, // Unique ID for each vehicle
      title: "Rolls Royce",
      description: "Easily list your vehicle for sale with detailed information and photos.",
      imageUrl: "../picture/car1.jpg" // Replace with a real image URL
    },
    {
      id: 2,
      title: "Corvette",
      description: "Easily list your vehicle for sale with detailed information and photos.",
      imageUrl: "../picture/car2.jpg" // Replace with a real image URL
    },
    {
      id: 3,
      title: "Mercedes",
      description: "Easily list your vehicle for sale with detailed information and photos.",
      imageUrl: "../picture/car3.jpg" // Replace with a real image URL
    },
    {
      id: 4,
      title: "BMW M3",
      description: "Easily list your vehicle for sale with detailed information and photos.",
      imageUrl: "../picture/car4.jpg" // Replace with a real image URL
    },
    // Add more vehicle objects as needed
  ];

  return (
    <div className="vehicle-card-container">
      <div className="card-wrapper">
        {vehicleData.map((vehicle) => (
          <div key={vehicle.id} className="card">
            <div className="card-image">
              <img src={vehicle.imageUrl} alt={vehicle.title} />
            </div>
            <div className="card-content">
              <h3>{vehicle.title}</h3>
              <p>{vehicle.description}</p>
              {/* Buy Now Button */}
              <Link to={`/car/${vehicle.id}`} className="btn">Buy Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCard;