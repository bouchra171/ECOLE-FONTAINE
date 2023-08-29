import React, { createContext, useState, useEffect } from 'react';
import { getAllArticles, getAllArticlesWidthComments } from '../services/admin/articleService';
import { getAllRoles } from '../services/admin/rolesService';
import { getAllUsers } from '../services/admin/userService';
import { getAllCategories } from '../services/admin/categoryService';
import { getAllComments } from '../services/admin/commentService';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [messageNotification, setMessageNotification] = useState(null);
  // Données des utilisateurs
  const [users, setUsers] = useState([]);

  // Données des rôles
  const [roles, setRoles] = useState([]);

  // Données des catégories
  const [categories, setCategories] = useState([]);

  // Données des articles
  const [articles, setArticles] = useState([]);

  // Données des commentaires
  const [commentsArticles, setCommentsArticles] = useState([]);
  const [comments, setComments] = useState([]);

  // Fonction pour récupérer les données des utilisateurs depuis le serveur
  const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
  };


  // Fonction pour récupérer les données des rôles depuis le serveur
  const fetchRoles = async () => {
       const data = await getAllRoles();
      setRoles(data);
  };

  // Fonction pour récupérer les données des catégories depuis le serveur
  const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
  };

  // Fonction pour récupérer les données des articles depuis le serveur
  const fetchArticles = async () => {
       const data = await getAllArticles();
      setArticles(data);
  };

  // Fonction pour récupérer les données des commentaires depuis le serveur
  const fetchAllArticlesComments = async () => {
       const data = await getAllArticlesWidthComments();
      setCommentsArticles(data);
  };
  const fetchComments = async () => {
       const data = await getAllComments();
      setComments(data);
  };

  // Appeler les fonctions de récupération des données au chargement du composant
  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchCategories();
    fetchArticles();
    fetchComments();
    fetchAllArticlesComments();

    const timeout = setTimeout(() => {
      setMessageNotification('');
    }, 4000);

    return () => clearTimeout(timeout);
  
  }, [messageNotification]);

  return (
    <AdminContext.Provider
      value={{ users, roles, categories, articles,comments, commentsArticles ,messageNotification, setMessageNotification}}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
