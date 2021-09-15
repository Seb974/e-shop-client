import PropTypes from "prop-types";
import React from "react";
import bannerData from "../../data/banner/banner-one.json";
import BannerOneSingle from "../../components/banner/BannerOneSingle.js";
import { isDefined } from "../../helpers/utils";

const BannerOne = ({ spaceTopClass, spaceBottomClass, data }) => {

  
  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          { 
          isDefined(data) &&
                <>
                  <BannerOneSingle
                      data={{link: '/shop', image: data.servicePicture, title: data.serviceTitle, subtitle: 'subtitle', color: data.serviceColor}}
                      spaceBottomClass="mb-30"
                  />

                  <BannerOneSingle
                      data={{ image: data.productPicture, title: data.productTitle, subtitle: 'subtitle', color: data.productColor}}
                      spaceBottomClass="mb-30"
                  />
                  
                  <BannerOneSingle
                      data={{link: '/articles', image: data.supportPicture, title: data.supportTitle, subtitle: 'subtitle', color: data.supportColor}}
                      spaceBottomClass="mb-30"
                  />
                </>
            }
            {/* )} */}
        </div>
      </div>
    </div>
  );
};

BannerOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerOne;
