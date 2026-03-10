import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const AdminRoute = ({ children }) => {
  const { loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
