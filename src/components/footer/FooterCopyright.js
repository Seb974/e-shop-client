import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass, strings }) => {
  return (
    <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${colorClass ? colorClass : ""}`} style={{ marginTop: -40}}>   {/* style={{marginLeft: -100, marginTop: -40}} */}
      <div className="footer-logo text-center" >   {/* style={{ marginLeft: -20}} */}
        <Link to={process.env.PUBLIC_URL + "/"}>
            <img alt="" src={process.env.PUBLIC_URL + footerLogo} height="100"/>
        </Link>
      </div>
      <p className="text-center">© { (new Date()).getFullYear() }{" "} <a href="#" rel="noopener noreferrer" target="_blank">Frais Péi</a>.<br />{ strings["all_rights_reserved"] }</p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default multilanguage(FooterCopyright);
