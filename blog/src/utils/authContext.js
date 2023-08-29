import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Token décodé :', decoded);
        setIsLoggedIn(true);

        if (decoded?.user.role === 'Admin') {
          setIsAdmin(true);
        }

        setUser(decoded.user);

        // Vérifier l'expiration du token
        const currentTime = Date.now() / 1000; // Convertir en secondes
        if (decoded.exp < currentTime) {
          // Le token a expiré, déconnecter l'utilisateur
          logout();
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        // Gérer l'erreur de décodage du token
        // Par exemple, vous pouvez rediriger l'utilisateur vers la page de connexion
      }
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const authContextValue = {
    user,
    isAdmin,
    isLoggedIn,
    setIsAdmin,
    setIsLoggedIn,
    updateUser,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
