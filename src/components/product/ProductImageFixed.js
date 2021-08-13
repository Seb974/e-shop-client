import PropTypes from "prop-types";
import React from "react";
import Imgix from "react-imgix";
import { isDefined } from "../../helpers/utils";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      {product.discount || product.new ? (
        <div className="product-img-badges">
          {product.discount ? (
            <span className="pink">-{product.discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )}

      <div className="product-fixed-image">
        {product.image ? (
            isDefined(product.image.imgPath) ?
              <Imgix  src={ product.image.imgPath } className="lazyload img-fluid" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                      attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
              />
              :
              <img src={ process.env.PUBLIC_URL + product.image } alt="" className="img-fluid"/>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
