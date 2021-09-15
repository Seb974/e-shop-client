import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { multilanguage } from "redux-multilanguage";
import { isDefined } from "../../helpers/utils";
import AboutUsActions from "../../services/AboutUsActions";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass, strings }) => {

  const [aboutUs, setAboutUs] = useState(null);

  useEffect(() => fetchAboutUs(), []);

  const fetchAboutUs = () => {
      AboutUsActions
          .find()
          .then(response => setAboutUs(response));
  };

  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>{ strings["who_we_are"] }</h5>
          <h1>{ strings["welcome"] }</h1>
          { isDefined(aboutUs) && <p>{ aboutUs.summary }</p> }
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default multilanguage(SectionTitleWithText);
