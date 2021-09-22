import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const CountDownEight = ({ backgroundImage, dateTime, spaceTopClass, spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const { selectedCatalog } = useContext(AuthContext);

  const [countdowns, setCountdowns] = useState([]);
  const [selection, setSelection] = useState(null);

  useEffect(() => getCatalogCountdowns(), []);
  useEffect(() => getCatalogCountdowns(), [homepage, selectedCatalog]);

  const getCatalogCountdowns = () => {
      if (isDefined(homepage) && isDefinedAndNotVoid(homepage.countdowns) && isDefined(selectedCatalog)) {
          const activeCountdowns = homepage.countdowns.filter(c => !isDefinedAndNotVoid(c.catalogs) || c.catalogs.find(cat => cat.id === selectedCatalog.id));
          setCountdowns(activeCountdowns);
          setSelection(activeCountdowns[0]);
      }
  };

  return !isDefined(selection) ? <></> : (
    <div
      className={`funfact-area funfact-valentine bg-img ${ spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}
      style={{ backgroundImage: `url(${selection.image.imgPath})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 ml-auto mr-auto">
            <div className="funfact-content text-center">
              <h2 style={{ 
                  color: isDefined(selection.textColor) ? selection.textColor : "#ED59A0",
                  shadow: isDefined(selection.textShadow) && selection.textShadow ? "0.1em 0.1em 0.2em black" : "none"
              }}>
                  { isDefined(selection.title) ? selection.title : "Deal of the day" }
              </h2>
              <div className="timer">
                <Countdown date={isDefined(selection.date) ? new Date(selection.date) : ''} renderer={Renderer} />
              </div>
              <div className="funfact-btn btn-only-round funfact-btn-red-2 btn-hover">
                <Link 
                    to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                    style={{ 
                      backgroundColor: isDefined(selection.textColor) ? selection.textColor : "#ED59A0",
                      shadow: isDefined(selection.textShadow) && selection.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                    }}
                >
                    { isDefined(selection.buttonText) ? selection.buttonText.toUpperCase() : "J'EN PROFITE" }
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CountDownEight.propTypes = {
  backgroundImage: PropTypes.string,
  dateTime: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CountDownEight;
