import PropTypes from "prop-types";
import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import api from '../../config/api';
import { isDefined } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const ProductGridHomePersonalizedSingle = ({ product, currency, addToCart, addToWishlist, addToCompare, cartItem, wishlistItem, compareItem, sliderClassName, spaceBottomClass }) => {
  
  const { addToast } = useToasts();
  const { country } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const [quantity, setQuantity] = useState("");

  const taxToApply = isDefined(product) ? product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === country).percent : 0;
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate * (1 + taxToApply)).toFixed(2);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2);

  const handleChange = ({ currentTarget }) => {
    setQuantity(currentTarget.value);
  };

  const handleShowDetails = event => {
      event.preventDefault();
      setModalShow(true);
  };

  const handleAddToCart = event => {
      addToCart(product, addToast, parseFloat(quantity));
      setQuantity("");
  };

  return (
    <Fragment>
      <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}>
        <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}>
          <div className="product-img">
            <a href="#" onClick={ handleShowDetails }>
              {Array.isArray(product.image) ? 
                <img className="default-img" src={process.env.PUBLIC_URL + product.image[0] } alt=""/>
              :
                <img className="default-img" src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} alt=""/>
              }
              { !Array.isArray(product.image) || product.image.length <= 1 ? 
                <img className="hover-img" src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} alt=""/>
              :
                <img className="hover-img" src={process.env.PUBLIC_URL + product.image[1] } alt=""/>
              }

              {/* <img className="default-img" src={process.env.PUBLIC_URL + product.image[0]} alt=""/>
              {product.image.length <= 1 ? "" :
                <img className="hover-img" src={process.env.PUBLIC_URL + product.image[1]} alt=""/>
              } */}
            </a>
            { !(product.discount || product.new) ? "" :
              <div className="product-img-badges">
                { product.discount ? <span className="pink">-{product.discount}%</span> : "" }
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            }
            <div className="product-action">
              <div className="pro-same-action pro-wishlist bg-dark active">
                <button
                  className={wishlistItem !== undefined ? "active" : ""}
                  disabled={wishlistItem !== undefined}
                  title={ wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist" }
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart bg-dark">
                { product.variations && product.variations.length >= 1 ?
                  <a href="#" onClick={ handleShowDetails }>Select Option </a>
                :
                product.stock && product.stock.quantity > 0 ?
                  <input type="number" className="pro-input" value={ quantity } onChange={ handleChange } min="0"/>
                :
                  <button disabled className="active">Out of Stock</button>
                }
              </div>
              <div className="pro-same-action pro-quickview bg-add-cart">
                <button onClick={ handleAddToCart } title="Quick View" disabled={ !(product.stock && product.stock > 0) || quantity <= 0 }>
                  <i className="fas fa-shopping-basket" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <a href="#" onClick={ handleShowDetails }><h3>{ product.name }</h3></a>
            <div className="product-price">
              {discountedPrice !== null ?
                <Fragment>
                    <span>{finalDiscountedPrice + currency.currencySymbol}</span>
                    {" "}
                    <span className="old">{finalProductPrice + currency.currencySymbol}</span>
                </Fragment>
              :
                <span>{finalProductPrice + currency.currencySymbol} </span>
              }
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridHomePersonalizedSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object
};

export default ProductGridHomePersonalizedSingle;
