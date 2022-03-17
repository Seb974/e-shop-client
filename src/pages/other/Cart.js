import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import { addToCart, decreaseQuantity, deleteFromCart, cartItemStock, deleteAllFromCart } from "../../redux/actions/cartActions";
import LayoutSeven from "../../layouts/LayoutSeven";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";
import Packages from "../../components/cartPage/packages";
import { getTotalCost } from "../../helpers/containers";
import DeliveryContext from "../../contexts/DeliveryContext";
import Imgix from "react-imgix";

const Cart = ({ location, cartItems, currency, decreaseQuantity, addToCart, deleteFromCart, deleteAllFromCart, strings }) => {

  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { country, settings, selectedCatalog, platform } = useContext(AuthContext);
  const { packages } = useContext(DeliveryContext);
  const [productCart, setProductCart] = useState([]);
  const totalPackages = isDefinedAndNotVoid(packages) ? getTotalCost(packages, country) : 0;
  let cartTotalPrice = 0;
  let cartTotalTax = 0;

  useEffect(() => setProductCart(cartItems), [cartItems]);

  return !isDefined(productCart) || !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
          <title>{ platform.name + " - Panier" }</title>
          <meta property="title" content={ platform.name + " - Panier" } />
          <meta property="og:title" content={ platform.name + " - Panier" } />
          <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
          <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>

      <LayoutSeven stick="stick">
        <div className="cart-main-area pt-90 pb-100 mt-5">
          <div className="container">
            { isDefined(productCart) && productCart.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">{ strings["your_cart_items"] }</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th className="text-center">Image</th>
                            <th className="text-center">{strings["product_name"]}</th>
                            <th className="text-center">{strings["unit_price"]}</th>
                            <th className="text-center">{strings["qty"]}</th>
                            <th className="text-center">{strings["subtotal"]}</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          { productCart.map((cartItem, key) => {
                            const taxToApply = !isDefined(cartItem.product) || !settings.subjectToTaxes ? 0 : cartItem.product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === (isDefined(selectedCatalog) ? selectedCatalog.code : country)).percent;
                            const discountedPrice = !isDefined(cartItem.product) ? 0 : getDiscountPrice(cartItem.product.price, cartItem.product.discount, cartItem.product.offerEnd);
                            const finalProductPrice = !isDefined(cartItem.product) ? 0 : (cartItem.product.price * currency.currencyRate * (1 + taxToApply));   // .toFixed(2)
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate * (1 + taxToApply));    // .toFixed(2)

                            cartTotalPrice += (discountedPrice != null ? finalDiscountedPrice : finalProductPrice) * cartItem.quantity;
                            cartTotalTax += (discountedPrice != null ? discountedPrice : cartItem.product.price) * cartItem.quantity * taxToApply;
                            
                            const partial = cartItem.quantity % 1 === 0 ? 1 : 0.1;
                            return !isDefined(cartItem.product) ? <></> : (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={ process.env.PUBLIC_URL + "/product/" + cartItem.product.id}>
                                      { isDefined(cartItem.product.image.imgPath) ?
                                        <Imgix  src={ cartItem.product.image.imgPath } className="lazyload img-fluid" alt={ cartItem.product.image.filePath } width={ 600 } disableSrcSet={ true } disableLibraryParam={ true }
                                                attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                                        />
                                        :
                                        <img className="img-fluid" src={api.API_DOMAIN + '/uploads/pictures/' + cartItem.product.image.filePath} alt=""/>
                                      }
                                  </Link>
                                </td>

                                <td className="product-name text-center ">
                                  <Link to={ process.env.PUBLIC_URL + "/product/" + cartItem.product.id } >
                                      {cartItem.product.name}
                                  </Link>
                                  { !(cartItem.selectedProductColor && cartItem.selectedProductSize) ? "" :
                                    <div className="cart-item-variation">
                                        <span>{strings["variant"]} : {cartItem.selectedProductColor.color}</span>
                                        <span>{strings["declination"]} : {cartItem.selectedProductSize.name}</span>
                                    </div>
                                  }
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ?
                                    <Fragment>
                                      <span className="amount old">{finalProductPrice.toFixed(2) + " " + currency.currencySymbol}</span>
                                      <span className="amount">{finalDiscountedPrice.toFixed(2) + " " + currency.currencySymbol}</span>
                                    </Fragment>
                                  :
                                    <span className="amount">{finalProductPrice.toFixed(2) + " " + currency.currencySymbol}</span>
                                  }
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={ () => addToCart( cartItem, false, -partial) }
                                      disabled={ cartItem.quantity - partial <= 0}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={ cartItem.quantity.toFixed(2) }
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={ () => addToCart( cartItem, false, partial) }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(
                                            cartItem,
                                            (isDefined(cartItem.selectedProductColor) ? cartItem.selectedProductColor : undefined),
                                            (isDefined(cartItem.selectedProductColor) ? cartItem.selectedProductSize : undefined)
                                          )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  { isDefined(discountedPrice) ? 
                                    (finalDiscountedPrice * cartItem.quantity).toFixed(2) + " " + currency.currencySymbol : 
                                    (finalProductPrice * cartItem.quantity).toFixed(2) + " " + currency.currencySymbol
                                  }
                                </td>

                                <td className="product-remove">
                                  <button onClick={() => deleteFromCart(cartItem, addToast)}>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <Packages />
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/shop"}>{strings["continue_shopping"]}</Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>{strings["clear_shopping_cart"]}</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-8 col-md-6"></div>
                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">{strings["cart_total"]}</h4>
                      </div>
                      <h5>{strings["total_products"]}{" "}
                        <span>{cartTotalPrice.toFixed(2) + " " + currency.currencySymbol}</span>
                      </h5>
                      { isDefinedAndNotVoid(packages) &&
                        <h5>{ "Total livraison" }{" "}
                          <span>{ totalPackages.toFixed(2) + " " + currency.currencySymbol }</span>
                        </h5>
                      }
                      { cartTotalTax > 0 && 
                        <h5>{strings["total_tax"]}{" "}
                        <span>{ cartTotalTax.toFixed(2) + " " + currency.currencySymbol}</span>
                      </h5>
                      }

                      <h4 className="grand-totall-title">{strings["grand_total"]}{" "}
                        <span>{ (cartTotalPrice + totalPackages).toFixed(2) + " " + currency.currencySymbol}</span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>{strings["proceed_to_checkout"]}</Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                    {strings["no_items_in_cart"]}<br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>{strings["shop_now"]}</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutSeven>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Cart));
