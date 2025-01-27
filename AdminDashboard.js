import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('salesperson');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/add-${userType}`, {
        name,
        phone,
        email,
      });

      alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} added successfully!`);
      setName('');
      setPhone('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('There was an error adding the user.');
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Add {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name} placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone No</label>
          <input
            type="text"
            value={phone} placeholder='Enter the phone no.'
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email} placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>User Type</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="salesperson">Salesperson</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add</button>
      </form>
    </div>
  );
}

export default AdminDashboard;
