import { setSecuredProduct } from '../../helpers/product';
import { isDefined, isDefinedAndNotVoid } from '../../helpers/utils';

export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
export const addToCart = (item, addToast, quantityCount, selectedProductColor, selectedProductSize) => {
  return dispatch => {
    if (addToast) {
      const local_storage = JSON.parse(localStorage.getItem('redux_localstorage_simple'));
      const language = isDefined(local_storage) && isDefined(local_storage.multilanguage) ? local_storage.multilanguage.currentLanguageCode : 'en';
      const message = language === 'fn' ? "Ajouté au panier" :
                      language === 'de' ? "In den Warenkorb gelegt" : 
                      "Added To Cart";
      addToast(message, { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: Object.keys(item).includes('product') ? item.product : item,
        quantity: quantityCount,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : item.selectedProductColor
          ? item.selectedProductColor
          : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : item.selectedProductSize
          ? item.selectedProductSize
          : null
      }
    });
  };
};
//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      const local_storage = JSON.parse(localStorage.getItem('redux_localstorage_simple'));
      const language = isDefined(local_storage) && isDefined(local_storage.multilanguage) ? local_storage.multilanguage.currentLanguageCode : 'en';
      const message = language === 'fn' ? "Quantité diminuée" :
                      language === 'de' ? "Artikel aus dem Warenkorb dekrementiert" : 
                      "Item Decremented From Cart";
      addToast(message, {
        appearance: "warning",
        autoDismiss: true
      });
    }
    // dispatch({ type: DECREASE_QUANTITY, payload: item });
    dispatch({ type: DECREASE_QUANTITY, payload: setSecuredProduct(item) });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      const local_storage = JSON.parse(localStorage.getItem('redux_localstorage_simple'));
      const language = isDefined(local_storage) && isDefined(local_storage.multilanguage) ? local_storage.multilanguage.currentLanguageCode : 'en';
      const message = language === 'fn' ? "Article retiré du panier" :
                      language === 'de' ? "Aus dem Warenkorb entfernt" : 
                      "Removed From Cart";
      addToast(message, { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
    // dispatch({ type: DELETE_FROM_CART, payload: setSecuredProduct(item) });
  };
};
//delete all from cart
export const deleteAllFromCart = addToast => {
  console.log("In deleteFromCart function");
  return dispatch => {
    if (isDefined(addToast)) {
      const local_storage = JSON.parse(localStorage.getItem('redux_localstorage_simple'));
      const language = isDefined(local_storage) && isDefined(local_storage.multilanguage) ? local_storage.multilanguage.currentLanguageCode : 'en';
      const message = language === 'fn' ? "Panier vidé" :
                      language === 'de' ? "Alles aus dem Warenkorb entfernt" : 
                      "Removed All From Cart";
      addToast(message, { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (isDefinedAndNotVoid(item.product.stocks)) {
    return item.product.stocks[0].quantity;
  } else if (isDefinedAndNotVoid(item.product.variations) && isDefined(color) && isDefined(size)) {
    const variation = item.product.variations.find(single => single.id === color.id);
    const selectedSize = isDefined(variation) && isDefinedAndNotVoid(variation.sizes) ? variation.sizes.find(single => single.id === size.id) : undefined;
    return isDefined(selectedSize) && isDefinedAndNotVoid(selectedSize.stocks) ? selectedSize.stocks[0].quantity : 0;
  } else {
    return 0;
  }
};
