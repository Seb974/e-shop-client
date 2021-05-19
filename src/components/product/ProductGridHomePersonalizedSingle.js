import PropTypes from "prop-types";
<<<<<<< HEAD
import React, { Fragment, useContext, useState } from "react";
=======
import React, { Fragment, useRef, useState } from "react";
>>>>>>> feature/custom-layout
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice, getElementsFromIds } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
<<<<<<< HEAD
import api from '../../config/api';
import { isDefined } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";
=======
import api from "../../config/api";
import * as icons from "react-bootstrap-icons";
>>>>>>> feature/custom-layout

const ProductGridHomePersonalizedSingle = ({
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
}) => {
  const { addToast } = useToasts();
  const { country, settings } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const quantityInput = useRef();

  const taxToApply = !isDefined(product) || !settings.subjectToTaxes ? 0 : product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === country).percent;
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate * (1 + taxToApply)).toFixed(2);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2);

  const handleChange = (number) => {
    if (number != undefined) {
      const quant =
        quantityInput.current.value === ""
          ? 0
          : parseFloat(quantityInput.current.value);

      setQuantity(quant + number < 0 ? 0 : quant + number);
    } else {
      setQuantity(quantityInput.current.value);
    }
  };

  const handleShowDetails = (event) => {
    event.preventDefault();
    setModalShow(true);
  };

  const handleAddToCart = (event) => {
    addToCart(product, addToast, parseFloat(quantity));
    setQuantity(0);
  };
  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <a href="#" onClick={handleShowDetails}>
              {Array.isArray(product.image) ? (
                <img
                  className="default-img"
                  src={process.env.PUBLIC_URL + product.image[0]}
                  alt=""
                />
              ) : (
                <img
                  className="default-img"
                  src={
                    api.API_DOMAIN +
                    "/uploads/pictures/" +
                    product.image.filePath
                  }
                  alt=""
                />
              )}
              {!Array.isArray(product.image) || product.image.length <= 1 ? (
                <img
                  className="hover-img"
                  src={
                    api.API_DOMAIN +
                    "/uploads/pictures/" +
                    product.image.filePath
                  }
                  alt=""
                />
              ) : (
                <img
                  className="hover-img"
                  src={process.env.PUBLIC_URL + product.image[1]}
                  alt=""
                />
              )}

              {/* <img className="default-img" src={process.env.PUBLIC_URL + product.image[0]} alt=""/>
              {product.image.length <= 1 ? "" :
                <img className="hover-img" src={process.env.PUBLIC_URL + product.image[1]} alt=""/>
              } */}
            </a>
            <div className="product-img-action input-group">
              {wishlistItem !== undefined ? (
                <a className="btn py-0 px-1" title="Produit déjà ajouté">
                  <icons.SuitHeartFill className="text-danger" size={25} />
                </a>
              ) : (
                <a
                  className="btn py-0 px-1"
                  title="Ajouter produit à la WishList"
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <icons.SuitHeart className="text-white" size={25} />
                </a>
              )}
              {compareItem !== undefined ? (
                <a
                  className="btn py-0 px-1"
                  title="Produit ajouté en comparaison"
                >
                  <icons.Shuffle className="text-orange" size={25} />
                </a>
              ) : (
                <a
                  className="btn py-0 px-1"
                  title="Ajouter le produit en comparaison"
                  onClick={() => addToCompare(product, addToast)}
                >
                  <icons.Shuffle className="text-white" size={25} />
                </a>
              )}
              {/* <button
                  className={
                    wishlistItem !== undefined ? "btn p-0 active" : "btn p-0 "
                  }
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? "Added to wishlist"
                      : "Add to wishlist"
                  }
                  onClick={() => addToWishlist(product, addToast)}
                >
                  {wishlistItem !== undefined ? (
                    <icons.SuitHeartFill className="text-danger" size={20} />
                  ) : (
                    <icons.SuitHeart className="text-danger" size={20} />
                  )}
                </button> */}
            </div>
            {!(product.discount || product.new) ? (
              ""
            ) : (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="bg-danger  py-2 rounded-pill text-center">
                    -{product.discount}%
                  </span>
                ) : (
                  ""
                )}
                {product.new ? (
                  <span className="bg-success  py-2 rounded-pill text-center">
                    new
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
            <div className="product-action">
              {product.variations && product.variations.length >= 1 ? (
                <div className="input-group  p-0 border-0 ">
                  <a
                    href="#"
                    onClick={handleShowDetails}
                    className="btn btn-dark h-100 w-100 rounded-0 py-2 px-3"
                  >
                    Selectionnez option{" "}
                  </a>
                </div>
              ) : (product.stock && product.stock.quantity > 0) ||
                (product.stockManaged && product.stockManaged === true) ? (
                <>
                  <div className="input-group  p-0 border-0 ">
                    <button
                      className="btn btn-dark  h-100 rounded-0 py-2 px-3"
                      onClick={() => handleChange(-1)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <input
                      ref={quantityInput}
                      type="number"
                      className="form-control h-100 p-2 text-center bg-white border border-white"
                      value={quantity}
                      onChange={() => handleChange()}
                      min="0"
                      step="1"
                    />
                    <span className="input-group-text h-100 border border-white rounded-0 bg-white">
                      {product.unit && product.unit}{" "}
                    </span>
                    <button
                      className="btn btn-dark h-100 rounded-0 py-2 px-3"
                      onClick={() => handleChange(1)}
                    >
                      {" "}
                      +{" "}
                    </button>
                    <button
                      className="btn btn-success pro-quickview rounded-0 w-100 h-100 p-2"
                      onClick={handleAddToCart}
                      title="Quick View"
                      disabled={quantity <= 0}
                    >
                      <icons.CartPlus
                        className="mb-1"
                        color={"white"}
                        size={20}
                      />
                    </button>
                  </div>
                </>
              ) : (
                <div className="input-group  p-0 border-0 ">
                  <button className="btn btn-dark pro-quickview rounded-0 w-100 h-100 p-2">
                    Rupture de stock
                  </button>
                </div>
              )}

              {((product.stock && product.stock.quantity > 0) ||
              (product.stockManaged && product.stockManaged === true)) && !(product.variations && product.variations.length >= 1) ? (
                <>
                  <div className="input-group bg-dark">
                    <button
                      className="btn btn-success pro-quickview rounded-0 w-100 h-100 p-2"
                      onClick={handleAddToCart}
                      title="Quick View"
                      disabled={quantity <= 0}
                    >
                      <icons.CartPlus
                        className="mb-1"
                        color={"white"}
                        size={20}
                      />{" "}
                      <span className="fs-2 text">Ajouter au panier</span>
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {/* <div className="product-action">
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
            </div>  */}
          </div>
          <div className="product-content text-center">
            <a href="#" onClick={handleShowDetails}>
              <h3>{product.name}</h3>
            </a>
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{finalDiscountedPrice + currency.currencySymbol}</span>{" "}
                  <span className="old">
                    {finalProductPrice + currency.currencySymbol}
                  </span>
                </Fragment>
              ) : (
                <span>{finalProductPrice + currency.currencySymbol} </span>
              )}
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
  wishlistItem: PropTypes.object,
};

export default ProductGridHomePersonalizedSingle;
