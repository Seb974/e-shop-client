import PropTypes from "prop-types";
import React from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { isDefined } from "../../helpers/utils";
import DeliveryPlaces from "../deliveryDetails/deliveryPlaces";

const BannerOneSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-lg-4 col-md-4">
      <div
        className={`single-banner ${spaceBottomClass ? spaceBottomClass : ""}`}
      >
        <Link to={process.env.PUBLIC_URL + data.link}>
          { isDefined(data.image.imgPath) ?
              <Imgix  src={ data.image.imgPath } className="lazyload default-img" alt={ data.image.filePath } width={ 370 } disableSrcSet={ true } disableLibraryParam={ true }
                            attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
              />
              :
                <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + data.image.filePath } alt="" />
          }
        </Link>
        <div className="banner-content">
          <h4>{ <br/> }</h4>
          <h3 style={{color: data.color}}>
            {data.title}
            {/* <span>{data.price}</span> */}
          </h3>
          { isDefined(data.link) && data.link.length > 0 ? 
            <Link to={ data.link } style={{ color: data.color, borderColor: data.color }}>
              <i className="fa fa-long-arrow-right" />
            </Link>
            :
            <DeliveryPlaces color={ data.color }/>
          }
        </div>
      </div>
    </div>
  );
};

BannerOneSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default BannerOneSingle;
