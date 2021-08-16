import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../../contexts/AuthContext";
import AuthActions from "../../../services/AuthActions";
import Identification from "../../identification/Identification";

const MobileNavMenu = ({ strings }) => {

  const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogout = () => {
    AuthActions.logout()
               .then(response => {
                   setIsAuthenticated(false);
                   setCurrentUser(AuthActions.getCurrentUser());
               });
  }

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/shop"}>{strings["shop"]}</Link>
        </li>
        { isAuthenticated && 
          <>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>{strings["my_account"]}</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-orders"}>{strings["my_orders"]}</Link>
            </li>
          </>
        }
        <li>
          <Link to={process.env.PUBLIC_URL + "/articles"}>{strings["blog"]}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>{strings["about_us"]}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>{strings["contact_us"]}</Link>
        </li>
        <li>
            { !isAuthenticated ? <Identification name={ strings["login"] }/> : 
              <a className="nav-link" href="#" onClick={ handleLogout }>{strings["logout"]}</a>
            }
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);
