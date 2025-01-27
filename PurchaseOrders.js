// src/component/PurchaseOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './PurchaseOrders.css'; // Import your CSS file for styling

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/purchase-orders');
      setPurchaseOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching purchase orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchPurchaseOrders();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Purchase Orders</h2>
      <button onClick={handleRefresh}>Refresh</button>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier ID</th>
            <th>Vehicle ID</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map(order => (
            <tr key={order.OrderId}>
              <td>{order.OrderId}</td>
              <td>{order.SupplierID}</td>
              <td>{order.VehicleID}</td>
              <td>{order.Quantity}</td>
              <td>{format(new Date(order.OrderDate), 'MM/dd/yyyy')}</td>
              <td>{format(new Date(order.DeliveryDate), 'MM/dd/yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrders;