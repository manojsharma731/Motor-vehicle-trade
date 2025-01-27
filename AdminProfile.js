// AdminProfile.js
import React from 'react';
import './AdminProfile.css';

const AdminProfile = (props) => {
    return (
        <div className="admin-profile">
            <img src="https://via.placeholder.com/150" alt="Admin" className="admin-avatar"/>
            <h2>{props.name}</h2>
            <p>{props.email}</p>
        </div>
    );
};

export default AdminProfile;