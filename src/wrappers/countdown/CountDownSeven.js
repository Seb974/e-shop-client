import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const CountDownSeven = ({ bgColorClass, spaceTopClass, dateTime }) => {

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
    <div className={`black-friday-deal-area ${bgColorClass ? bgColorClass : ""} ${spaceTopClass ? spaceTopClass : ""}`}>
      <div className="container">
        <div className="black-friday-deal-content text-center">
          <h2 style={{ 
              color: isDefined(selection.textColor) ? selection.textColor : "#ED59A0",
              shadow: isDefined(selection.textShadow) && selection.textShadow ? "0.1em 0.1em 0.2em black" : "none"
          }}>
              { isDefined(selection.title) ? selection.title : "Black Friday Offer!"}
          </h2>
          <div className="dealy-style-2">
            <Countdown date={ isDefined(selection.date) ? new Date(selection.date) : ''} renderer={Renderer} />
          </div>
          <div className="slider-btn-12 btn-hover">
            <Link 
                to={ isDefined(selection.product) ? "/product/" + selection.product.id : "/shop"}
                style={{ 
                  backgroundColor: isDefined(selection.textColor) ? selection.textColor : "#ED59A0",
                  border: 'none',
                  shadow: isDefined(selection.textShadow) && selection.textShadow ? "0.1em 0.1em 0.2em black" : "none"
              }}
            >
                { isDefined(selection.buttonText) ? selection.buttonText.toUpperCase() : "EN VOIR PLUS"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CountDownSeven.propTypes = {
  bgColorClass: PropTypes.string,
  dateTime: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CountDownSeven;
