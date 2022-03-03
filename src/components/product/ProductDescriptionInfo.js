import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  hasVariationScope,
  getAvailableStock,
  getProductCartQuantity,
} from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";
import {
  RiShoppingCartLine,
  RiCloseLine,
  RiEmotionUnhappyLine,
  RiHeart3Line,
  RiHeart3Fill,
  RiShuffleFill,
} from "react-icons/ri";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare,
  strings,
}) => {
  const { selectedCatalog } = useContext(AuthContext);
  const [selectedProductColor, setSelectedProductColor] = useState(
    isDefined(product) && isDefinedAndNotVoid(product.variations)
      ? product.variations[0]
      : undefined
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    isDefined(product) && isDefinedAndNotVoid(product.variations)
      ? product.variations[0].sizes[0]
      : undefined
  );
  const [productStock, setProductStock] = useState(
    getAvailableStock(product, selectedProductColor, selectedProductSize)
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const productCartQty = !isDefined(product)
    ? 0
    : getProductCartQuantity(
        cartItems,
        product,
        selectedProductColor,
        selectedProductSize
      );

  const getRestrictions = () => {
    let restrictions = [];
    product.categories.map((c) => {
      if (isDefinedAndNotVoid(c.restrictions)) {
        const activeRestrictions = c.restrictions
          .filter(
            (r) => isDefined(r.catalog) && r.catalog.id === selectedCatalog.id
          )
          .map((r) => ({ ...r, category: c.name }));
        restrictions = [...restrictions, ...activeRestrictions];
      }
    });
    return restrictions.length === 0 ? (
      <></>
    ) : (
      restrictions.map((restriction, key) => {
        return (
          <p key={key}>
            <i className="fas fa-exclamation-triangle text-danger mr-2"></i>
            {"Les livraisons sur la " +
              selectedCatalog.name +
              " de " +
              restriction.category +
              " sont limitées à " +
              restriction.quantity +
              " " +
              restriction.unit +
              "/envoi"}
          </p>
        );
      })
    );
  };

  return !isDefined(product) ? (
    <></>
  ) : (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {!isDefined(discountedPrice) ? (
          <span>
            {finalProductPrice.toFixed(2) + " " + currency.currencySymbol}{" "}
          </span>
        ) : (
          <Fragment>
            <span>
              {finalDiscountedPrice.toFixed(2) + " " + currency.currencySymbol}
            </span>{" "}
            <span className="old">
              {finalProductPrice.toFixed(2) + " " + currency.currencySymbol}
            </span>
          </Fragment>
        )}
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
          {isDefined(product.shortDescription)
            ? product.shortDescription
            : isDefined(product.fullDescription)
            ? product.fullDescription
            : ""}
        </p>
        {getRestrictions()}
        <div className="d-flex flex-row mt-3">
          <div className="pro-details-wishlist mx-1 my-auto">
            <span
              className={wishlistItem ? "text-danger" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? strings["added_to_wishlist"]
                  : strings["add_to_wishlist"]
              }
              onClick={() => addToWishlist(product, addToast)}
            >
              {wishlistItem ? (
                <RiHeart3Fill size={30} className="text-danger" />
              ) : (
                <RiHeart3Line size={30} className="text-dark" />
              )}
            </span>
          </div>
          <div className="pro-details-compare mx-1 my-auto">
            <span
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? strings["added_to_compare"]
                  : strings["add_to_compare"]
              }
              onClick={() => addToCompare(product, addToast)}
            >
              {compareItem ? (
                <RiShuffleFill size={30} className="text-warning" />
              ) : (
                <RiShuffleFill size={30} className="text-dark" />
              )}
            </span>
          </div>
        </div>
      </div>

      {!(isDefined(product) && isDefinedAndNotVoid(product.variations)) ? (
        ""
      ) : (
        <div className="pro-details-size-color">
          <div className="pro-details-size mr-5">
            <span>
              {hasVariationScope(product.variations) ? strings["variant"] : ""}
            </span>
            <div className="pro-details-size-content">
              {product.variations.map((single, key) => {
                return !isDefined(single) ||
                  single.color.length === 0 ||
                  single.color === " " ? (
                  <></>
                ) : (
                  <label
                    className={`pro-details-size-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      checked={
                        single.color === selectedProductColor.color
                          ? "checked"
                          : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single);
                        setSelectedProductSize(single.sizes[0]);
                        setProductStock(single.sizes[0].stock.quantity);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="size-name">{single.color}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>{strings["declination"]}</span>
            <div className="pro-details-size-content">
              {!isDefined(selectedProductColor) ? (
                <></>
              ) : (
                isDefined(product) &&
                isDefinedAndNotVoid(product.variations) &&
                product.variations.map((single) => {
                  return single.color !== selectedProductColor.color
                    ? ""
                    : single.sizes.map((singleSize, key) => {
                        return !isDefined(singleSize) ||
                          singleSize.name.length === 0 ||
                          singleSize.name === " " ? (
                          <></>
                        ) : (
                          <label
                            className={`pro-details-size-content--single rounded-pill`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize.name
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductColor(single);
                                setSelectedProductSize(singleSize);
                                setProductStock(singleSize.stock.quantity);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name rounded-pill">{singleSize.name}</span>
                          </label>
                        );
                      });
                })
              )}
            </div>
          </div>
        </div>
      )}
      <div className="d-inline-flex flex-column mt-4">
        <div className="input-group p-0 rounded border border-dark mb-2">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
            }
            className="btn btn-dark rounded-0 py-2 px-3"
          >
            -
          </button>
          {/* <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly /> */}
          <input
            min="0"
            max="999"
            className="form-control bg-white p-2 text-center border border-dark border-right-0"
            type="number"
            value={quantityCount}
            onChange={({ currentTarget }) => {
              const newQty = currentTarget.value;
              setQuantityCount(parseFloat(newQty));
            }}
          />
          <span className="input-group-text border border-dark  border-left-0 rounded-0 bg-light">
            {product.unit && product.unit}{" "}
          </span>
          <button
            onClick={() =>
              setQuantityCount(
                quantityCount + 1
              )
            }
            className="btn btn-dark rounded-0 py-2 px-3"
          >
            +
          </button>
        </div>
        <div className="d-inline-flex flex-row">
          {getAvailableStock(
            product,
            selectedProductColor,
            selectedProductSize
          ) <= 0 ? (
            <button className="btn btn-dark text-white">
              <RiEmotionUnhappyLine size={20} className="mr-1 text-danger" />
              {strings["out_of_stock"]}
            </button>
          ) : (
            <button
              onClick={() => {
                addToCart(
                  product,
                  addToast,
                  quantityCount,
                  selectedProductColor,
                  selectedProductSize
                );
                // onHide();
              }}
              className="btn btn-success"
              style={{
                width: "100%",
              }}
            >
              <RiShoppingCartLine size={20} className="mb-1 mr-1" />{" "}
              {strings["add_to_cart"]}{" "}
            </button>
          )}
        </div>
      </div>
      {!isDefined(product.categories) ? (
        ""
      ) : (
        <div className="pro-details-meta">
          <span>{strings["categories"]} :</span>
          <ul>
            {product.categories.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    {single.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!isDefined(product.tag) ? (
        ""
      ) : (
        <div className="pro-details-meta">
          <span>{strings["tags"]} :</span>
          <ul>
            {product.tag.map((single, key) => (
              <li key={key}>
                {" "}
                <Link to={process.env.PUBLIC_URL + "/shop"}>{single}</Link>{" "}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pro-details-social">
        <ul>
          <li className="d-inline mx-2">
            <FacebookShareButton
              url={api.CLIENT_DOMAIN + "/products/" + product.id}
              quote={"Frais Pei"}
              hashtag="#fraispei"
              className="facebook"
            >
              <FacebookIcon size={36} round={true} />
            </FacebookShareButton>
          </li>
          <li className="d-inline mx-2">
            <FacebookMessengerShareButton
              url={api.CLIENT_DOMAIN + "/products/" + product.id}
              appId="630008714635405"
              redirectUri={api.CLIENT_DOMAIN + "/products"}
              className="facebook"
            >
              <FacebookMessengerIcon size={36} round={true} />
            </FacebookMessengerShareButton>
          </li>
          <li className="d-inline mx-2">
            <TwitterShareButton
              url={api.CLIENT_DOMAIN + "/products/" + product.id}
              title={"Frais Pei"}
            >
              <TwitterIcon size={36} round={true} />
            </TwitterShareButton>
          </li>
          <li className="d-inline mx-2">
            <LinkedinShareButton
              url={api.CLIENT_DOMAIN + "/products/" + product.id}
              title={"Frais Pei"}
              summary="#fraispei"
              source={api.CLIENT_DOMAIN}
            >
              <LinkedinIcon size={36} round={true} />
            </LinkedinShareButton>
          </li>
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
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(multilanguage(ProductDescriptionInfo));
