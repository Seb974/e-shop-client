import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import api from '../../config/api';
import { components } from "react-select";

const ProductGridPersonalizedSingle = ({product, currency, addToCart, addToWishlist, addToCompare, cartItem, wishlistItem, compareItem, sliderClassName, spaceBottomClass}) => {
  
  const { addToast } = useToasts();
  const [modalShow, setModalShow] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [hasStock, setHasStock] = useState(false);

  useEffect(() => {
      let stockStatus = false;
      if (product.components && product.components.length > 0) {
        stockStatus = !product.components.map(component => {
          return component.size && component.size.stock.quantity > 0 ? true :
                 component.product.stock && component.product.stock.quantity > 0 ? true :
                 false;
        }).includes(false);
      } else if ( !(product.variations && product.variations.length > 0) && product.stock ) {
        stockStatus = product.stock.quantity > 0 || product.stock > 0;
      }
      setHasStock(stockStatus);

  }, [product]);

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate).toFixed(2);

  const handleChange = ({ currentTarget }) => {
    setQuantity(currentTarget.value);
  };

  const handleShowDetails = event => {
      event.preventDefault();
      setModalShow(true);
  };

  const handleAddToCart = event => {
      console.log("Add to cart");
      addToCart(product, addToast, parseFloat(quantity));
      setQuantity("");
  };

  return (
    <Fragment>
      {/* Card */}
      <div className={`col-xl-4 col-sm-6 ${ sliderClassName ? sliderClassName : "" }`}>
        <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}>
          <div className="product-img">
            <a href="#" onClick={ handleShowDetails }>
              {Array.isArray(product.image) ? 
                <img className="default-img" src={process.env.PUBLIC_URL + product.image[0] } alt="" height="500" width="600"/>
              :
                <img className="default-img" src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} alt="" height="500" width="600"/>
              }
              { !Array.isArray(product.image) || product.image.length <= 1 ? 
                <img className="hover-img" src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} alt="" height="500" width="600"/>
              :
                <img className="hover-img" src={process.env.PUBLIC_URL + product.image[1] } alt="" height="500" width="600"/>
              }

              {/* <img className="default-img" src={api.API_DOMAIN + '/uploads/pictures/' + (Array.isArray(product.image) ? product.image[0] : product.image.filePath)} alt=""/>
              { product.image.length <= 1 ? "" :
                <img className="hover-img" src={api.API_DOMAIN + '/uploads/pictures/' + (Array.isArray(product.image) ? product.image[1] : product.image.filePath)} alt=""/>
              } */}
              </a>
            { !(product.discount || product.new) ? "" :
                <div className="product-img-badges">
                  { product.discount ? <span className="pink">-{product.discount}%</span> : "" }
                  { product.new ? <span className="purple">New</span> : ""}
                </div>
            }
            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? "active" : ""}
                  disabled={wishlistItem !== undefined}
                  title={ wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist"}
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                { 
                //   product.components && product.components.length >= 1 ?
                //       product.components.map(component => {
                //         return component.size && component.size.stock.quantity > 0 ? true :
                //                component.product.stock && component.product.stock.quantity > 0 ? true :
                //                false;
                //       }).includes(false) ?
                //         <button disabled className="active">Out of Stock</button> :
                //         <input type="number" className="pro-input" value={ quantity } onChange={ handleChange } min="0"/>
                // :
                  product.variations && product.variations.length >= 1 ?
                  <a href="#" onClick={ handleShowDetails }>Select Option </a>
                : 
                  ((product.stock && (product.stock.quantity > 0 || product.stock > 0) ) || (product.components && product.components.length >= 1)) && hasStock ?
                    <input type="number" className="pro-input" value={ quantity } onChange={ handleChange } min="0"/>
                 :
                    <button disabled className="active">Out of Stock</button>
                }
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={ handleAddToCart } title="Quick View" disabled={ !hasStock || quantity <= 0 }>    {/* !(product.stock && product.stock > 0)  */}
                  <i className="pe-7s-cart" />
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

        {/* List */}
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  {/* <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>     process.env.IMAGE_URL   */}
                  <a href="#" onClick={ handleShowDetails }>
                    {Array.isArray(product.image) ? 
                      <img className="default-img img-fluid" src={process.env.PUBLIC_URL + product.image[0] } alt="" height="800" width="600"/>
                    :
                      <img className="default-img img-fluid" src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} alt="" height="800" width="600"/>
                    }
                    { !Array.isArray(product.image) || product.image.length <= 1 ? 
                      <img className="hover-img img-fluid" src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} alt="" height="800" width="600"/>
                    :
                      <img className="hover-img img-fluid" src={process.env.PUBLIC_URL + product.image[1] } alt=""/>
                    }
                  </a>
                  {/* </Link> */}
                  { !(product.discount || product.new) ? "" :
                    <div className="product-img-badges">
                      { product.discount ? <span className="pink">-{product.discount}%</span> : "" }
                      { product.new ? <span className="purple">New</span> : "" }
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <a href="#" onClick={ handleShowDetails }><h3>{ product.name }</h3></a>
                <div className="product-list-price">
                  {discountedPrice === null ? <span>{currency.currencySymbol + finalProductPrice} </span> :
                      <Fragment>
                          <span>{ currency.currencySymbol + finalDiscountedPrice }</span>
                          {" "}
                          <span className="old">{ currency.currencySymbol + finalProductPrice }</span>
                      </Fragment>
                  }
                </div>
                {product.shortDescription ? <p>{product.shortDescription}</p> : "" }
                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    { product.variation && product.variation.length >= 1 ?
                      <a href="#" onClick={ handleShowDetails }>Select Option </a>
                    :
                    product.stock && product.stock > 0 ?
                        <div className="d-flex mr-1">
                          <input type="number" className="pro-input" value={ quantity } onChange={ handleChange } min="0"/>
                        </div>
                    :
                        <button disabled className="active">Out of Stock</button>
                    }
                  </div>
                  { !(product.variation && product.variation.length >= 1) && product.stock && product.stock > 0 ?
                    <div className="shop-list-wishlist ml-10">
                        <button className={"qty-valid" + (quantity !== "" ? " active" : "")} disabled={ quantity === "" } title="Add to cart" onClick={ handleAddToCart }>
                            <i className="pe-7s-cart" />
                        </button>
                    </div>
                    : ""
                  }
                  <div className="shop-list-wishlist ml-10">
                    <button
                      className={wishlistItem !== undefined ? "active" : ""}
                      disabled={wishlistItem !== undefined}
                      title={ wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist" }
                      onClick={() => addToWishlist(product, addToast)}
                    >
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                  <div className="shop-list-compare ml-10">
                    <button
                      className={compareItem !== undefined ? "active" : ""}
                      disabled={compareItem !== undefined}
                      title={ compareItem !== undefined ? "Added to compare" : "Add to compare" }
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
        addtoast={addToast}
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
  wishlistItem: PropTypes.object
};

export default ProductGridPersonalizedSingle;
