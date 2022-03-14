import PropTypes from "prop-types";
import React, { Fragment, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getAvailableStock, getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import api from "../../config/api";
import * as icons from "react-bootstrap-icons";
import { isDefined } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";
import Imgix from "react-imgix";

const ProductGridSingle = ({product, currency, addToCart, addToWishlist, addToCompare, cartItem, wishlistItem, compareItem, sliderClassName, spaceBottomClass }) => {

  const [modalShow, setModalShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { addToast } = useToasts();
  const quantityInput = useRef();
  const { country, selectedCatalog } = useContext(AuthContext);

  const taxToApply = isDefined(product) ? product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === (isDefined(selectedCatalog) ? selectedCatalog.code : country)).percent : 0;
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate* (1 + taxToApply)).toFixed(2);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2);

  const handleShowDetails = e => {
    e.preventDefault();
    setModalShow(true);
  };

  const handleChange = (number) => {
    if (number != undefined) {
      const quant = quantityInput.current.value === "" ? 0 : parseFloat(quantityInput.current.value);
      setQuantity(quant + number < 0 ? 0 : quant + number);
    } else {
      setQuantity(quantityInput.current.value);
    }
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
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              {Array.isArray(product.image) ? 
                isDefined(product.image[0].imgPath) ?
                  <Imgix  src={ product.image[0].imgPath } className="lazyload default-img" alt={ product.image[0].filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                  />
                  :
                  <img className="default-img" src={process.env.PUBLIC_URL + product.image[0] } alt="" />
              :
                isDefined(product.image.imgPath) ?
                  <Imgix  src={ product.image.imgPath } className="lazyload default-img" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                  />
                  :
                  <img className="default-img" src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} alt="" />
              }
              { !Array.isArray(product.image) || product.image.length <= 1 ? 
                isDefined(product.image.imgPath) ?
                  <Imgix  src={ product.image.imgPath } className="lazyload hover-img" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                  />
                  :
                  <img className="hover-img" src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} alt="" />
              :
                isDefined(product.image[1].imgPath) ?
                  <Imgix  src={ product.image[1].imgPath } className="lazyload hover-img" alt={ product.image[1].filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                  />
                  :
                  <img className="hover-img" src={process.env.PUBLIC_URL + product.image[1] } alt="" />
              }
            </Link>
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
              ) : 
                  ( (getAvailableStock(product) === 0 && isDefined(product.stockManaged) && product.stockManaged === false) || getAvailableStock(product) > 0) ? (
                <>
                  <div className="input-group  p-0 border-0 ">
                    <button
                      className="btn btn-dark h-100 rounded-0 py-2 px-3"
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
              {(getAvailableStock(product) ||
                (isDefined(product.stockManaged) &&
                  product.stockManaged === false &&
                  getAvailableStock(product) === 0)) &&
                !(product.variations && product.variations.length >= 1) ? (
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
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product.name}
              </Link>
            </h3>
            {product.rating && product.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={product.rating} />
              </div>
            ) : (
              ""
            )}
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                  <span className="old">
                    {currency.currencySymbol + finalProductPrice}
                  </span>
                </Fragment>
              ) : (
                <span>{currency.currencySymbol + finalProductPrice} </span>
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

ProductGridSingle.propTypes = {
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

export default ProductGridSingle;
