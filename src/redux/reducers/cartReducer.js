import { setSecuredProduct } from '../../helpers/product';
import uuid from "uuid/v4";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART
} from "../actions/cartActions";
import { isDefinedAndNotVoid } from '../../helpers/utils';

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;

  if (action.type === ADD_TO_CART) {
    // for non variant products
    if (!isDefinedAndNotVoid(product.product.variations)) {
      const cartItem = cartItems.filter(item => item.product.id == product.product.id)[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            product: setSecuredProduct(product),
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuid()
          }
        ];
      } else {
          return cartItems.map(item =>
            item.cartItemId === cartItem.cartItemId ? 
                {...item, quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1 } :
                item
          );
      }
      // for variant products
    } else {
      const cartItem = cartItems.filter(
        item =>
          item.product.id === product.product.id &&
          product.selectedProductColor &&
          product.selectedProductColor === item.selectedProductColor &&
          product.selectedProductSize &&
          product.selectedProductSize === item.selectedProductSize &&
          (product.cartItemId ? product.cartItemId === item.cartItemId : true)
      )[0];

      if (cartItem === undefined) {
        return [...cartItems, 
                { product: setSecuredProduct(product), 
                  quantity: product.quantity ? product.quantity : 1, 
                  cartItemId: uuid(),
                  selectedProductColor: product.selectedProductColor,
                  selectedProductSize: product.selectedProductSize
                }
        ];

      } else if (cartItem !== undefined && (cartItem.selectedProductColor !== product.selectedProductColor || cartItem.selectedProductSize !== product.selectedProductSize)) {
        return [...cartItems,
                { product: setSecuredProduct(product), 
                  quantity: product.quantity ? product.quantity : 1, 
                  cartItemId: uuid(),
                  selectedProductColor: product.selectedProductColor,
                  selectedProductSize: product.selectedProductSize
                }
        ];
      } else {
        return cartItems.map(item =>
          item.cartItemId === cartItem.cartItemId ? 
              {...item,
                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize
              }
            : item
        );
      }
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          cartItem => cartItem.product.cartItemId !== product.product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map(item =>
        item.product.cartItemId === product.product.cartItemId ? 
            { ...item, quantity: item.quantity - 1 } : 
            item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
        cartItems.filter(cartItem => cartItem.cartItemId !== product.cartItemId);
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter(item => {
      return false;
    });
  }

  return state;
};

export default cartReducer;
