import React from "react";
import "../../../styles/dashbord/sidebars.css";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaUserCog, FaListAlt, FaTags, FaComment } from "react-icons/fa";

const SidebarsPage = () => {
  const location = useLocation();

  return (
    <div className="bg-dark sidebare-container" >
      <div className="bg-dark sidebar-content"  >
        <Link to={'/admin'} className="logo text-decoration-none d-flex flex-column justify-content-center">
          <h2 className="text-center text-white">Ecole-Fontaine</h2>
        </Link>
        <nav className="d-flex flex-column ">
          <ul className="d-flex flex-column gap-2 ">
            <li className={`nav-link   ${location.pathname.includes("/admin/users") ? "active" : ""}`}>
              <Link className={`link ${location.pathname.includes("/admin/users") ? "active" : ""}`} to="/admin/users">
                <FaUser size={25} className="icon-nav" color={location.pathname.includes("/admin/users") ? "tomato" : "white"} /> Utilisateurs
              </Link>
            </li>
            <li className={`nav-link ${location.pathname.includes("/admin/roles") ? "active" : ""}`}>
              <Link className={`link ${location.pathname.includes("/admin/roles") ? "active" : ""}`} to="/admin/roles">
                <FaUserCog size={25} className="icon-nav" color={location.pathname.includes("/admin/roles") ? "tomato" : "white"} /> Rôles
              </Link>
            </li>
            <li className={`nav-link ${location.pathname.includes("/admin/category") ? "active" : ""}`}>
              <Link className={`link ${location.pathname.includes("/admin/category") ? "active" : ""}`} to="/admin/category">
                <FaListAlt size={25} className="icon-nav active" color={location.pathname.includes("/admin/category") ? "tomato" : "white"} /> Catégories
              </Link>
            </li>
            <li className={`nav-link ${location.pathname.includes("/admin/articles") ? "active" : ""}`}>
              <Link className={`link ${location.pathname.includes("/admin/articles") ? "active" : ""}`} to="/admin/articles">
                <FaTags size={25} className="icon-nav" color={location.pathname.includes("/admin/articles") ? "tomato" : "white"} /> Articles
              </Link>
            </li>
            <li className={`nav-link ${location.pathname.includes("/admin/comments") ? "active" : ""}`}>
              <Link className={`link ${location.pathname.includes("/admin/comments") ? "active" : ""}`} to="/admin/comments">
                <FaComment size={25} className="icon-nav" color={location.pathname.includes("/admin/comments") ? "tomato" : "white"} /> Commentaires
              </Link>
            </li>
          </ul>
        </nav>


      </div>
      <div className="d-flex mb-2 flex-column align-items-center justify-content-center h-100" >
        <Link to={'/'} className="text-primary ">Blog</Link>
     
        <span className="text-secondary ">&copy; 2023 - 2024.</span>
      </div>
    </div>
  );
};

export default SidebarsPage;
