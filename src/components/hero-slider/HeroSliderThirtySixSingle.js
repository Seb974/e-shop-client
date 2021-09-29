import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const HeroSliderThirtySixSingle = ({ data, sliderClassName }) => {
  
  return (
    <div
      className={`single-slider-2 slider-height-2 res-white-overly-xs d-flex valentine-slider-bg align-items-center bg-img ${ sliderClassName ? sliderClassName : ""}`}
      style={{ backgroundImage: `url(${data.image.imgPath})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="slider-content-32 slider-animated-1">
              <div className="content-img">
                <img
                  className="animated"
                  src={process.env.PUBLIC_URL + "/assets/img/icon-img/coeur-valentin.png"}
                  alt=""
                />
              </div>
              <h1
                dangerouslySetInnerHTML={{ __html: data.title }}
                style={{ 
                  color: isDefined(data) ? data.titleColor : "white",
                  shadow: isDefined(data) ? "0.1em 0.1em 0.2em black" : "none"
                }}
              />
              <div className="valentine-btn btn-hover">
                <Link
                  className="animated"
                  to={isDefined(data) && isDefined(data.product) ? "/product/" + data.product.id : isDefined(data) && isDefined(data.category) ? "/shop?category=" + data.category.id : "/shop"}
                  style={{
                    border: 'none',
                    backgroundColor: isDefined(data) ? data.textColor : "#ED59A0",
                  }}
                >
                  J'en profite !
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderThirtySixSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string
};

export default HeroSliderThirtySixSingle;
