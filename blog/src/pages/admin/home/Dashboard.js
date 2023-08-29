import React, { useContext } from "react";
import { FaUserCircle, FaSignOutAlt, } from "react-icons/fa";
import "../../../styles/dashbord/dashboard.css";
import { AdminContext } from "../../../utils/adminContext";
import { dateFormatter } from "../../../utils/dateFormatter";// Importation de l'utilitaire de formatage de date
import { AuthContext } from "../../../utils/authContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { users, roles, categories, articles, comments  } = useContext(AdminContext);// Accès aux données du Contexte Admin
  const { user, logout, } = useContext(AuthContext)// Accès aux données et méthodes du Contexte Auth
  const navigate = useNavigate()

    return (
    <div className="dashboard-container">
      <div 
        className=" bg-dark dashboard-header"
        >
        <div
          className="user-info" >
          <p className="text-white  mt-3">{user?.name}</p>
          <Link  to="/profil">

          <FaUserCircle size={35} className="icon-nav" color="white" />
          </Link>
        </div>
        <FaSignOutAlt onClick={()=>logout(navigate)} size={35} className="icon-nav logout-icon" />
      </div>

      <div className="d-flex flex-column gap-3 px-4">
        <div className="dashboard-stats">
          <div className=" dashboard-stat  user-count">
            <span>Utilisateurs</span>
            <span className="stat-value">{users?.length} enrégistrés</span>
          </div>
          <div className=" dashboard-stat role-count">
            <span>Roles</span>
            <span className="stat-value">{roles?.length} enrégistrés</span>
          </div>
          <div className=" dashboard-stat category-count">
            <span>Catégories</span>
            <span className="stat-value">{categories?.length} enrégistrés</span>
          </div>
          <div className=" dashboard-stat article-count">
            <span>Articles</span>
            <span className="stat-value">{articles?.length} enrégistrés</span>
          </div>
          <div className=" dashboard-stat comment-count">
            <span>Commentaires</span>
            <span className="stat-value">{comments?.length} enrégistrés</span>
          </div>
        </div>

        <div className="dashboard-articles">
          {
            articles && articles.map((article, index) =>{
              const formattedDate = dateFormatter(article.date);
               return (
              <div key={index} className="d-flex flex-lg-wrap gap-3 ">
                <div className="card article-card" >
                  <img  className="article-image" src={article.image_path ? article.image_path: "/img/photo1.jpg"} alt="Card image cap" />
                  <div className="card-body article-body">
                    <p className="article-title">{article.title}</p>
                    <div className="article-info">
                      <span className="article-category">{article.category_name}</span>
                      <span className="article-date">{formattedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            )})
          }


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
