import React from "react";
import '../styles/footer.css'
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li>
            <Link to="Apropos">À propos</Link>
          </li>
          <li>
            <Link to="#services">Services</Link>
          </li>
          <li>
            <Link to="Contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="social-icons">
        <a href="#" className="social-icon">
          <FaFacebookF />
        </a>
        <a href="#" className="social-icon">
          <FaTwitter />
        </a>
        <a href="#" className="social-icon">
          <FaInstagram />
        </a>
      </div>
      <p>Tous droits réservés à la fontaine</p>
    </footer>
  );
};

export default Footer;
