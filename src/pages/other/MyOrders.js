import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } from "../../redux/actions/wishlistActions";
import { addToCart, deleteAllFromCart, cartItemStock } from "../../redux/actions/cartActions";
import LayoutSeven from "../../layouts/LayoutSeven";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";
import Imgix from "react-imgix";
import OrderActions from "../../services/OrderActions";
import MercureContext from "../../contexts/MercureContext";
import { updateOrders } from "../../data/dataProvider/eventHandlers/orderEvents";
import Roles from "../../config/Roles";
import api from "../../config/api";

const MyOrders = ({ location, cartItems, currency, addToCart, wishlistItems, deleteFromWishlist, deleteAllFromWishlist, deleteAllFromCart, strings }) => {
  
  const { addToast } = useToasts();
  const { pathname } = location;
  const successMessage = "Le contenu de votre précédente commande a bien été ajoutée à votre panier.";
  const partialMessage = 'Le contenu de votre précédente commande a été ajouté à votre panier dans les quantités présentes en stock.'
  const { updatedOrders, setUpdatedOrders } = useContext(MercureContext);
  const { currentUser, isAuthenticated, platform } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [orderOpering, setOrderOpering] = useState(false);

  useEffect(() => {
      if (isAuthenticated) {
          OrderActions
              .findAll()
              .then(response => {
                  const newOrders = response.filter((o, i) => i < 10);
                  setOrders(newOrders);
              });
      }
  }, [isAuthenticated]);

  useEffect(() => {
      if (isDefinedAndNotVoid(updatedOrders) && !orderOpering) {
          setOrderOpering(true);
          updateOrders(orders, setOrders, currentUser, updatedOrders, setUpdatedOrders)
              .then(response => setOrderOpering(response));
      }
  }, [updatedOrders]);

  const handleResendOrder = ({ currentTarget }, items) => {
      let isComplete = true;
      items.map(item => {
          const stock = getStock(item);
          const itemInCart = !isDefinedAndNotVoid(cartItems) ? null : !isDefined(item.size) ? cartItems.find(i => i.product.id === item.product.id) :
                             cartItemStock.find(i => i.product.id === item.product.id && i.selectedProductColor.id === item.variation.id && i.selectedProductSize.id === item.size.id);
          const qtyToConsider = isDefined(itemInCart) ? itemInCart.quantity + item.orderedQty : item.orderedQty;
          const availableQty = stock.quantity <= stock.security ? 0 : stock.quantity - qtyToConsider > stock.security ? item.orderedQty : stock.quantity - qtyToConsider - stock.security;
          const isUserAllowed = !Roles.isBasicUser(currentUser) || (Roles.isBasicUser(currentUser) && availableQty > 0);
          if (item.product.available && isUserAllowed) {
              isComplete = isComplete && availableQty === item.orderedQty;
              addToCart(item.product, null, availableQty);
          }
      });
      const message = isComplete ? successMessage : partialMessage;
      addToast(message, { appearance: isComplete ? "success" : "warning", autoDismiss: true });
  };

  const getStock = item => isDefined(item.size) ? 
      (isDefinedAndNotVoid(item.size.stocks) ? item.size.stocks[0] : getDefaultStock()) : 
      (isDefinedAndNotVoid(item.product.stocks) ? item.product.stocks[0] : getDefaultStock());

  const getDefaultStock = () => ({ quantity: 0, security: 0, alert: 0 });

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
          <title>{ platform.name + " - Mes commandes" }</title>
          <meta property="title" content={ platform.name + " - Mes commandes" } />
          <meta property="og:title" content={ platform.name + " - Mes commandes" } />
          <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
          <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>

      <LayoutSeven stick="stick">
        <div className="cart-main-area pt-90 pb-100 mt-5">
          <div className="container">
            { isDefinedAndNotVoid(orders) ?
              <Fragment>
                <h3 className="cart-page-title">{ strings["my_orders"] }</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>{strings["order_number"]}</th>
                            <th>{strings["date"]}</th>
                            <th>{strings["status"]}</th>
                            <th>actions</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          { orders.map((order, key) => {
                              return !isDefined(order) ? <></> : (
                                  <tr key={key}>
                                      <td className="product-name text-center">
                                          <Link to={ process.env.PUBLIC_URL + "/delivery-note/" + order.id } target="_blank">
                                              N°{ order.id.toString().padStart(10, '0') }
                                          </Link>
                                      </td>
                                      <td className="product-price-cart">
                                          <span className="amount">
                                            { (new Date(order.deliveryDate)).toLocaleDateString('fr-FR', { timeZone: 'UTC'}) }
                                          </span>
                                      </td>
                                      <td className="product-price-cart">
                                          <span className="amount">
                                            { strings[order.status] }
                                            {order.status === "ON_TRUCK" && <><br/><Link to={ '/my-touring/' + order.id } ><small><i>Suivre en temps réel</i></small></Link></> }   {/* target="_blank" */}
                                          </span>
                                      </td>

                                      <td className="product-wishlist-cart">
                                          <button title={ strings["add_to_cart"] } disabled={ false } onClick={e => handleResendOrder(e, order.items)}>{ strings["order_again"] }</button>
                                      </td>
                                  </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update"></div>
                      <div className="cart-clear">
                          <Link to={process.env.PUBLIC_URL + "/shop"}>{ strings["continue_shopping"] }</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            :
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                    {strings["no_order"]}<br />{" "}
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

MyOrders.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
  deleteAllFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast, quantityCount) => {
      dispatch(addToWishlist(item, addToast, quantityCount));
    },
    deleteFromWishlist: (item, addToast, quantityCount) => {
      dispatch(deleteFromWishlist(item, addToast, quantityCount));
    },
    deleteAllFromWishlist: addToast => {
      dispatch(deleteAllFromWishlist(addToast));
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(MyOrders));