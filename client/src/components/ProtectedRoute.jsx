import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If they are logged in but don't have the right role, send them to their portal home
    const routeMap = {
      student: '/student',
      vendor: '/vendor',
      admin: '/admin'
    };
    return <Navigate to={routeMap[user.role] || '/'} replace />;
  }

  return children;
};

export default ProtectedRoute;
