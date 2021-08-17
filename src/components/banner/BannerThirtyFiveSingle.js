import PropTypes from "prop-types";
import React from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { isDefined } from "../../helpers/utils";

const BannerThirtyFiveSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-lg-4 col-md-4">
      <div className={`single-banner ${spaceBottomClass ? spaceBottomClass : ""}`}>
        <Link to={isDefined(data) && isDefined(data.product) ? "/product/" + data.product.id : "/shop"}>
          { isDefined(data.image.imgPath) ?
                <Imgix  src={ data.image.imgPath } className="lazyload default-img" alt={ data.image.filePath } width="370" disableSrcSet={ true } disableLibraryParam={ true }
                        attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                />
                :
                <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + data.image.filePath } alt="" />
          }
        </Link>
        <div className="banner-content-5">
          <span style={{
              fontSize: '1.7em',
              color: isDefined(data) && isDefined(data.titleColor) ? data.titleColor : "white",
              shadow: isDefined(data) && isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
          }}>
              { data.title }
          </span>
          <h3 
          className="mb-2"
          style={{ 
              color: isDefined(data) && isDefined(data.textColor) ? data.textColor : "white",
              shadow: isDefined(data) && isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none",
              fontSize: '1.5em'
          }}>
              { data.subtitle }
          </h3>
          <Link
              to={isDefined(data) && isDefined(data.product) ? "/product/" + data.product.id : "/shop"}
              style={{ 
                color: isDefined(data) && isDefined(data.titleColor) ? data.titleColor : "red",
                border: '3px solid ' + (isDefined(data) && isDefined(data.titleColor) ? data.titleColor : "red"), 
                shadow: isDefined(data) && isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
            }}
          >
            <i className="fa fa-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

BannerThirtyFiveSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default BannerThirtyFiveSingle;
