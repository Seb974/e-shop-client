import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";
import HomeContext from "../../contexts/HomeContext";
import Imgix from "react-imgix";
import api from "../../config/api";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const CountDownSix = ({spaceTopClass, spaceBottomClass, dateTime, countDownImage}) => {

  const { homepage } = useContext(HomeContext);

  return (
    <div className={`funfact-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 col-lg-6 order-1 order-lg-2">
            <div className="funfact-content funfact-res text-center">
              <h2>Deal of the day</h2>
              <div className="timer">
                <Countdown date={isDefined(homepage) && isDefinedAndNotVoid(homepage.countdowns) && isDefined(homepage.countdowns[0].date) ? new Date(homepage.countdowns[0].date) : ''} renderer={Renderer} />
              </div>
              <div className="funfact-btn funfact-btn-red btn-hover">
                <Link to={isDefined(homepage) && isDefinedAndNotVoid(homepage.countdowns) && isDefined(homepage.countdowns[0].product) ? "/product/" + homepage.countdowns[0].product.id : "/shop"}>
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-6 order-2 order-lg-1">
            <div className="funfact-image">
              <Link to={isDefined(homepage) && isDefinedAndNotVoid(homepage.countdowns) && isDefined(homepage.countdowns[0].product) ? "/product/" + homepage.countdowns[0].product.id : "/shop"}>
                  {/* <img src={process.env.PUBLIC_URL + countDownImage} alt="" className="img-fluid"/> */}
                  { isDefined(homepage) && isDefinedAndNotVoid(homepage.countdowns) && isDefined(homepage.countdowns[0].image) && isDefined(homepage.countdowns[0].image.imgPath) ?
                    <Imgix  src={ homepage.countdowns[0].image.imgPath } className="lazyload default-img" alt={ homepage.countdowns[0].image.filePath } width="549" disableSrcSet={ true } disableLibraryParam={ true }
                            attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                    />
                    :
                    <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + homepage.countdowns[0].image.filePath } alt="" />
                }
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-png-2">
        <img
          src={process.env.PUBLIC_URL + "/assets/img/bg/shape-2.png"}
          alt=""
        />
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
