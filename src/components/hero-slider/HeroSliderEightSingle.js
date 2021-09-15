import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { isDefined } from "../../helpers/utils";

const HeroSliderEightSingle = ({ data, sliderClass }) => {
  return (

    <div
      className={`single-slider-2 slider-height-1 d-flex align-items-center slider-height-res hm-13-slider bg-img ${ sliderClass ? sliderClass : ""}`}
      style={{ backgroundImage: `url(${data.headerPicture.imgPath})`, backgroundRepeat: false, maxHeight: '750px' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="slider-content-13 slider-animated-1">
              <h5 className="animated" style={{ color: isDefined(data.headerTitleColor) ? data.headerTitleColor : "#fff"}}>
                {isDefined(data.headerTitle) ? data.headerTitle : ""}
              </h5>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{ __html: (isDefined(data.headerSubtitle) ? data.headerSubtitle : "")}}
                style={{ color: isDefined(data.headerSubtitleColor) ? data.headerSubtitleColor : "#fff"}}
              />
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={ "/shop" }
                  style={{ color: isDefined(data.headerTitleColor) ? data.headerTitleColor : "#fff", borderColor: isDefined(data.headerTitleColor) ? data.headerTitleColor : "#fff"}}
                >
                  {/* SHOP NOW */}
                  La boutique
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderEightSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default HeroSliderEightSingle;
