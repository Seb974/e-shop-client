import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const CountDownSeven = ({ bgColorClass, spaceTopClass, dateTime }) => {

  const { homepage } = useContext(HomeContext);

  return (
    <div className={`black-friday-deal-area ${bgColorClass ? bgColorClass : ""} ${spaceTopClass ? spaceTopClass : ""}`}>
      <div className="container">
        <div className="black-friday-deal-content text-center">
          <h2>Black Friday Offer!</h2>
          <div className="dealy-style-2">
            <Countdown date={isDefined(homepage) && isDefinedAndNotVoid(homepage.countdowns) && isDefined(homepage.countdowns[0].date) ? new Date(homepage.countdowns[0].date) : ''} renderer={Renderer} />
          </div>
          <div className="slider-btn-12 btn-hover">
            <Link to={isDefined(homepage) && isDefinedAndNotVoid(homepage.countdowns) && isDefined(homepage.countdowns[0].product) ? "/product/" + homepage.countdowns[0].product.id : "/shop"}>
              {/* MORE OFFER */}
              EN VOIR PLUS
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
