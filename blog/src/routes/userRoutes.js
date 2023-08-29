import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Apropos from "../pages/Apropos";
import Footer from "../component/Footer";
import Articles from "../pages/Article";
import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";
import Objectif from "../pages/Objectif";
import Contact from "../pages/Contact";
import ArticleDetail from "../pages/ArticleDetail";
import Navbar from "../component/Navbar";
import ProfilePage from "../pages/auth/ProfilPage";

const UserRoutes = () => {
  return (
    <>
      <Navbar /> {/* Barre de navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/objectif" element={<Objectif />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer /> {/* Pied de page */}
    </>
  );
};

export default UserRoutes;
