import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../../contexts/AuthContext";
import AuthActions from "../../../services/AuthActions";
import Identification from "../../identification/Identification";
import ReactCountryFlag from "react-country-flag";
import { useToasts } from "react-toast-notifications";
import { isDefined, isDefinedAndNotVoid } from "../../../helpers/utils";

const MobileNavMenu = ({ strings }) => {

  const { addToast } = useToasts();
  const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser, catalogs, selectedCatalog, setSelectedCatalog } = useContext(AuthContext);

  const handleLogout = () => {
    AuthActions.logout()
               .then(response => {
                   setIsAuthenticated(false);
                   setCurrentUser(AuthActions.getCurrentUser());
               });
  }

  const handleChangeCatalog = (e, id) => {
    const newCatalog = catalogs.find(c => c.id === parseInt(id));
    if (isDefined(newCatalog) && newCatalog.id !== selectedCatalog.id)
        setSelectedCatalog(newCatalog);
        addToast(<>{"Sélectionnez vos produits pour une livraison sur la "} <strong>{ newCatalog.name }</strong><ReactCountryFlag countryCode={newCatalog.code } style={{ verticalAlign: 'middle', marginLeft: '5px' }}/> </> , { appearance: "info", autoDismiss: true, autoDismissTimeout: 6000 });
  }

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
        </li>

        { !isDefinedAndNotVoid(catalogs) || catalogs.filter(c => c.isActive).length <= 1 ?
            <li>
              <Link to={process.env.PUBLIC_URL + "/shop"}>{strings["shop"]}</Link>
            </li>
          :
          <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/shop"} className="d-flex flex-row align-items-start">
                {strings["shop"]}
                <ReactCountryFlag countryCode={isDefined(selectedCatalog) ? selectedCatalog.code : "RE"} style={{ marginLeft: '1em', verticalAlign: 'top' }}/>
                {/* { sidebarMenu ? <span><i className="fa fa-angle-right"></i></span> : <i className="fa fa-angle-down" /> } */}
              </Link>
              <ul className="sub-menu">
                <li style={{ width: '100%' }}>
                  <ul>
                    { catalogs.filter(c => c.isActive).map((catalog, key) => {
                          return (
                            <li key={ key } style={{ width: '100%', marginBottom: '20px' }} className="d-flex flex-row align-items-start justify-content-start">
                                <Link to={process.env.PUBLIC_URL + "/shop"} onClick={ e => handleChangeCatalog(e, catalog.id)}>
                                    {strings["destination"] + " " + catalog.name }
                                </Link>
                                <ReactCountryFlag countryCode={catalog.code} style={{fontSize: '2em', lineHeight: '2em', marginLeft: '1em', verticalAlign: 'top', marginTop: '-10px' }}/>
                            </li>
                          );
                      })
                    }
                  </ul>
                </li>
              </ul>
          </li>
        }
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
