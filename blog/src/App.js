import React, { useContext, useState } from 'react';
import '../src/styles/style.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserRoutes from './routes/userRoutes';
import AdminRoutes from './routes/adminRoutes';
// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './utils/authContext';
/*import ProtectedRoute from './routes/protectedRoute';
import Dashboard from './pages/admin/home/Dashboard';
import ArticlePage from './pages/admin/articles/ArticlePage';*/

// Composant principal App
function App() {
  const { isAuthenticated, isAdminAuthenticated } = useContext(AuthContext)
  // Vérifiez l'état d'authentification de l'utilisateur et son rôle


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;