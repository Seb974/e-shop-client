import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { deleteFromCompare } from "../../redux/actions/compareActions";
import { getAvailableStock, getDiscountPrice } from "../../helpers/product";
import LayoutSeven from "../../layouts/LayoutSeven";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Rating from "../../components/product/sub-components/ProductRating";
import ProductsContext from "../../contexts/ProductsContext";
import { getElementsFromIds } from '../../helpers/product';
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";

const Compare = ({ location, cartItems, compareItems, addToCart, deleteFromCompare, currency, strings }) => {
  
  const { pathname } = location;
  const { addToast } = useToasts();
  const { country } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
      const compareSet = getElementsFromIds(compareItems, products);
      setCompareList(compareSet);
  }, [compareItems, products]);

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Compare</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
  
      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Compare</BreadcrumbsItem> */}
  
      <LayoutSeven stick="stick">
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}
        <div className="compare-main-area pt-90 pb-100 mt-5">
          <div className="container">
            { isDefinedAndNotVoid(compareList) ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="compare-page-content">
                    <div className="compare-table table-responsive">
                      <table className="table table-bordered mb-0">
                        <tbody>
                          <tr>
                            <th className="title-column">{ strings["product_info"] }</th>
                            { compareList.map((compareItem, key) => {
                              const cartItem = isDefined(compareItem) ? cartItems.filter(item => item.id === compareItem.id)[0] : undefined;
                              return !isDefined(compareItem) ? <></> : (
                                <td className="product-image-title" key={key}>
                                  <div className="compare-remove">
                                    <button onClick={ () => deleteFromCompare(compareItem, addToast) }>
                                      <i className="pe-7s-trash" />
                                    </button>
                                  </div>
                                  <Link to={process.env.PUBLIC_URL + "/product/" + compareItem.id} className="image">
                                    <img className="img-fluid" src={api.API_DOMAIN + '/uploads/pictures/' + compareItem.image.filePath} alt=""/>
                                  </Link>
                                  <div className="product-title">
                                    <Link to={ process.env.PUBLIC_URL + "/product/" + compareItem.id }>
                                      {compareItem.name}
                                    </Link>
                                  </div>
                                  <div className="compare-btn">
                                    { isDefinedAndNotVoid(compareItem.variations) ?
                                      <Link to={`${process.env.PUBLIC_URL}/product/${compareItem.id}`}>
                                        { strings["select_option"] }
                                      </Link>
                                    : getAvailableStock(compareItem) > 0 ?
                                      <button
                                        onClick={() => addToCart(compareItem, addToast) }
                                        className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                                        disabled={cartItem !== undefined && cartItem.quantity > 0}
                                        title={compareItem !== undefined ? strings["added_to_cart"] : strings["add_to_cart"]}
                                      >
                                        {cartItem !== undefined && cartItem.quantity > 0 ? strings["added"] : strings["add_to_cart"]}
                                      </button>
                                    :
                                      <button disabled className="active">{ strings["out_of_stock"] }</button>
                                    }
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <th className="title-column">{ strings["price"] }</th>
                            {compareList.map((compareItem, key) => {
                              // const taxToApply = isDefined(compareItem) ? compareItem.taxes.find(tax => tax.country === country).rate : 0;
                              const taxToApply = isDefined(compareItem) ? compareItem.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === country).percent : 0;
                              const discountedPrice = isDefined(compareItem) ? getDiscountPrice(compareItem.price, compareItem.discount) : 0;
                              const finalProductPrice = isDefined(compareItem) ? (compareItem.price * currency.currencyRate * (1 + taxToApply)).toFixed(2) : 0;
                              const finalDiscountedPrice = (discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2);
                              return !isDefined(compareItem) ? <></> : (
                                <td className="product-price" key={key}>
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">{finalProductPrice + " " + currency.currencySymbol}</span>
                                      <span className="amount">{finalDiscountedPrice + " " + currency.currencySymbol}</span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">{finalProductPrice + " " + currency.currencySymbol}</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">{ strings["description"] }</th>
                            {compareList.map((compareItem, key) => {
                              return !isDefined(compareItem) ? <></> : (
                                <td className="product-desc" key={key}>
                                  <p>{compareItem.fullDescription ? compareItem.fullDescription : "N/A"}</p>
                                </td>
                              );
                            })}
                          </tr>

                          {/* <tr>
                            <th className="title-column">Rating</th>
                            {compareItems.map((compareItem, key) => {
                              return (
                                <td className="product-rating" key={key}>
                                  <Rating ratingValue={compareItem.rating} />
                                </td>
                              );
                            })}
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-shuffle"></i>
                    </div>
                    <div className="item-empty-area__text">
                      { strings["no_items_in_compare"] } <br />{" "}
                        <Link to={process.env.PUBLIC_URL + "/shop"}>{ strings["add_items"] }</Link>
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

Compare.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteFromCompare: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    compareItems: state.compareData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },

    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Compare));
