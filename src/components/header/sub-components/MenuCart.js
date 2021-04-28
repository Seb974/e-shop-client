import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ProductsContext from "../../../contexts/ProductsContext";
import { getDiscountPrice } from "../../../helpers/product";
import { isDefined, isDefinedAndNotVoid } from "../../../helpers/utils";
import { getProductsFromIds } from '../../../helpers/product';
import api from "../../../config/api";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../../contexts/AuthContext";

const MenuCart = ({ cartData, currency, deleteFromCart, active = "", strings }) => {

  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const [productCart, setProductCart] = useState([]);
  const { products } = useContext(ProductsContext);
  const { country } = useContext(AuthContext);

  useEffect(() => {
      const productSet = getProductsFromIds(cartData, products);
      setProductCart(productSet);
  }, [cartData, products])

  return (
    <div className={"shopping-cart-content " + active}>
      { isDefinedAndNotVoid(productCart) ?
        <Fragment>
          <ul>
            { productCart.map((single, key) => {
              const taxToApply = isDefined(single) && isDefined(single.product) ? single.product.taxes.find(tax => tax.country === country).rate : 0;
              const discountedPrice = isDefined(single.product) ? getDiscountPrice(single.product.price, single.product.discount) : 0;
              const finalProductPrice = isDefined(single.product) ? (single.product.price * currency.currencyRate * (1 + taxToApply)).toFixed(2) : 0;
              const finalDiscountedPrice = isDefined(single.product) ? (discountedPrice * currency.currencyRate * (1 + taxToApply)).toFixed(2) : 0;

              discountedPrice != null ? 
                  cartTotalPrice += finalDiscountedPrice * single.quantity :
                  cartTotalPrice += finalProductPrice * single.quantity;

              return !isDefined(single.product) ? <></> : (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.product.id}>
                      <img alt="" src={api.API_DOMAIN + '/uploads/pictures/' + single.product.image.filePath} className="img-fluid"/>
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + single.product.id}>
                        {" "}{single.product.name}{" "}
                      </Link>
                    </h4>
                    <h6>{strings["qty"]} : {single.quantity}</h6>
                    <span>
                      { discountedPrice !== null ? 
                          finalDiscountedPrice + " " + currency.currencySymbol : 
                          finalProductPrice + " " + currency.currencySymbol 
                      }
                    </span>
                    { !(single.selectedProductColor && single.selectedProductSize) ? "" :
                        <div className="cart-item-variation">
                            <span>Color: {single.selectedProductColor.color}</span>
                            <span>Size: {single.selectedProductSize.name}</span>
                        </div>
                    }
                  </div>
                  <div className="shopping-cart-delete">
                    {/* <button onClick={() => deleteFromCart(single, addToast)}> */}
                    <button onClick={() => deleteFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );

            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">{ cartTotalPrice.toFixed(2) + " " + currency.currencySymbol }</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>{strings["view_cart"]}</Link>
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/checkout"}>{strings["checkout"]}</Link>
          </div>
        </Fragment>
      :
        <p className="text-center">{strings["no_items_cart"]}</p>
      }
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

export default multilanguage(MenuCart);