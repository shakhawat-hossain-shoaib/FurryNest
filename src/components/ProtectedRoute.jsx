import React from "react";
import { Navigate } from "react-router-dom";

// Simple protected route that checks localStorage for 'isLoggedIn'
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
