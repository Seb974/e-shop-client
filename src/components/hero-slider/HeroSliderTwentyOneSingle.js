import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Background } from 'react-imgix';
import { isDefined } from "../../helpers/utils";

const HeroSliderTwentyOneSingle = ({ data, sliderClass }) => {

  return (
    <div
      className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${ sliderClass ? sliderClass : ""}`}
      style={{ backgroundImage: `url(${data.image.imgPath})` }}
    >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-8 col-12">
              <div className="slider-content-2 slider-content-2--white slider-animated-1">
                <h3 className="animated no-style" style={{ 
                    color: isDefined(data.titleColor) ? data.titleColor : "black",
                    shadow: isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                }}>
                      {data.title}
                </h3>
                <h1
                  className="animated"
                  dangerouslySetInnerHTML={{ __html: data.subtitle }}
                  style={{ 
                    color: isDefined(data.textColor) ? data.textColor : "black",
                    shadow: isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                }}
                />
                <div className="slider-btn btn-hover">
                  <Link
                    className="animated rounded"
                    to={isDefined(data) && isDefined(data.product) ? "/product/" + data.product.id : isDefined(data) && isDefined(data.category) ? "/shop?category=" + data.category.id : "/shop"}
                    style={{ 
                        color: isDefined(data.titleColor) ? data.titleColor : "black",
                        shadow: isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
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

HeroSliderTwentyOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default HeroSliderTwentyOneSingle;
