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

const Wishlist = ({ location, cartItems, currency, addToCart, wishlistItems, deleteFromWishlist, deleteAllFromWishlist, strings }) => {
  
  const { addToast } = useToasts();
  const { pathname } = location;
  const { country } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
      const favouriteSet = getElementsFromIds(wishlistItems, products);
      setFavourites(favouriteSet);
  }, [wishlistItems, products]);

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Wishlist</title>
        <meta name="description"
              content="Wishlist page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Wishlist</BreadcrumbsItem> */}

      <LayoutSeven stick="stick">
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}
        <div className="cart-main-area pt-90 pb-100 mt-5">
          <div className="container">
            { isDefinedAndNotVoid(favourites) ?
              <Fragment>
                <h3 className="cart-page-title">{ strings["your_wishlist_items"] }</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>{strings["product_name"]}</th>
                            <th>{strings["unit_price"]}</th>
                            <th>actions</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          { favourites.map((wishlistItem, key) => {
                            // const taxToApply = isDefined(wishlistItem) ? wishlistItem.taxes.find(tax => tax.country === country).rate : 0;
                            const taxToApply = 0;
                            const discountedPrice = isDefined(wishlistItem) ? getDiscountPrice(wishlistItem.price, wishlistItem.discount) : 0;
                            const finalProductPrice = isDefined(wishlistItem) ? (wishlistItem.price * currency.currencyRate * (1 + taxToApply)).toFixed(2) : 0;
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2);
                            const cartItem = isDefined(wishlistItem) ? cartItems.filter(item => item.id === wishlistItem.id)[0] : undefined;
                            return !isDefined(wishlistItem) ? <></> : (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={ process.env.PUBLIC_URL + "/product/" + wishlistItem.id}>
                                    <img className="img-fluid" src={api.API_DOMAIN + '/uploads/pictures/' + wishlistItem.image.filePath} alt=""/>
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link to={ process.env.PUBLIC_URL + "/product/" + wishlistItem.id }>
                                    {wishlistItem.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ?
                                    <Fragment>
                                      <span className="amount old">
                                        { finalProductPrice + " " + currency.currencySymbol}
                                      </span>
                                      <span className="amount">
                                        {finalDiscountedPrice + " " + currency.currencySymbol}
                                      </span>
                                    </Fragment>
                                  :
                                    <span className="amount">
                                      {finalProductPrice + " " + currency.currencySymbol}
                                    </span>
                                  }
                                </td>

                                <td className="product-wishlist-cart">
                                  { isDefinedAndNotVoid(wishlistItem.variations) ?
                                    <Link to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}>
                                        { strings["select_option"] }
                                    </Link>
                                  : getAvailableStock(wishlistItem) > 0 ?
                                    <button
                                      onClick={() => addToCart(wishlistItem, addToast)}
                                      className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                                      disabled={cartItem !== undefined && cartItem.quantity > 0 }
                                      title={wishlistItem !== undefined ? strings["added_to_cart"] : strings["add_to_cart"]}
                                    >
                                      {cartItem !== undefined && cartItem.quantity > 0 ? strings["added"] : strings["add_to_cart"]}</button>
                                  :
                                    <button disabled className="active">{ strings["out_of_stock"] }</button>
                                  }
                                </td>
                                <td className="product-remove">
                                  <button onClick={() => deleteFromWishlist(wishlistItem, addToast)}>
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

                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/shop"}>{ strings["continue_shopping"] }</Link>
                      </div>
                      <div className="cart-clear">
                          <button onClick={() => deleteAllFromWishlist(addToast)}>{ strings["clear_wishlist"] }</button>
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
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                        { strings["no_items_in_wishlist"] } <br />{" "}
                        <Link to={process.env.PUBLIC_URL + "/shop"}>{ strings["add_items"] }</Link>
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

Wishlist.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Wishlist));
