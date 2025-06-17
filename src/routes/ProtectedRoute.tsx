import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../app/hooks/useAuth';

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
