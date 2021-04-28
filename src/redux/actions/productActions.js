export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

// fetch products
export const fetchProducts = products => dispatch => dispatch(fetchProductsSuccess(products));
