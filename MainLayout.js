// MainLayout.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminProfile from './AdminProfile';
import Vehiclecardd from './Vehiclecardd';
import VehicleModal from './VehicleModal';
import './MainLayout.css';

const vehiclesData = [
    { id: 1, name: 'Car 1', brand: 'Toyota', model: 'Corolla', year: '2021', color: 'Blue', price: 20000 },
    { id: 2, name: 'Car 2', brand: 'Toyota', model: 'Camry', year: '2019', color: 'Red', price: 24000 },
    { id: 3, name: 'Car 3', brand: 'Honda', model: 'Civic', year: '2020', color: 'Black', price: 22000 },
    { id: 4, name: 'Car 4', brand: 'Honda', model: 'Accord', year: '2021', color: 'White', price: 25000 },
    { id: 5, name: 'Car 5', brand: 'Ford', model: 'Focus', year: '2022', color: 'Gray', price: 21000 },
    { id: 6, name: 'Car 6', brand: 'Ford', model: 'Mustang', year: '2020', color: 'Yellow', price: 30000 },
    { id: 7, name: 'Car 7', brand: 'Chevrolet', model: 'Malibu', year: '2019', color: 'Blue', price: 23000 },
    { id: 8, name: 'Car 8', brand: 'Chevrolet', model: 'Impala', year: '2021', color: 'Black', price: 27000 },
    { id: 9, name: 'Car 9', brand: 'Nissan', model: 'Altima', year: '2020', color: 'Silver', price: 24000 },
    { id: 10, name: 'Car 10', brand: 'Nissan', model: 'Maxima', year: '2022', color: 'Green', price: 26000 },
    { id: 11, name: 'Car 11', brand: 'Hyundai', model: 'Sonata', year: '2021', color: 'White', price: 22000 },
    { id: 12, name: 'Car 12', brand: 'Hyundai', model: 'Elantra', year: '2020', color: 'Gray', price: 21000 },
    { id: 13, name: 'Car 13', brand: 'Kia', model: 'Optima', year: '2022', color: 'Red', price: 23000 },
    { id: 14, name: 'Car 14', brand: 'Kia', model: 'Forte', year: '2021', color: 'Blue', price: 19000 },
    { id: 15, name: 'Car 15', brand: 'Volkswagen', model: 'Jetta', year: '2020', color: 'White', price: 20000 },
    { id: 16, name: 'Car 16', brand: 'Volkswagen', model: 'Passat', year: '2019', color: 'Black', price: 25000 },
    { id: 17, name: 'Car 17', brand: 'Subaru', model: 'Impreza', year: '2021', color: 'Green', price: 22000 },
    { id: 18, name: 'Car 18', brand: 'Subaru', model: 'Legacy', year: '2020', color: 'Silver', price: 24000 },
    { id: 19, name: 'Car 19', brand: 'Mazda', model: '3', year: '2019', color: 'Red', price: 21000 },
    { id: 20, name: 'Car 20', brand: 'Mazda', model: '6', year: '2021', color: 'Blue', price: 26000 },
    // Add more vehicle data here if needed
];

const MainLayout = () => {
    const location = useLocation();
    const { name, email } = location.state || { name: 'Manoj', email: 'manoj@gmail.com' };
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleCardClick = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    const closeModal = () => {
        setSelectedVehicle(null);
    };

    return (
        <div className="main-layout">
            <div className="left-panel">
                <AdminProfile name={name} email={email} />
            </div>
            <div className="right-panel">
                <h2>Motor Vehicle Inventory System</h2>
                <div className="vehicle-list">
                    {vehiclesData.map(vehicle => (
                        <Vehiclecardd key={vehicle.id} vehicle={vehicle} handleClick={handleCardClick} />
                    ))}
                </div>
            </div>
            {selectedVehicle && (
                <VehicleModal
                    vehicle={selectedVehicle}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default MainLayout;
