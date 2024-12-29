import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTE_HOME } from '@routes/constants';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  role: string;
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({
  isAuthenticated,
  role,
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={ROUTE_HOME} />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={ROUTE_HOME} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
