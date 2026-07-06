import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ allowedRoles = [] }) {
  const {
    isAuthenticated,
    user,
    sessionExpired,
  } = useSelector((state) => state.auth);

  const location = useLocation();

  // Session expired
  if (sessionExpired) {
    return <Navigate to="/session-expired" replace />;
  }

  // User not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // User object missing
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based authorization
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;