import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Background } from 'react-imgix'
import { isDefined } from "../../helpers/utils";

const HeroSliderTwentyOneSingle = ({ data, sliderClass }) => {

  return (
    // <div
    //   className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${
    //     sliderClass ? sliderClass : ""
    //   }`}
    //   // style={{ backgroundImage: `url(${process.env.PUBLIC_URL + data.image})` }}
    //   style={{ backgroundImage: `url(${data.image.imgPath})` }}
    // >
    <Background src={ data.image.imgPath } className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${sliderClass ? sliderClass : ""}`}
      imgixParams={{ w: 1920, h: 775 }} disableLibraryParam={ true }    // disableQualityByDPR={ false }
    >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-8 col-12">
              <div className="slider-content-2 slider-content-2--white slider-animated-1">
                <h3 className="animated no-style">{data.title}</h3>
                <h1
                  className="animated"
                  dangerouslySetInnerHTML={{ __html: data.subtitle }}
                />
                <div className="slider-btn btn-hover">
                  <Link
                    className="animated rounden-btn"
                    to={isDefined(data.product) ? "/product/" + data.product.id : "/shop"}
                  >
                    {/* SHOP NOW */}
                    J'en profite !
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Background>
    // </div>
  );
};

HeroSliderTwentyOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default HeroSliderTwentyOneSingle;
