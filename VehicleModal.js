// VehicleModal.js
import React from 'react';
import './VehicleModal.css';

const VehicleModal = ({ vehicle, closeModal }) => {
    if (!vehicle) return null;
    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{vehicle.name}</h2>
                <p>Brand: {vehicle.brand}</p>
                <p>Model: {vehicle.model}</p>
                <p>Year: {vehicle.year}</p>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default VehicleModal;