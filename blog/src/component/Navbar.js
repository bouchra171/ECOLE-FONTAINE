import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import '../styles/navbar.css'
import { AuthContext } from '../utils/authContext';
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";


const navData = [
  {
    name: "Home", path: "/"
  },
  {
    name: "Article", path: "/article"
  },
  {
    name: "Objectif", path: "/objectif"
  },
  {
    name: "Apropos", path: "/apropos"
  }
];

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { user, logout, } = useContext(AuthContext)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };  
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };  

  

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté

    if (user !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  //console.log('isauth', isLoggedIn)



  return (
    <nav className='bg-dark navbare '>
      <div className='d-flex'>

        <Link className=' text-decoration-none' to="/" onClick={handleMenuClose}>
          <h2>Ecole-Fontaine</h2>
        </Link>
        {/* <button type="button" onClick={toggleMobileMenu} >  Toggle Mobile Menu</button> */}
      </div>
      <div className='nave-link'>
        {navData.map((nav, index) => (
          <li key={index}>
            <Link onClick={handleMenuClose}
              className={`link${location.pathname === nav.path ? ' active' : ''}`}
              to={nav.path}
            >
              {nav.name}
            </Link>
          </li>
        ))}

      </div>
      {/* Le Menu sur mobile */}
      {
        isMenuOpen &&<div className='nave-link-mobile bg-dark'>
        <div className='nave-login-mobile'>
          {
            isLoggedIn ? (
              <><li className='d-flex gap-3 align-items-center'>
                <Link onClick={handleMenuClose} to="/profil">
                  <img src='/img/profil.png'
                    className='user-image'
                  />
                </Link>

                <FaSignOutAlt onClick={() => logout(navigate)} size={35} className="icon-nav action-icon" color="tomato" />
              </li>
                {
                  user?.role === 'Admin' && (
                    <Link onClick={handleMenuClose} className='btn-login text-decoration-none' to="/admin">
                      Admin
                    </Link>)
                }

              </>
            ) : (
              <li className='d-flex justify-content-center align-items-center gap-3'>

                <Link onClick={handleMenuClose} className='btn-login' to="/login">
                  Connexion
                </Link>
                <Link onClick={handleMenuClose} className='btn-register' to="/register">
                  S'inscrire
                </Link>
              </li>
            )
          }


        </div>
        {navData.map((nav, index) => (
          <li key={index}>
            <Link onClick={handleMenuClose}
              className={`link${location.pathname === nav.path ? ' active' : ''}`}
              to={nav.path}
            >
              {nav.name}
            </Link>
          </li>
        ))}

      </div>
      }
      
      {/* Fin du Menu sur mobile */}
      <div className='nave-login'>
        {
          isLoggedIn ? (
            <><li className=' d-flex gap-3 align-items-center '>
              <Link to="/profil">
                <img src='/img/profil.png'
                  className='user-image'
                />
              </Link>

              <FaSignOutAlt onClick={() => logout(navigate)} size={35} className="icon-nav action-icon" color="tomato" />
            </li>
              {
                user?.role === 'Admin' && (
                  <Link className='btn-login' to="/admin">
                    Admin
                  </Link>)
              }

            </>
          ) : (
            <li className='d-flex justify-content-center align-items-center gap-3'>

              <Link className='btn-login  text-decoration-none' to="/login">
                Connexion
              </Link>
              <Link className='btn-register  text-decoration-none' to="/register">
                S'inscrire
              </Link>
            </li>
          )
        }


      </div>
      <div className='toggle-menu'>
        {isMenuOpen ? (
          <FaTimes size={30} color='white' onClick={handleMenuToggle} />
        ) : (
          <FaBars size={30} color='white' onClick={handleMenuToggle} />
        )}
      </div>

    </nav>
  );
};

export default Navbar;
