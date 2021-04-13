import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ProductsContext from "../../../contexts/ProductsContext";
import { getDiscountPrice } from "../../../helpers/product";
import { getProductsFromIds } from '../../../helpers/product';

const MenuCart = ({ cartData, currency, deleteFromCart, active = "" }) => {

  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const [productCart, setProductCart] = useState([]);
  const { products } = useContext(ProductsContext);

  useEffect(() => {
      const productSet = getProductsFromIds(cartData, products);
      setProductCart(productSet);
  }, [cartData, products])

  return (
    <div className={"shopping-cart-content " + active}>
      { productCart && productCart.length > 0 ?
        <Fragment>
          <ul>
            { productCart.map((single, key) => {
              const discountedPrice = getDiscountPrice(single.product.price, single.product.discount);
              const finalProductPrice = (single.product.price * currency.currencyRate).toFixed(2);
              const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

              discountedPrice != null ? 
                  cartTotalPrice += finalDiscountedPrice * single.quantity :
                  cartTotalPrice += finalProductPrice * single.quantity;

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.product.id}>
                      <img alt="" src={process.env.PUBLIC_URL + single.product.image[0]} className="img-fluid"/>
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + single.product.id}>
                        {" "}{single.product.name}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {single.quantity}</h6>
                    <span>
                      { discountedPrice !== null ? 
                          currency.currencySymbol + finalDiscountedPrice : 
                          currency.currencySymbol + finalProductPrice 
                      }
                    </span>
                    { !(single.selectedProductColor && single.selectedProductSize) ? "" :
                        <div className="cart-item-variation">
                            <span>Color: {single.selectedProductColor}</span>
                            <span>Size: {single.selectedProductSize}</span>
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
              <span className="shop-total">{currency.currencySymbol + cartTotalPrice.toFixed(2)}</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>view cart</Link>
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/checkout"}>checkout</Link>
          </div>
        </Fragment>
      :
        <p className="text-center">No items added to cart</p>
      }
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

export default MenuCart;