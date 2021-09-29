import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Imgix from "react-imgix";

const BrandLogoOneSingle = ({ data, sliderClassName, spaceBottomClass }) => {

  return (
      <div className={`single-brand-logo ${sliderClassName ? sliderClassName : ""} ${spaceBottomClass ? spaceBottomClass : ""}`} >
        {/* <img src={process.env.PUBLIC_URL + data.image} alt="" /> default-img */}
        <Imgix src={ data.image.imgPath } className="lazyload default-img" alt={ data.image.filePath } width={ 180 } disableSrcSet={ true } disableLibraryParam={ true }
            attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
            style={{width: '120px'}}
        />
      </div>
  );
};

BrandLogoOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default BrandLogoOneSingle;
