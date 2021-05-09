import PropTypes from "prop-types";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";
import { getElementsFromIds } from "../../helpers/product";
import ProductsContext from "../../contexts/ProductsContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const ProductImageDescription = ({spaceTopClass, spaceBottomClass, galleryType, currency, cartItems, wishlistItems, compareItems, product}) => {    // product: storedProduct,
  
  const { addToast } = useToasts();
  const { products } = useContext(ProductsContext);
  const { country, settings } = useContext(AuthContext);
  const taxToApply = !isDefined(product) || !settings.subjectToTaxes ? 0 : product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === country).percent;
  const discountedPrice = isDefined(product) ? getDiscountPrice(product.price, product.discount) : 0;
  const finalProductPrice = isDefined(product) ? +(product.price * currency.currencyRate * (1 + taxToApply)).toFixed(2) : 0;
  const finalDiscountedPrice = isDefined(product) ? +(discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2) : 0;

  const wishlistItem = isDefined(product) && isDefinedAndNotVoid(products) && isDefinedAndNotVoid(wishlistItems) ? getElementsFromIds(wishlistItems, products).filter(wishlistItem => isDefined(wishlistItem) && wishlistItem.id === product.id)[0] : null;
  const compareItem = isDefined(product) && isDefinedAndNotVoid(products) && isDefinedAndNotVoid(compareItems) ? getElementsFromIds(compareItems, products).filter(compareItem => isDefined(compareItem) && compareItem.id === product.id)[0] : null;
  
  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed product={product} />
            ) : (
              <ProductImageGallery product={product} />
            )}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              addToast={addToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
