import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isDiscordAuthenticated } from '../utils/auth';

const PrivateRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() || isDiscordAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
