import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './component/NavbarComponent';
import HeroSection from './component/HeroSection';
import FeaturesSection from './component/FeaturesSection';
import FooterComponent from './component/FooterComponent';
import Login from './component/Login';
import Signup from './component/Signup';
import VehicleCard from './component/VehicleCard';
import VehicleForm from './component/VehicleForm';
import ContactInfo from './component/ContactInfo';
import Payment from './component/Payment';
import Cart from './component/Cart';
import CarDetail from './component/CarDetail';
import MainLayout from './component/MainLayout';
import AdminDashboard from './component/AdminDashboard';
import SalesDashboard from './component/SalesDashboard';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [customerOrders, setCustomerOrders] = useState([]);

  // Add item to the cart with quantity control
  const addToCart = (car) => {
    setCart((prevCart) => {
      const existingCarIndex = prevCart.findIndex(item => item.VehicleID === car.VehicleID);
      if (existingCarIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingCarIndex].purchaseQuantity += car.purchaseQuantity;
        return updatedCart;
      }
      return [...prevCart, car];
    });
  };

  // Fetch customer orders if userType is salesperson
  useEffect(() => {
    if (userType === 'salesperson') {
      axios.get('http://localhost:5000/customer-orders')
        .then(response => setCustomerOrders(response.data))
        .catch(error => console.error("Error fetching customer orders:", error));
    }
  }, [userType]);

  return (
    <Router>
      <NavbarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FeaturesSection />
            </>
          }
        />
        <Route path="/buy" element={<VehicleCard addToCart={addToCart} />} />
        <Route path="/contact" element={<ContactInfo />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/sales-dashboard" element={<SalesDashboard customerOrders={customerOrders} />} />
        <Route path="/profile" element={<MainLayout/>} />
        <Route path="/sell" element={<VehicleForm />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/car/:id" element={<CarDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
