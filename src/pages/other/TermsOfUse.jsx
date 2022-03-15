import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import MetaTags from "react-meta-tags";
import LayoutSeven from "../../layouts/LayoutSeven";
import { isDefined } from "../../helpers/utils";
import parse from 'html-react-parser';
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";

const TermsOfUse = ({ location, strings }) => {

  const { platform } = useContext(AuthContext);

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
        <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
        <title>{ platform.name + " " + strings["terms_of_sales"] }</title>
        <meta property="title" content={ platform.name + " " + strings["terms_of_sales"] } />
        <meta property="og:title" content={ platform.name + " " + strings["terms_of_sales"] } />
      </MetaTags>
      <LayoutSeven stick="stick">

      <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row">
                <div className="blog-details-wrapper ml-20">
                    <div className="blog-details-top">
                        <div className="blog-details-content mb-4">
                            <div className="blog-meta-2">
                                <ul>
                                    <li>Le { (new Date()).toLocaleDateString('fr-FR', { timeZone: 'UTC'}) }</li>
                                </ul>
                            </div>
                            <h3>{ strings["terms_of_sales"] }</h3>
                            { isDefined(platform) &&
                                <>
                                    { parse(platform.terms) }
                                </>
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
          </div>
        </div>
        </LayoutSeven>
    </Fragment>
  );
};

TermsOfUse.propTypes = {
  location: PropTypes.object
};

export default multilanguage(TermsOfUse);