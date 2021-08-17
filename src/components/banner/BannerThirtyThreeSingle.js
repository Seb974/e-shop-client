import PropTypes from "prop-types";
import React from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { isDefined } from "../../helpers/utils";

const BannerThirtyThreeSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-lg-6 col-md-6">
      <div className={`single-banner-2 ${spaceBottomClass ? spaceBottomClass : ""}`}>
        <Link to={isDefined(data) && isDefined(data.product) ? "/product/" + data.product.id : "/shop"}>
          { isDefined(data.image.imgPath) ?
                <Imgix  src={ data.image.imgPath } className="lazyload default-img" alt={ data.image.filePath } width="570" disableSrcSet={ true } disableLibraryParam={ true }
                        attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                />
                :
                <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + data.image.filePath } alt="" />
          }
        </Link>
        <div className="banner-content-2 banner-content-2-black">
          <h3 style={{ 
              color: isDefined(data) && isDefined(data.titleColor) ? data.titleColor : "white",
              shadow: isDefined(data) && isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
          }}>
              { data.title }
          </h3>
          <h4 style={{ 
              color: isDefined(data) && isDefined(data.textColor) ? data.textColor : "white",
              shadow: isDefined(data) && isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none",
              fontSize: '1.7em'
          }}>
            { data.subtitle } 
            {/* <span>{ data.price }</span> */}
          </h4>
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

BannerThirtyThreeSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default BannerThirtyThreeSingle;
