import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  return sessionStorage.getItem('userAdmin') ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;