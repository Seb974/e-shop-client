import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";
import HomeContext from "../../contexts/HomeContext";
import Imgix from "react-imgix";
import api from "../../config/api";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";
import useWindowDimensions from '../../helpers/screenDimensions';

const CountDownSix = ({spaceTopClass, spaceBottomClass, dateTime, countDownImage}) => {

  const { homepage } = useContext(HomeContext);
  const { selectedCatalog } = useContext(AuthContext);

  const [countdowns, setCountdowns] = useState([]);
  const [selection, setSelection] = useState(null);
  const { height, width } = useWindowDimensions();

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
    <div className={`funfact-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-lg-6 order-1 order-lg-2 text-center my-4">
            <div className="funfact-content funfact-res text-center">
              <h2 style={{ 
                    color: isDefined(selection) && isDefined(selection.textColor) ? selection.textColor : "#ED59A0",
                    shadow: isDefined(selection) && isDefined(selection.textShadow) && selection.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                }}
              >
                  {isDefined(selection) && isDefined(selection.title) ? selection.title : "Deal of the day"}
              </h2>
              <div className="timer">
                <Countdown date={isDefined(selection) && isDefined(selection.date) ? new Date(selection.date) : ''} renderer={Renderer} />
              </div>
              <div className="funfact-btn funfact-btn-red btn-hover">
                <Link 
                  to={isDefined(selection) && isDefined(selection.product) ? "/product/" + selection.product.id : isDefined(selection) && isDefined(selection.category) ? "/shop?category=" + selection.category.id : "/shop"}
                  style={{ 
                    backgroundColor: isDefined(selection) && isDefined(selection.textColor) ? selection.textColor : "#ED59A0",
                    shadow: isDefined(selection) && isDefined(selection.textShadow) && selection.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                  }}
                >
                  {isDefined(selection) && isDefined(selection.buttonText) ? selection.buttonText.toUpperCase() : "J'EN PROFITE"}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 order-2 order-lg-1 text-center my-4">
            <div className="funfact-image">
              <Link to={isDefined(selection) && isDefined(selection.product) ? "/product/" + selection.product.id : isDefined(selection) && isDefined(selection.category) ? "/shop?category=" + selection.category.id : "/shop"}>
                <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + selection.image.filePath } alt="" style={{ maxWidth: width >= 768 ? 549 : 345 }}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-png-2 my-4">
        <img src={process.env.PUBLIC_URL + "/assets/img/bg/shape-2.png"} alt=""/>
      </div>
    </div>
  );
};

CountDownSix.propTypes = {
  countDownImage: PropTypes.string,
  dateTime: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CountDownSix;
