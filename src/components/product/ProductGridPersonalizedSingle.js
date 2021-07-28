import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  getDiscountPrice,
  hasEnoughStock,
  getAvailableStock,
} from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";
import * as icons from "react-bootstrap-icons";
import Imgix from "react-imgix";

const ProductGridPersonalizedSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  strings,
}) => {
  const { addToast } = useToasts();
  const [modalShow, setModalShow] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [hasStock, setHasStock] = useState(false);
  const { country, settings } = useContext(AuthContext);

  useEffect(() => {
    const stockStatus = hasEnoughStock(product);
    setHasStock(stockStatus);
  }, [product]);

  const taxToApply = !settings.subjectToTaxes ? 0 : product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === country).percent;
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(
    product.price *
    currency.currencyRate *
    (1 + taxToApply)
  ).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice *
    currency.currencyRate *
    (1 + taxToApply)
  ).toFixed(2);

  const handleChange = ({ currentTarget }) => {
    setQuantity(currentTarget.value);
  };

  const handleShowDetails = (event) => {
    event.preventDefault();
    setModalShow(true);
  };

  const handleAddToCart = (event) => {
    addToCart(product, addToast, parseFloat(quantity));
    setQuantity("");
  };

  return (
    <Fragment>
      {/* Card */}
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <a href="#" onClick={handleShowDetails}>
              { isDefined(product.image.imgPath) ?
                  <Imgix  src={ product.image.imgPath } className="lazyload default-img" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }   //  height="500" 
                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                  />
                  :
                  <img className="default-img"
                    src={ api.API_DOMAIN + "/uploads/pictures/" + product.image.filePath } 
                    alt=""
                    height="500"
                    width="600"
                  />
              }
              { isDefined(product.image.imgPath) ?
                  <Imgix  src={ product.image.imgPath } className="lazyload hover-img" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }   //  height="500" 
                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                  />
                  :
                  <img className="hover-img"
                    src={ api.API_DOMAIN + "/uploads/pictures/" + product.image.filePath }
                    alt=""
                    height="500"
                    width="600"
                />
              }
            </a>
            {!(product.discount || product.new) ? (
              ""
            ) : (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            )}
            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? "active" : ""}
                  disabled={wishlistItem !== undefined}
                  title={ wishlistItem !== undefined ? strings["added_to_wishlist"] : strings["add_to_wishlist"]}
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                { product.variations && product.variations.length >= 1 ?
                  <a href="#" onClick={ handleShowDetails }>{strings["select_option"]}</a>
                :
                  !getAvailableStock(product) > 0 ? <button disabled className="active">{strings["out_of_stock"]}</button> :
                  <input type="number" className="pro-input" value={ quantity } onChange={ handleChange } min="0"/>
                }
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={ handleAddToCart } title={strings["add_to_cart"]} disabled={ !hasStock || quantity <= 0 }>
                  <i className="pe-7s-cart" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <a href="#" onClick={handleShowDetails}>
              <h3>{product.name}</h3>
            </a>
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>
                    {finalDiscountedPrice.toFixed(2) +
                      " " +
                      currency.currencySymbol}
                  </span>{" "}
                  <span className="old">
                    {finalProductPrice.toFixed(2) +
                      " " +
                      currency.currencySymbol}
                  </span>
                </Fragment>
              ) : (
                <span>
                  {finalProductPrice.toFixed(2) + " " + currency.currencySymbol}{" "}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <a href="#" onClick={handleShowDetails}>
                    { isDefined(product.image.imgPath) ?
                        <Imgix  src={ product.image.imgPath } className="lazyload default-img img-fluid" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }   // height="800"
                                attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                        />
                        :
                        <img className="default-img img-fluid"
                          src={ api.API_DOMAIN + "/uploads/pictures/" + product.image.filePath }
                          alt=""
                          height="800"
                          width="600"
                        />
                    }
                    { isDefined(product.image.imgPath) ?
                        <Imgix  src={ product.image.imgPath } className="lazyload hover-img img-fluid" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }  // height="800"
                                attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                        />
                        :
                        <img className="hover-img img-fluid"
                          src={ api.API_DOMAIN + "/uploads/pictures/" + product.image.filePath }
                          alt=""
                          height="800"
                          width="600"
                        />
                    }{" "}
                    :
                  </a>
                  {!(product.discount || product.new) ? (
                    ""
                  ) : (
                    <div className="product-img-badges">
                      {product.discount ? (
                        <span className="pink">-{product.discount}%</span>
                      ) : (
                        ""
                      )}
                      {product.new ? <span className="purple">New</span> : ""}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <a href="#" onClick={handleShowDetails}>
                  <h3>{product.name}</h3>
                </a>
                <div className="product-list-price">
                  {discountedPrice === null ? (
                    <span>
                      {finalProductPrice.toFixed(2) +
                        " " +
                        currency.currencySymbol}{" "}
                    </span>
                  ) : (
                    <Fragment>
                      <span>
                        {finalDiscountedPrice.toFixed(2) +
                          " " +
                          currency.currencySymbol}
                      </span>{" "}
                      <span className="old">
                        {finalProductPrice.toFixed(2) +
                          " " +
                          currency.currencySymbol}
                      </span>
                    </Fragment>
                  )}
                </div>
                {isDefined(product.shortDescription) ? (
                  <p>{product.shortDescription}</p>
                ) : isDefined(product.fullDescription) ? (
                  <p>{product.fullDescription}</p>
                ) : (
                  ""
                )}
                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    { product.variations && product.variations.length >= 1 ?
                        <a href="#" onClick={ handleShowDetails }>{strings["select_option"]}</a>
                      : 
                      getAvailableStock(product) > 0 ?
                          <div className="d-flex mr-1">
                              <input type="number" className="pro-input" value={ quantity } onChange={ handleChange } min="0"/>
                          </div>
                      :
                          <button disabled className="active">{strings["out_of_stock"]}</button>
                    }
                  </div>
                  {getAvailableStock(product) <= 0 ? (
                    ""
                  ) : (
                    <div className="shop-list-wishlist ml-10">
                      <button
                        className={
                          "qty-valid" + (quantity !== "" ? " active" : "")
                        }
                        disabled={quantity === ""}
                        title="Add to cart"
                        onClick={handleAddToCart}
                      >
                        <i className="pe-7s-cart" />
                      </button>
                    </div>
                  )}
                  <div className="shop-list-wishlist ml-10">
                    <button
                      className={wishlistItem !== undefined ? "active" : ""}
                      disabled={wishlistItem !== undefined}
                      title={
                        wishlistItem !== undefined
                          ? strings["added_to_wishlist"]
                          : strings["add_to_wishlist"]
                      }
                      onClick={() => addToWishlist(product, addToast)}
                    >
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                  <div className="shop-list-compare ml-10">
                    <button
                      className={compareItem !== undefined ? "active" : ""}
                      disabled={compareItem !== undefined}
                      title={
                        compareItem !== undefined
                          ? strings["added_to_compare"]
                          : strings["add_to_compare"]
                      }
                      onClick={() => addToCompare(product, addToast)}
                    >
                      <i className="pe-7s-shuffle" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      />
    </Fragment>
  );
};

ProductGridPersonalizedSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default multilanguage(ProductGridPersonalizedSingle);
