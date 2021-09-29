import React, { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { isDefined } from "../../../helpers/utils";

const MobileWidgets = () => {

  const { platform } = useContext(AuthContext);

  return !isDefined(platform) ? <></> : (
    <div className="offcanvas-widget-area">
      <div className="off-canvas-contact-widget">
        <div className="header-contact-info">
          <ul className="header-contact-info__list">
            <li>
              <i className="fa fa-phone"></i>{" "}
              <a href={`tel://${ isDefined(platform.metas) && isDefined(platform.metas.phone) ? platform.metas.phone.replaceAll(' ', '') : "" }`}>
                { isDefined(platform.metas) && isDefined(platform.metas.phone) ? platform.metas.phone : "" }
              </a>
            </li>
            <li>
              <i className="fa fa-envelope"></i>{" "}
              <a href={`mailto:${ isDefined(platform.email) ? platform.email : "" }`}>
                { isDefined(platform.email) ? platform.email : "" }
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/*Off Canvas Widget Social Start*/}
      <div className="off-canvas-widget-social">
          {
            platform.socials.map((social, index) => {
              return (
                  <a key={ index } title={ social.name } href={ social.link } target="_blank" rel="noopener noreferrer">
                    <i className={ social.icon } />
                  </a>
              )
            })
          }
      </div>
      {/*Off Canvas Widget Social End*/}
    </div>
  );
};

export default MobileWidgets;
