import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  ...rest
}) => {
  const isAdmin = true; // Simuler l'état d'administrateur

  return isAdmin ? (
    <Route {...rest} /> // Rendre la route si l'utilisateur est un administrateur
  ) : (
    <Navigate to="/login" replace /> // Rediriger vers la page de connexion si l'utilisateur n'est pas un administrateur
  );
};

export default ProtectedRoute;
