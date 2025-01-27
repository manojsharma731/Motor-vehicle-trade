import React, { useState } from 'react';
import './VehicleForm.css'; // Create a separate CSS file for styling

const VehicleForm = () => {
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    quantity: '', // Add quantity property
    papers: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setVehicleData({ ...vehicleData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Vehicle Data Submitted:', vehicleData);
    // Add form submission logic here
  };

  return (
    <div className="vehicle-form-container">
      <h1 className="form-title">Upload Your Vehicle Information</h1>
      <p className="form-subtitle">Fill in the details and upload an image of your vehicle</p>
      
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Make:</label>
          <input
            type="text"
            name="make"
            value={vehicleData.make}
            onChange={handleChange}
            placeholder="e.g., Toyota"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={vehicleData.model}
            onChange={handleChange}
            placeholder="e.g., Corolla"
            required
          />
        </div>

        <div className="form-group">
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={vehicleData.year}
            onChange={handleChange}
            placeholder="e.g., 2020"
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity:</label> {/* New quantity input */}
          <input
            type="number"
            name="quantity"
            value={vehicleData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="1" // Set a minimum quantity of 1
            required
          />
        </div>

        <div className="form-group">
          <label>Has All Valid Papers:</label>
          <input
            type="checkbox"
            name="papers"
            checked={vehicleData.papers}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Upload Vehicle Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default VehicleForm;
