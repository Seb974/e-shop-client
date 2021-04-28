import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import HeaderSocial from "./sub-components/HeaderSocial";
import NavMenuPersonalized from "./NavMenuPersonalized";
import MobileLangCurrChange from "./sub-components/MobileLangCurrChange";

const OffcanvasMenu = ({ activeState, getActiveState }) => {
  return (
    <div className={`clickable-mainmenu ${activeState ? "inside" : ""}`}>
      <div className="clickable-mainmenu-icon">
        <button className="clickable-mainmenu-close" onClick={() => getActiveState(false)}>
          <span className="pe-7s-close"></span>
        </button>
      </div>
      <div className="side-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src={process.env.PUBLIC_URL + "/assets/img/logo/sidebar-logo.png"} width="150"/>
        </Link>
      </div>
      {/* nav menu*/}
      <NavMenuPersonalized sidebarMenu={true} />

      <br/><br/>
      {/* mobile language and currency */}
      <MobileLangCurrChange />

      {/* header social */}
      <HeaderSocial />
    </div>
  );
};

OffcanvasMenu.propTypes = {
  activeState: PropTypes.bool,
  getActiveState: PropTypes.func
};

export default OffcanvasMenu;
