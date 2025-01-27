import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isLoggedIn, userType, requiredUserType }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (userType && userType !== requiredUserType) {
    return <Navigate to="/" />;
  }
  return element;
};

export default PrivateRoute;
