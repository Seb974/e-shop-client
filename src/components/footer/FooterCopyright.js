import PropTypes from "prop-types";
import React, { useContext } from "react";
import { multilanguage } from "redux-multilanguage";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass, strings }) => {

  const { platform } = useContext(AuthContext);

  return (
    <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${colorClass ? colorClass : ""}`} style={{ marginTop: -40}}>   {/* style={{marginLeft: -100, marginTop: -40}} */}
      <div className="footer-logo text-center" >
        <Link to={process.env.PUBLIC_URL + "/"}>
          { isDefined(platform) && isDefinedAndNotVoid(platform.logos) && isDefined(platform.logos.find(l => l.type === "LOGO_FULL_DARK")) &&
            <img
              src={ (platform.logos.find(l => l.type === "LOGO_FULL_DARK")).image.imgPath }
              alt={ isDefined(platform) ? platform.name : "LOGO" } 
              height="100"
              loading="lazy"
            />
          }
        </Link>
      </div>
      <p className="text-center">© { (new Date()).getFullYear() }{" "} <a href="#" rel="noopener noreferrer" target="_blank">{ isDefined(platform) ? platform.name : "" }</a>.<br />{ strings["all_rights_reserved"] }</p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default multilanguage(FooterCopyright);
