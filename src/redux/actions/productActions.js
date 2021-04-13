export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

// fetch products
export const fetchProducts = products => dispatch => dispatch(fetchProductsSuccess(products));

// const getProductsFromIds = (ids, products) => {
//     let elements = [];
//     return ids.length <= 0 ? [] : ids.map(element => {
//         let i = products.find(product => product.id == element.product.id);
//         elements = i !== undefined ? [...elements, i].sort((a, b) => (a.product.id > b.product.id) ? 1 : -1) : elements;
//     });
// };

// const securedProducts = products => {
//     return products.map(product => {
//         return { id: product.id };
//     });
// };

// export default {
//     fetchProducts,
//     getProductsFromIds,
//     securedProducts
// }
