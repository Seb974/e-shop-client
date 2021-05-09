import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import { addToCart, decreaseQuantity, deleteFromCart, cartItemStock, deleteAllFromCart } from "../../redux/actions/cartActions";
import LayoutSeven from "../../layouts/LayoutSeven";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductsContext from "../../contexts/ProductsContext";
import { getProductsFromIds } from '../../helpers/product';
import ProductActions from "../../services/ProductActions";
import { isDefined } from "../../helpers/utils";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";

const Cart = ({ location, cartItems, currency, decreaseQuantity, addToCart, deleteFromCart,deleteAllFromCart, strings }) => {

  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  const { country, settings } = useContext(AuthContext);
  const { products, setProducts } = useContext(ProductsContext);
  const [productCart, setProductCart] = useState([])
  let cartTotalPrice = 0;
  let cartTotalTax = 0;

  useEffect(() => {
    let productSet = [];
    if (products.length <= 0) {
        ProductActions
            .findAll()
            .then(response => {
                setProducts(response);
                productSet = getProductsFromIds(cartItems, response);
                console.log(productSet);
                setProductCart(productSet);
            });

    } else {
        productSet = getProductsFromIds(cartItems, products);
        setProductCart(productSet);
    }
  }, [cartItems, products])

  return !isDefined(productCart) ? <></> : (
    <Fragment>
      <MetaTags>
        <title>Flone | Cart</title>
        <meta name="description"
              content="Cart page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Cart</BreadcrumbsItem> */}

      <LayoutSeven stick="stick">
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}
        <div className="cart-main-area pt-90 pb-100 mt-5">
          <div className="container">
            {/* {cartItems && cartItems.length >= 1 ? ( */}
            { isDefined(productCart) && productCart.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">{ strings["your_cart_items"] }</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>{strings["product_name"]}</th>
                            <th>{strings["unit_price"]}</th>
                            <th>{strings["qty"]}</th>
                            <th>{strings["subtotal"]}</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          { productCart.map((cartItem, key) => {
                            const taxToApply = !isDefined(cartItem.product) || !settings.subjectToTaxes ? 0 : cartItem.product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === country).percent;
                            const discountedPrice = !isDefined(cartItem.product) ? 0 : getDiscountPrice(cartItem.product.price, cartItem.product.discount);
                            const finalProductPrice = !isDefined(cartItem.product) ? 0 : (cartItem.product.price * currency.currencyRate * (1 + taxToApply)).toFixed(2);
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2);

                            // discountedPrice != null ? 
                            //     (cartTotalPrice += finalDiscountedPrice * cartItem.quantity) : 
                            //     (cartTotalPrice += finalProductPrice * cartItem.quantity);

                            cartTotalPrice += (discountedPrice != null ? finalDiscountedPrice : finalProductPrice) * cartItem.quantity;
                            cartTotalTax += (discountedPrice != null ? discountedPrice : cartItem.product.price) * cartItem.quantity * taxToApply;
                            
                            const partial = cartItem.quantity % 1 === 0 ? 1 : 0.1;
                            return !isDefined(cartItem.product) ? <></> : (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={ process.env.PUBLIC_URL + "/product/" + cartItem.product.id}>
                                      <img 
                                        className="img-fluid" 
                                        src={api.API_DOMAIN + '/uploads/pictures/' + cartItem.product.image.filePath}
                                        alt=""
                                      />
                                  </Link>
                                </td>

                                <td className="product-name">
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
                                      <span className="amount old">{finalProductPrice + " " + currency.currencySymbol}</span>
                                      <span className="amount">{finalDiscountedPrice + " " + currency.currencySymbol}</span>
                                    </Fragment>
                                  :
                                    <span className="amount">{finalProductPrice  + " " + currency.currencySymbol}</span>
                                  }
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      // onClick={ () => decreaseQuantity(cartItem, addToast) }
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
                                      // onClick={ () => addToCart( cartItem, addToast, partial) }
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
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">Estimate Shipping And Tax</h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>Enter your destination to get a shipping estimate.</p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">Get A Quote</button>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-8 col-md-6">
                    {/* <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">Use Coupon Code</h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">Apply Coupon</button>
                        </form>
                      </div>
                    </div> */}
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">{strings["cart_total"]}</h4>
                      </div>
                      <h5>{strings["total_products"]}{" "}
                        <span>{cartTotalPrice.toFixed(2) + " " + currency.currencySymbol}</span>
                      </h5>
                      { cartTotalTax > 0 && 
                        <h5>{strings["total_tax"]}{" "}
                        <span>{cartTotalTax.toFixed(2) + " " + currency.currencySymbol}</span>
                      </h5>
                      }

                      <h4 className="grand-totall-title">{strings["grand_total"]}{" "}
                        <span>{cartTotalPrice.toFixed(2) + " " + currency.currencySymbol}</span>
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
