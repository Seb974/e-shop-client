import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import textGridData from "../../data/text-grid/text-grid-one.json";
import TextGridOneSingle from "../../components/text-grid/TextGridOneSingle.js";
import AboutUsActions from "../../services/AboutUsActions";
import { isDefined } from "../../helpers/utils";

const TextGridOne = ({ spaceBottomClass, data }) => {

  return (
    <div
      className={`about-mission-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          { isDefined(data) && 
                <>
                    <TextGridOneSingle
                        data={{ title: data.visionTitle, text: data.vision }}
                        spaceBottomClass="mb-30"
                    />
                    <TextGridOneSingle
                        data={{ title: data.missionTitle, text: data.mission }}
                        spaceBottomClass="mb-30"
                    />
                    <TextGridOneSingle
                        data={{ title: data.goalTitle, text: data.goal }}
                        spaceBottomClass="mb-30"
                    />
                </>
              // );
            }
            {/* )} */}
        </div>
      </div>
    </div>
  );
};

TextGridOne.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default TextGridOne;
