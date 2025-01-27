import React from 'react';
import './SalesOrders.css';

const SalesOrders = ({ orders }) => {
  return (
    <div className="sales-orders">
      <h2>All Customer Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <span className="item-name">{order.itemName}</span>
            <span className="quantity">Quantity: {order.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesOrders;
