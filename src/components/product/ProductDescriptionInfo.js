import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { hasVariationScope, getAvailableStock, getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";

const ProductDescriptionInfo = ({product, discountedPrice, currency, finalDiscountedPrice, finalProductPrice, cartItems, wishlistItem, compareItem, addToast, addToCart, addToWishlist, addToCompare, strings}) => {
  
  const [selectedProductColor, setSelectedProductColor] = useState(isDefined(product) && isDefinedAndNotVoid(product.variations) ? product.variations[0] : undefined);
  const [selectedProductSize, setSelectedProductSize] = useState(isDefined(product) && isDefinedAndNotVoid(product.variations) ? product.variations[0].sizes[0] : undefined);
  const [productStock, setProductStock] = useState(getAvailableStock(product, selectedProductColor, selectedProductSize));
  const [quantityCount, setQuantityCount] = useState(1);
  const productCartQty = !isDefined(product) ? 0 : getProductCartQuantity(cartItems, product, selectedProductColor, selectedProductSize);

  return !isDefined(product) ? <></> : (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        { !isDefined(discountedPrice) ? <span>{finalProductPrice.toFixed(2) + " " + currency.currencySymbol} </span> :
          <Fragment>
            <span>{finalDiscountedPrice.toFixed(2) + " " + currency.currencySymbol}</span>{" "}
            <span className="old">{finalProductPrice.toFixed(2) + " " + currency.currencySymbol}</span>
          </Fragment>
        }
      </div>
      {/* { !(product.rating && product.rating > 0) ? "" : 
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      } */}
      <div className="pro-details-list">
        <p>
            { isDefined(product.shortDescription) ? product.shortDescription : 
              isDefined(product.fullDescription) ? product.fullDescription : ""
            }
        </p>
      </div>

      { !(isDefined(product) && isDefinedAndNotVoid(product.variations)) ? "" :
        <div className="pro-details-size-color">
          <div className="pro-details-size mr-5">
            <span>{ hasVariationScope(product.variations) ? strings["variant"] : "" }</span>
            <div className="pro-details-size-content">
              {product.variations.map((single, key) => {

                return !isDefined(single) ? <></> : (
                  <label className={`pro-details-size-content--single ${single.color}`} key={key}>
                    <input 
                      type="radio" 
                      value={single.color} 
                      checked={single.color === selectedProductColor.color ? "checked" : ""}
                      onChange={() => {
                          setSelectedProductColor(single);
                          setSelectedProductSize(single.sizes[0]);
                          setProductStock(single.sizes[0].stock.quantity);
                          setQuantityCount(1);
                      }}
                    />
                    <span className="size-name">{ single.color }</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>{ strings["declination"] }</span>
            <div className="pro-details-size-content">
              {isDefined(product) && isDefinedAndNotVoid(product.variations) && product.variations.map(single => {
                  return single.color !== selectedProductColor.color ? "" :
                    single.sizes.map((singleSize, key) => {
                        return (
                          <label className={`pro-details-size-content--single`} key={key}>
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={singleSize.name === selectedProductSize.name ? "checked" : ""}
                              onChange={() => {
                                  setSelectedProductColor(single);
                                  setSelectedProductSize(singleSize);
                                  setProductStock(singleSize.stock.quantity);
                                  setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      });
                })}
            </div>
          </div>
        </div>
      }
      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)} className="dec qtybutton">
            -
          </button>
          <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly />
          <button onClick={() =>setQuantityCount(quantityCount < productStock - productCartQty ? quantityCount + 1 : quantityCount)} className="inc qtybutton">
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
          { getAvailableStock(product, selectedProductColor, selectedProductSize) > 0 ?
            <button onClick={() => addToCart(product, addToast, quantityCount, selectedProductColor, selectedProductSize)} disabled={productCartQty >= productStock}>
              {" "}{strings["add_to_cart"]}{" "}
            </button>
          :
            <button disabled>{strings["out_of_stock"]}</button>
          }
        </div>
        <div className="pro-details-wishlist">
          <button
            className={wishlistItem !== undefined ? "active" : ""}
            disabled={wishlistItem !== undefined}
            title={ wishlistItem !== undefined ? strings["added_to_wishlist"] : strings["add_to_wishlist"]}
            onClick={() => addToWishlist(product, addToast)}
          >
            <i className="pe-7s-like" />
          </button>
        </div>
        <div className="pro-details-compare">
          <button
            className={compareItem !== undefined ? "active" : ""}
            disabled={compareItem !== undefined}
            title={ compareItem !== undefined ? strings["added_to_compare"] : strings["add_to_compare"]}
            onClick={() => addToCompare(product, addToast)}
          >
            <i className="pe-7s-shuffle" />
          </button>
        </div>
      </div>
      { !isDefined(product.categories) ? "" :
        <div className="pro-details-meta">
          <span>{strings["categories"]} :</span>
          <ul>
            {product.categories.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>{single.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      }
      { !isDefined(product.tag) ? "" :
        <div className="pro-details-meta">
          <span>{strings["tags"]} :</span>
          <ul>
            {product.tag.map((single, key) => <li key={key}> <Link to={process.env.PUBLIC_URL + "/shop"}>{single}</Link> </li>)}
          </ul>
        </div>
      }

      <div className="pro-details-social">
        <ul>
          <li><a href="//facebook.com"><i className="fa fa-facebook" /></a></li>
          <li><a href="//dribbble.com"><i className="fa fa-dribbble" /></a></li>
          <li><a href="//pinterest.com"><i className="fa fa-pinterest-p" /></a></li>
          <li><a href="//twitter.com"><i className="fa fa-twitter" /></a></li>
          <li><a href="//linkedin.com"><i className="fa fa-linkedin" /></a></li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount, selectedProductColor, selectedProductSize) => {
      dispatch(
        addToCart(item, addToast, quantityCount, selectedProductColor,selectedProductSize)
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(null, mapDispatchToProps)(multilanguage(ProductDescriptionInfo));
