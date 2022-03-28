import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeaderSocial from "./sub-components/HeaderSocial";
import NavMenuPersonalized from "./NavMenuPersonalized";
import MobileLangCurrChange from "./sub-components/MobileLangCurrChange";
import PlatformContext from "../../contexts/PlatformContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const OffcanvasMenu = ({ activeState, getActiveState }) => {

  const { platform } = useContext(PlatformContext);

  return (
    <div className={`clickable-mainmenu ${activeState ? "inside" : ""}`}>
      <div className="clickable-mainmenu-icon">
        <button className="clickable-mainmenu-close" onClick={() => getActiveState(false)}>
          <span className="pe-7s-close"></span>
        </button>
      </div>
      <div className="side-logo">
        <Link to={process.env.PUBLIC_URL + "/"} style={{ display: 'flex', justifyContent: 'center' }} >
          { isDefined(platform) && isDefinedAndNotVoid(platform.logos) && isDefined(platform.logos.find(l => l.type === "LOGO_FULL_DARK")) &&
            <img 
              src={ (platform.logos.find(l => l.type === "LOGO_FULL_DARK")).image.imgPath }
              alt={ isDefined(platform) ? platform.name : "LOGO" }  
              width="200"
            />
          }
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
