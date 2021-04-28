import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutSeven from "../../layouts/LayoutSeven";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductsContext from "../../contexts/ProductsContext";
import { getProductsFromIds } from '../../helpers/product';
import AuthContext from "../../contexts/AuthContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";

const Checkout = ({ location, cartItems, currency, strings }) => {

  const { pathname } = location;
  const { country } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);
  const [productCart, setProductCart] = useState([]);
  let cartTotalPrice = 0;

  useEffect(() => {
      const productSet = getProductsFromIds(cartItems, products);
      setProductCart(productSet);
  }, [cartItems, products]);

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta name="description"
              content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Checkout</BreadcrumbsItem> */}
      
      <LayoutSeven stick="stick">
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}
        <div className="checkout-area pt-130 pb-100 mt-5">
          <div className="container">
            { isDefinedAndNotVoid(productCart) ?
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3 className="mb-0">{strings["shipping_details"]}</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>{strings["first_name"]}</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>{strings["email"]}</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>{strings["address"]}</label>
                          <input className="billing-address" placeholder="House number and street name" type="text"/>
                          <input placeholder="Apartment, suite, unit etc." type="text"/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>{strings["city"]}</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>{strings["zipcode"]}</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>{strings["phone"]}</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>{strings["email"]}</label>
                          <input type="text" />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>{strings["additional_information"]}</h4>
                      <div className="additional-info">
                        <label>{strings["order_notes"]}</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>{strings["your_order"]}</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>{strings["product"]}</li>
                            <li>{strings["total"]}</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            { productCart.map((cartItem, key) => {
                              const taxToApply = isDefined(cartItem) && isDefined(cartItem.product) ? cartItem.product.taxes.find(tax => tax.country === country).rate : 0;
                              const discountedPrice = isDefined(cartItem) && isDefined(cartItem.product) ? getDiscountPrice(cartItem.product.price, cartItem.product.discount) : 0;
                              const finalProductPrice = isDefined(cartItem) && isDefined(cartItem.product) ? (cartItem.product.price * currency.currencyRate * (1 + taxToApply)).toFixed(2) : 0;
                              const finalDiscountedPrice = (discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2);

                              cartTotalPrice += (discountedPrice != null ? finalDiscountedPrice : finalProductPrice) * cartItem.quantity

                              return !(isDefined(cartItem) && isDefined(cartItem.product)) ? <></> :
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.product.name} X {cartItem.quantity} {cartItem.product.unit}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null ? 
                                      (finalDiscountedPrice * cartItem.quantity).toFixed(2) + " " + currency.currencySymbol :
                                      (finalProductPrice * cartItem.quantity).toFixed(2) + " " + currency.currencySymbol}
                                  </span>
                                </li>
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">{strings["shipping"]}</li>
                            <li>{strings["free_shipping"]}</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">{strings["total"]}</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={ handleSubmit }>{strings["place_order"]}</button>
                    </div>
                  </div>
                </div>
              </div>
            :
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                        {strings["no_items_in_cart"]}<br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>{strings["shop_now"]}</Link>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </LayoutSeven>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

export default connect(mapStateToProps)(multilanguage(Checkout));
