import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getAvailableStock, getDiscountPrice } from "../../helpers/product";
import { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } from "../../redux/actions/wishlistActions";
import { addToCart } from "../../redux/actions/cartActions";
import LayoutSeven from "../../layouts/LayoutSeven";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductsContext from "../../contexts/ProductsContext";
import { getElementsFromIds } from '../../helpers/product';
import api from "../../config/api";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";
import Imgix from "react-imgix";
import OrderActions from "../../services/OrderActions";
import MercureContext from "../../contexts/MercureContext";
import { updateOrders } from "../../data/dataProvider/eventHandlers/orderEvents";

const MyOrders = ({ location, cartItems, currency, addToCart, wishlistItems, deleteFromWishlist, deleteAllFromWishlist, strings }) => {
  
  const { addToast } = useToasts();
  const { pathname } = location;
  const { updatedOrders, setUpdatedOrders } = useContext(MercureContext);
  const { currentUser, isAuthenticated, country, settings } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);
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

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Wishlist</title>
        <meta name="description"
              content="Wishlist page of flone react minimalist eCommerce template."
        />
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
                                          </span>
                                      </td>

                                      <td className="product-wishlist-cart">
                                        { 
                                        // isDefinedAndNotVoid(wishlistItem.variations) ?
                                        //   <Link to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}>
                                        //       { strings["select_option"] }
                                        //   </Link>
                                        // : getAvailableStock(wishlistItem) > 0 ?
                                        //   <button
                                        //     onClick={() => addToCart(wishlistItem, addToast)}
                                        //     className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                                        //     disabled={cartItem !== undefined && cartItem.quantity > 0 }
                                        //     title={wishlistItem !== undefined ? strings["added_to_cart"] : strings["add_to_cart"]}
                                        //   >
                                        //     {cartItem !== undefined && cartItem.quantity > 0 ? strings["added"] : strings["add_to_cart"]}</button>
                                        // :
                                          <button disabled className="active">{ strings["out_of_stock"] }</button>
                                        }
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
  wishlistItems: PropTypes.array
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(MyOrders));