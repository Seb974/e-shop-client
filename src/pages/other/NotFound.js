import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";
import { isDefined } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";

const NotFound = ({ location, strings }) => {

  const { pathname } = location;
  const { platform } = useContext(AuthContext);

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
          <title>{ platform.name + " - Page introuvable" }</title>
          <meta property="title" content={ platform.name + " - Page introuvable" } />
          <meta property="og:title" content={ platform.name + " - Page introuvable" } />
          <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
          <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>

      <LayoutOne headerTop="visible">
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h1 style={{ color: "#F65522" }}>404</h1>
                  <h2>{ strings["opps"] }</h2>
                  <p>
                  { strings["not_found"] }
                  </p>
                  <Link to={process.env.PUBLIC_URL + "/"} className="btn btn-primary" style={{ borderColor: "#02C551" ,backgroundColor: "#02C551" }}>
                      { strings["back_to_home"] }
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

NotFound.propTypes = {
  location: PropTypes.object
};

export default multilanguage(NotFound);
