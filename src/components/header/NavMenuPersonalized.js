import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";
import AuthActions from "../../services/AuthActions";
import Identification from "../identification/Identification";

const NavMenuPersonalized = ({ strings, menuWhiteClass, sidebarMenu }) => {

  const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogout = () => {
    AuthActions.logout()
               .then(response => {
                   setIsAuthenticated(false);
                   setCurrentUser(AuthActions.getCurrentUser());
               });
  }

  return (
    <div className={`${sidebarMenu ? "sidebar-menu" : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`} `}>
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["home"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop"}>
              {strings["shop"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/my-account"}>
              {strings["my_account"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
              {strings["blog"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/about"}>
              {strings["about_us"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {strings["contact_us"]}
            </Link>
          </li>
          <li>
              { !isAuthenticated ? <Identification name={ strings["login"] }/> : 
                <a className="nav-link" href="#" onClick={ handleLogout }>{strings["logout"]}</a>
              }
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenuPersonalized.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(NavMenuPersonalized);
