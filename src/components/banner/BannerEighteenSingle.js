import PropTypes from "prop-types";
import React, { useContext } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";
import ProductsContext from "../../contexts/ProductsContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BannerEighteenSingle = ({ data, spaceBottomClass }) => {

  const { products } = useContext(ProductsContext);
  const { selectedCatalog } = useContext(AuthContext);

  const hasValidDiscount = product => {
    return isDefined(product.discount) && product.discount > 0 && isDefined(product.offerEnd) && new Date(product.offerEnd) >= new Date();
  };

  const getProductPrice = (product) => {
    if (isDefinedAndNotVoid(products)) {
      const selection = products.find(p => p.id === product.id);
      const tax = selection.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.id === selectedCatalog.id);
      const discount = hasValidDiscount(selection) ? selection.discount / 100 : 0;
      return (selection.price * (1 + tax.percent) * (1 - discount)).toFixed(2);
    }
    return 0;
  }

  return (
    <div className="col-xl-4 col-md-6">
      <div
        className={`single-banner ${spaceBottomClass ? spaceBottomClass : ""}`}
      >
        <Link to={isDefined(data) && isDefined(data.product) ? "/product/" + data.product.id : isDefined(data) && isDefined(data.category) ? "/shop?category=" + data.category.id : "/shop"}>
          {/* <img src={process.env.PUBLIC_URL + data.image} alt="" /> */}
          { isDefined(data) ?
                isDefined(data.image.imgPath) ?
                  <Imgix  src={ data.image.imgPath } className="lazyload default-img" alt={ data.image.filePath } width={ 626 } disableSrcSet={ true } disableLibraryParam={ true }
                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                  />
                  :
                  <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + data.image.filePath } alt="" />
            : <></>
          }
        </Link>
        <div className="banner-content banner-content--style2">
          <h3 style={{
              color: isDefined(data) && isDefined(data.titleColor) ? data.titleColor : "black",
              shadow: isDefined(data) && isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
          }}>
              { isDefined(data) && data.title }
          </h3>
          <h4 style={{
              color: isDefined(data) && isDefined(data.textColor) ? data.textColor : "#ED59A0",
              shadow: isDefined(data) && isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
          }}>
              { isDefined(data) && data.subtitle }
              { isDefined(selectedCatalog) && isDefined(data) && isDefined(data.product) && 
                <span className="ml-2" style={{ 
                  color: isDefined(data) && isDefined(data.titleColor) ? data.titleColor : "black",
                  shadow: isDefined(data) && isDefined(data.textShadow) && data.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                }}>
                    { getProductPrice(data.product) } €
                </span>
              }
          </h4>
          <Link to={isDefined(data) && isDefined(data.product) ? "/product/" + data.product.id : isDefined(data) && isDefined(data.category) ? "/shop?category=" + data.category.id : "/shop"}>
            <i className="fa fa-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

BannerEighteenSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default BannerEighteenSingle;
