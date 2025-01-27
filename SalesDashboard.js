import React from 'react';

const SalesDashboard = ({ customerOrders }) => {
  return (
    <div className="sales-dashboard">
      <h2>Sales Dashboard</h2>
      <ul>
        {customerOrders.map((order) => (
          <li key={order.id}>
            {order.itemName} - Quantity: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesDashboard;
