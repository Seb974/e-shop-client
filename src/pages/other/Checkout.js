import PropTypes from "prop-types";
import Flatpickr from 'react-flatpickr';
import { French } from "flatpickr/dist/l10n/fr.js";
import { English } from "flatpickr/dist/l10n/de.js";
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
import { getDateFrom, isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import AddressPanel from "../../components/forms/address/AddressPanel";
import ContactPanel from "../../components/forms/contact/ContactPanel";
import DatePicker from "../../components/checkout/datePicker";

const Checkout = ({ location, cartItems, currency, strings }) => {

  const { pathname } = location;
  const { country, settings } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);
  const [productCart, setProductCart] = useState([]);
  const initialInformations =  AddressPanel.getInitialInformations();
  const [informations, setInformations] = useState(initialInformations);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({name:"", email: ""});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({name:"", email: "", phone: "", address: "", address2: "", zipcode: "", city: "", position: ""});
  let cartTotalPrice = 0;

  useEffect(() => {
      const productSet = getProductsFromIds(cartItems, products);
      setProductCart(productSet);
  }, [cartItems, products]);

  useEffect(() => console.log(settings), [settings]);

  const onUserInputChange = (newUser) => setUser(newUser);
  const onInformationsChange = (newInformations) => setInformations(newInformations);
  const onUpdatePosition = (newInformations) => setInformations(informations => ({...newInformations, address2: informations.address2, phone: informations.phone}));
  const onPhoneChange = (phone) => setInformations(informations => ({...informations, phone}));

  const handleSubmit = e => {
      e.preventDefault();
      console.log(user);
      console.log(informations);
      console.log(message);
  };

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
                    <ContactPanel user={ user } phone={ informations.phone } onUserChange={ onUserInputChange } onPhoneChange={ onPhoneChange } errors={ errors }/>
                    <AddressPanel informations={ informations } onInformationsChange={ onInformationsChange } onPositionChange={ onUpdatePosition } errors={ errors }/>
                    <div className="additional-info-wrap">
                      <h3>{strings["additional_information"]}</h3>
                      <div className="additional-info">
                        <label>{strings["order_notes"]}</label>
                        <textarea
                          className="form-control"
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          value={message}
                          onChange={({currentTarget}) => setMessage(currentTarget.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <DatePicker date={ date } setDate={ setDate }/>
                  {/* <h3>{strings["delivery_date"]}</h3> */}
                  {/* <div className="row">
                      <div className="col-md-12 row-date mb-5">
                        <Flatpickr
                            name="date"
                            value={ date }
                            onChange={ onDateChange }
                            className="form-control form-control-sm"
                            options={{
                                dateFormat: "d/m/Y",
                                minDate: today.getDay() !== 0 ? today : tomorrow,
                                locale: French,
                                disable: [(date) => date.getDay() === 0],
                            }}
                        />
                      </div>
                  </div> */}
                  <h3>{strings["coupon_code"]}</h3>
                  <div className="discount-code-wrapper mb-5">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">{strings["use_coupon_code"]}</h4>
                      </div>
                      <div className="discount-code">
                        <p>{strings["enter_coupon_code"]}</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">{strings["apply_coupon"]}</button>
                        </form>
                      </div>
                    </div>
                    <h3>{strings["your_order"]}</h3>
                    <div className="discount-code-wrapper your-order-wrap">
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

Checkout.propTypes = { cartItems: PropTypes.array, currency: PropTypes.object,location: PropTypes.object};

const mapStateToProps = state => ({cartItems: state.cartData, currency: state.currencyData})

export default connect(mapStateToProps)(multilanguage(Checkout));