import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, userType, requiredUserType }) => {
  return userType === requiredUserType ? element : <Navigate to="/" />;
};

export default PrivateRoute;