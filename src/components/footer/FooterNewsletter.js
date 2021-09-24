import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";
import SubscribeEmail from "./sub-components/SubscribeEmail";

const FooterNewsletter = ({ spaceBottomClass, spaceLeftClass, sideMenu, colorClass, widgetColorClass, strings }) => {

  return (
    <div className={`footer-widget ${spaceBottomClass ? spaceBottomClass : ""} ${sideMenu ? "ml-ntv5" : spaceLeftClass ? spaceLeftClass : ""} ${widgetColorClass ? widgetColorClass : ""}`}>
      <div className="footer-title">
        <h3>{strings["subscribe_button"].toUpperCase()}</h3>
      </div>
      <div className={`subscribe-style ${colorClass ? colorClass : ""}`}>
        <p>{strings["subscribe_short"]}</p>
        {/* subscribe email */}
        <SubscribeEmail />
      </div>
    </div>
  );
};

FooterNewsletter.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  colorClass: PropTypes.string,
  widgetColorClass: PropTypes.string
};

export default multilanguage(FooterNewsletter);
