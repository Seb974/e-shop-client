import PropTypes from "prop-types";
import React from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import { isDefined } from "../../helpers/utils";

const BannerThirtyEightSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-sm-6 col-12 mb-30">
      <div className={`single-banner ${spaceBottomClass ? spaceBottomClass : ""}`}>
        <Link to={isDefined(data) && isDefined(data.product) ? "/product/" + data.product.id : "/shop"}>
          <Imgix  src={ data.image.imgPath } className="lazyload default-img" alt={ data.image.filePath } width="570" disableSrcSet={ true } disableLibraryParam={ true }
                  attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
          />
        </Link>
      </div>
    </div>
  );
};

BannerThirtyEightSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default BannerThirtyEightSingle;
