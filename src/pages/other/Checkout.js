import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import LayoutSeven from "../../layouts/LayoutSeven";
import ProductsContext from "../../contexts/ProductsContext";
import { getProductsFromIds } from '../../helpers/product';
import AuthContext from "../../contexts/AuthContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import CheckoutMap from "../../components/map/checkout/Map";
import ContactPanel from "../../components/forms/contact/ContactPanel";
import DatePicker from "../../components/checkout/datePicker";
import CityActions from "../../services/CityActions";
import RelaypointActions from "../../services/RelaypointActions";
import DeliveryContext from "../../contexts/DeliveryContext";
import { getTotalCost } from '../../helpers/containers';
import { isInSelectedCountry } from "../../helpers/map";
import PaymentForm from "../../components/payment/PaymentForm";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import { useToasts } from "react-toast-notifications";
import PromotionActions from "../../services/PromotionActions";
import OrderActions from "../../services/OrderActions";
import { checkForRestrictions, getOrderToWrite, validateForm } from "../../helpers/checkout";
import api from "../../config/api";

const Checkout = ({ location, cartItems, currency, strings }) => {

  const { addToast } = useToasts();
  const { products, categories } = useContext(ProductsContext);
  const initialErrors = {name:"", email: "", phone: "", address: ""};
  const { currentUser, country, settings, selectedCatalog, platform } = useContext(AuthContext);
  const { setCities, setRelaypoints, condition, packages, relaypoints, totalWeight, availableWeight } = useContext(DeliveryContext);
  const [productCart, setProductCart] = useState([]);
  const initialInformations = { phone: '', address: '', address2: '', zipcode: '', city: '', position: isDefined(selectedCatalog) ? selectedCatalog.center : [0, 0]};
  const [informations, setInformations] = useState(initialInformations);
  const [displayedRelaypoints, setDisplayedRelaypoints] = useState([]);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({name:"", email: ""});
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [objectDiscount, setObjectDiscount] = useState(null);
  const [errors, setErrors] = useState(initialErrors);
  let cartTotalPrice = 0;

  useEffect(() => {
     setCurrentUser();
     CityActions.findAll()
                .then(response => setCities(response));
     RelaypointActions.findAll()
                      .then(response => setRelaypoints(response));
  }, []);

  useEffect(() => setActiveRelaypoints(), [relaypoints]);

  const setActiveRelaypoints = () => {
      if (isDefinedAndNotVoid(relaypoints)) {
        const actives = relaypoints.filter(relaypoint => !relaypoint.private);
        const privates = isDefinedAndNotVoid(displayedRelaypoints) ? displayedRelaypoints.filter(r => r.private) : [];
        setDisplayedRelaypoints([...actives, ...privates]);
      }
  };

  useEffect(() => setCurrentUser(), [currentUser]);

  useEffect(() => {
      const productSet = getProductsFromIds(cartItems, products);
      setProductCart(productSet);
  }, [cartItems, products]);

  const onUserInputChange = (newUser) => setUser(newUser);
  const onPhoneChange = (phone) => setInformations(informations => ({...informations, phone}));

  const handleCouponChange = ({ currentTarget }) =>{ 
      setCoupon(currentTarget.value);
      if (isDefined(objectDiscount))
          clearDiscountAndAdvantages();
  };

  const handleCouponSubmit = e => {
      e.preventDefault();
      const privateRelaypoints = relaypoints.filter(relaypoint => relaypoint.accessCode === coupon);
      if (isDefinedAndNotVoid(privateRelaypoints)) {
          setDisplayedRelaypoints([...displayedRelaypoints, ...privateRelaypoints]);
          setObjectDiscount(privateRelaypoints[0].promotion);
          addToast("Vous avez débloqué l'accès à un point relais privé. Sélectionnez le sur la carte pour profiter de ses avantages.", { appearance: "warning", autoDismiss: true, autoDismissTimeout: 10000 });
          return ;
      }
      PromotionActions.findByCode(coupon)
          .then(response => {
                if (response.length > 0) {
                  setObjectDiscount(response[0]);
                  setDiscount(response[0].percentage ? response[0].discount / 100 : response[0].discount);
                } else {
                  addToast("Le code promo saisi n'existe pas ou n'est plus valide", { appearance: "error", autoDismiss: true });
                  setCoupon("");
                }
          });
  };

  const handleSubmit = e => {
      e.preventDefault();
      const hasRestriction = checkForRestrictions(selectedCatalog, productCart, categories, addToast);
      if (!hasRestriction) {
          const newErrors = validateForm(user, informations, selectedCatalog, condition, relaypoints, addToast);
          if (isDefined(newErrors) && Object.keys(newErrors).length > 0) {
              setErrors({...initialErrors, ...newErrors});
          } else {
              if (!settings.onlinePayment) {
                createOrder()
                    .then(response => {
                        addToast(
                            "Votre commande nous est bien parvenue et nous vous en remercions !", 
                            { appearance: "success", autoDismiss: true }
                        );
                    });
              }
          }
      }
  };

  const clearDiscountAndAdvantages = () => {
    if (objectDiscount.code === "relaypoint") {
        setDisplayedRelaypoints(displayedRelaypoints.filter(relaypoint => !isDefined(relaypoint.promotion) || relaypoint.promotion.id !== objectDiscount.id));
        setInformations({...informations, address: ""});
    }
    setObjectDiscount(null);
    setDiscount(0);
  };

  const setCurrentUser = () => {
      if (currentUser.id !== -1) {
          const { name, email } = currentUser;
          setUser({ name, email });
          if (isDefined(currentUser.metas) && isDefinedAndNotVoid(currentUser.metas.position) && JSON.stringify(informations) === JSON.stringify(initialInformations)) {
              setInformations(currentUser.metas);
          }
      }
  };

  const createOrder = (callBack = null) => {
    const order = getOrderToWrite(user, informations, productCart, date, objectDiscount, message, selectedCatalog, currentUser, condition);
    return OrderActions
        .create(order)
        .then(response => {
          if (isDefined(callBack))
              callBack(response)
        })
        .catch(error => addToast(
            "Une erreur est survenue. Vérifiez l'état de votre connexion internet et que les champs sont correctement remplis.", 
            { appearance: "error", autoDismiss: true, autoDismissTimeout: 10000 }
        ));
  };

  const getConditionTax = () => {
      return !isDefined(condition) ? 0 :
          condition.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.id === selectedCatalog.id).percent;
  };

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
          <title>{ platform.name + " - Mes informations" }</title>
          <meta property="title" content={ platform.name + " - Mes informations" } />
          <meta property="og:title" content={ platform.name + " - Mes informations" } />
          <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
          <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>
      
      <LayoutSeven stick="stick">
        <div className="checkout-area pt-130 pb-100 mt-5">
          <div className="container">
            { isDefinedAndNotVoid(productCart) ?
              // <form>
                <div className="row">
                  <div className="col-lg-7">
                  <form>
                    <div className="billing-info-wrap">
                      <h3 className="mb-0">{strings["shipping_details"]}</h3>
                      <ContactPanel user={ user } phone={ informations.phone } onUserChange={ onUserInputChange } onPhoneChange={ onPhoneChange } errors={ errors }/>
                      <CheckoutMap informations={ informations } setInformations={ setInformations } errors={ errors } displayedRelaypoints={ displayedRelaypoints } setDiscount={ setDiscount } objectDiscount={ objectDiscount } setObjectDiscount={ setObjectDiscount }/>
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
                  </form>
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <DatePicker date={ date } setDate={ setDate } condition={ condition } productCart={ productCart }/>
                    <h3>{strings["coupon_code"]}</h3>
                    <div className="discount-code-wrapper mb-5">
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gray">{strings["use_coupon_code"]}</h4>
                        </div>
                        <div className="discount-code">
                          <p>{strings["enter_coupon_code"]}</p>
                          <form>
                            <input type="text" required name="coupon" value={ coupon } onChange={ handleCouponChange }/>
                            <button className="cart-btn-2" type="submit" onClick={ handleCouponSubmit } disabled={ coupon.length === 0 }>{strings["apply_coupon"]}</button>
                          </form>
                        </div>
                      </div>
                      <h3>{strings["your_order"]}</h3>
                      <div className="discount-code-wrapper your-order-wrap">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li><strong>{strings["product"]}</strong></li>
                              <li><strong>{strings["total"]}</strong></li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              { productCart.map((cartItem, key) => {
                                const taxToApply = !isDefined(cartItem) || !isDefined(cartItem.product) || !settings.subjectToTaxes ? 0 : cartItem.product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === (isDefined(selectedCatalog) ? selectedCatalog.code : country)).percent;
                                const discountedPrice = isDefined(cartItem) && isDefined(cartItem.product) ? getDiscountPrice(cartItem.product.price, cartItem.product.discount, cartItem.product.offerEnd) : 0;
                                const finalProductPrice = isDefined(cartItem) && isDefined(cartItem.product) ? Math.round(cartItem.product.price * currency.currencyRate * (1 + taxToApply) * 100) / 100 : 0;
                                const finalDiscountedPrice = Math.round(discountedPrice * currency.currencyRate * (1 + taxToApply) * 100) / 100;

                                cartTotalPrice += (discountedPrice != null ? finalDiscountedPrice : finalProductPrice) * cartItem.quantity;

                                return !(isDefined(cartItem) && isDefined(cartItem.product)) ? <div key={key}></div> :
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
                              { !isDefined(discount) || !isDefined(objectDiscount) || discount <= 0 ? <></> : 
                                  <li className="text-success">
                                      <span className="order-middle-left">
                                          <strong>
                                              { objectDiscount.percentage ? 
                                                  "Remise de " + (discount * 100) + "%" :
                                                  "Remise de " + discount + " " + currency.currencySymbol
                                              }
                                          </strong>
                                      </span>
                                      <span className="order-price">
                                          <strong>
                                               - { objectDiscount.percentage ? 
                                                    (Math.round(cartTotalPrice * discount * 100) / 100).toFixed(2) + " " + currency.currencySymbol :
                                                    discount.toFixed(2) + " " + currency.currencySymbol
                                                  }
                                          </strong>
                                      </span>
                                  </li>
                              }
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                                <li className="your-order-shipping"><strong>{strings["shipping"]}</strong></li>
                                <li>
                                  { isDefined(selectedCatalog) && selectedCatalog.needsParcel ? <strong>{strings["total"]}</strong> :
                                    !isDefined(condition) || condition.price === 0 ? strings["free_shipping"] : 
                                    condition.minForFree <= cartTotalPrice ? strings["shipping_offered"] : 
                                    (Math.round(condition.price * (1 + getConditionTax()) * 100) / 100).toFixed(2) + " " + currency.currencySymbol
                                  }
                                </li>
                            </ul>
                          </div>
                          { !isDefined(condition) && isDefined(selectedCatalog) && selectedCatalog.needsParcel ? 
                              <div className="your-order-middle"> 
                                    <ul>
                                      { packages.map((_package, key) => {
                                        const catalogPrice = _package.container.catalogPrices.find(catalogPrice => catalogPrice.catalog.code === country);
                                        return <li key={ key }>
                                                <span className="order-middle-left">{ _package.container.name + " X " + _package.quantity + " U"}</span>
                                                <span className="order-price">
                                                  { !isDefined(settings) || !isDefined(catalogPrice) || !isDefined(catalogPrice) ? "0 " + currency.currencySymbol : 
                                                    (catalogPrice.amount * _package.quantity).toFixed(2) + " " + currency.currencySymbol 
                                                  }
                                                </span>
                                              </li>
                                        })
                                      }
                                    </ul> 
                              </div> : <></>
                          }
                          <div className={isDefined(selectedCatalog) && selectedCatalog.needsParcel ? "your-order-top" : "your-order-total"}>
                            <ul>
                                <li className="order-total">{strings["total"]}</li>
                                <li>
                                    { isDefined(selectedCatalog) && selectedCatalog.needsParcel ? (Math.round(cartTotalPrice * (1 - discount) * 1000) / 1000 + getTotalCost(packages, country)).toFixed(2) + " " + currency.currencySymbol :
                                    
                                      !isDefined(condition) || condition.minForFree <= cartTotalPrice ? 
                                          !isDefined(objectDiscount) || objectDiscount.percentage ? 
                                              (Math.round(cartTotalPrice * 100) / 100 * (1 - discount)).toFixed(2) + " " + currency.currencySymbol :
                                              (Math.round(cartTotalPrice * 100) / 100 - discount).toFixed(2) + " " + currency.currencySymbol
                                      :
                                          !isDefined(objectDiscount) || objectDiscount.percentage ? 
                                              (Math.round(cartTotalPrice * 100) / 100 * (1 - discount) + (Math.round(condition.price * (1 + getConditionTax()) * 100) / 100)).toFixed(2) + " " + currency.currencySymbol :
                                              (Math.round(cartTotalPrice * 100) / 100 - discount + (Math.round(condition.price * (1 + getConditionTax()) * 100) / 100)).toFixed(2) + " " + currency.currencySymbol
                                    }
                                </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>
                      <div className="place-order mt-25">
                        { settings.onlinePayment ? 
                          <PaymentForm
                              name={ strings["place_order"] }
                              user={ user }
                              informations={ informations }
                              available={ !(!isDefinedAndNotVoid(informations.position) || !isInSelectedCountry(informations.position[0], informations.position[1], selectedCatalog)) }
                              deleteAllFromCart={ deleteAllFromCart }
                              objectDiscount={ objectDiscount }
                              createOrder={ createOrder }
                              errors={ errors }
                              initialErrors={ initialErrors }
                              setErrors={ setErrors }
                              productCart={ productCart }
                          />
                          :
                          <button onClick={ handleSubmit } className="btn-hover" disabled={ isDefinedAndNotVoid(informations.position) && !isInSelectedCountry(informations.position[0], informations.position[1], selectedCatalog) }>
                              {strings["place_order"]}
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              // {/* </form> */}
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
    location: PropTypes.object,
    deleteAllFromCart: PropTypes.func,
};

const mapStateToProps = (state, dispatch) => {
    return {
        cartItems: state.cartData, 
        currency: state.currencyData,
        deleteAllFromCart: addToast => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};

export default connect(mapStateToProps)(multilanguage(Checkout));