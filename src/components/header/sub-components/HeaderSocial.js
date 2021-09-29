import React, { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { isDefined, isDefinedAndNotVoid } from "../../../helpers/utils";

const HeaderSocial = () => {

  const { platform } = useContext(AuthContext);

  const isDefaultSocial = social => {
      const socialName = social.replaceAll(' ', '').toLowerCase();
      return ['facebook', 'dribbble', 'pinterest', 'twitter', 'linkedin'].includes(socialName);
  }

  return !isDefined(platform) || !isDefinedAndNotVoid(platform.socials) ? <></> : (
    <div className="side-social text-center">
      <ul>
          {
            platform.socials.map((social, index) => {
              return (
                <li key={ index }>
                  <a className={ isDefaultSocial(social.name) ? social.name.replaceAll(' ', '').toLowerCase() : 'dribbble' } href={ social.link } target="_blank" rel="noopener noreferrer">
                    <i className={ social.icon } />
                  </a>
                </li>
              )
            })
          }
      </ul>
    </div>
  );
};

export default HeaderSocial;
