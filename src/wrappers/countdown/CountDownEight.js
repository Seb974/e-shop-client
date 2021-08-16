import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const CountDownEight = ({ backgroundImage, dateTime, spaceTopClass, spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);

  return (
    <div
      className={`funfact-area funfact-valentine bg-img ${ spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}
      // style={{ backgroundImage: `url(${process.env.PUBLIC_URL + backgroundImage})`}}
      style={{ backgroundImage: `url(${homepage.countdowns[0].image.imgPath})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 ml-auto mr-auto">
            <div className="funfact-content text-center">
              <h2>Deal of the day</h2>
              <div className="timer">
                <Countdown date={isDefined(homepage) && isDefinedAndNotVoid(homepage.countdowns) && isDefined(homepage.countdowns[0].date) ? new Date(homepage.countdowns[0].date) : ''} renderer={Renderer} />
              </div>
              <div className="funfact-btn btn-only-round funfact-btn-red-2 btn-hover">
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  SHOP NOW
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
