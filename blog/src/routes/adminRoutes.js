import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../pages/admin/home/Dashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import UserPage from "../pages/admin/users/UserPage";
import RolePage from "../pages/admin/roles/RolePage";
import CategoryPage from "../pages/admin/category/CategoryPage";
import ArticlePage from "../pages/admin/articles/ArticlePage";
import CommentPage from "../pages/admin/comments/CommentPage";
import CreateNewArticle from "../pages/admin/articles/CreateNewArticle";
import UpdateArticle from "../pages/admin/articles/UpdateArticle";
import ArticleDetail from "../pages/ArticleDetail";
import { AuthContext } from "../utils/authContext";
import { Spinner } from "react-bootstrap";


const AdminRoutes = () => {
  const {  isAdmin,isLoggedIn } = useContext(AuthContext);
 
 
  console.log('admin route isadmin:', isAdmin)
  console.log('admin route islogin:', isLoggedIn)

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simuler une tâche asynchrone de préparation du contexte
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  if (!isReady) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {/* Utilisation de l'indicateur Bootstrap */}
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      
      </div>
    );
  }




  return (
    <>
      {
        isLoggedIn ? (
          isAdmin ? (
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/roles" element={<RolePage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/articles" element={<ArticlePage />} />
                <Route path="/articles/new" element={<CreateNewArticle />} />
                <Route path="/articles/edit" element={<UpdateArticle />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/comments" element={<CommentPage />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
            </AdminLayout>
          ) : (
            <Navigate to='/' />
          )
        ) : (
          <Navigate to='/login' />
        )
      }
    </>

  );
};

export default AdminRoutes;

