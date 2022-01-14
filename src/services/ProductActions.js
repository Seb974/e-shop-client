import api from '../config/api';
import { getStringDate } from '../helpers/days';
import { isDefined } from '../helpers/utils';

function findAll() {
    return api
        .get('/api/products')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.name > b.name) ? 1 : -1));
}

function findPerCategory(catalog, category, page, items) {
    const request = parseInt(category) !== -1 ? `categories=api/categories/${ category }` : `products[saleCount]=desc`;
    return api.get(`/api/products?catalogs=api/catalogs/${ catalog }&${ request }&pagination=true&itemsPerPage=${ items }&page=${ page }`)
              .then(response => response.data);
}

function findTopProducts(catalog, type, limit = 4) {
    if (type === "newArrival") {
        return api
            .get(`/api/products?catalogs=api/catalogs/${ catalog }&new=true&pagination=true&itemsPerPage=${ limit }`)                                                               // &pagination=true&itemsPerPage=${ limit }
            .then(response => response.data['hydra:member'].sort(() => Math.random() - 0.5));       // .filter((elt, i) => i < limit)

    } else if (type === "bestSeller") {
        return api
            .get(`/api/products?catalogs=api/catalogs/${ catalog }&products[saleCount]=desc&pagination=true&itemsPerPage=${ limit }`)
            .then(response =>response.data['hydra:member'].sort(() => Math.random() - 0.5));

    } else {
        const today = new Date();
        const formattedDay = new Date(today.toUTCString());
        return api
            .get(`/api/products?catalogs=api/catalogs/${ catalog }&discount[gt]=0&offerEnd[after]=${ getStringDate(formattedDay) }&pagination=true&itemsPerPage=${ limit }`)        // &pagination=true&itemsPerPage=${ limit }
            .then(response =>response.data['hydra:member'].sort(() => Math.random() - 0.5));
    }
}

function findSearchedProducts(catalog, word) {
    return api
            .get(`/api/products?catalogs=api/catalogs/${ catalog }&name[]=${ word }`)
            .then(response =>response.data['hydra:member'].sort(() => Math.random() - 0.5));        // .filter((elt, i) => i < limit)
}

function deleteProduct(id) {
    return api
        .delete('/api/products/' + id);
}

function find(id) {
    return api.get('/api/products/' + id)
                .then(response => response.data);
}

function update(id, product) {
    return api.put('/api/products/' + id,
                    {...product,
                        // category: `/api/categories/${ product.category }`,
                        // suppliers: suppliers.map(supplier => `/api/suppliers/${ supplier.id }`),
                        // unit: `/api/units/${ product.unit }`,
                        // userCategories: product.userCategories.map(userCategory => userCategory.value)
                    });
}

function create(product) {
    return api.post('/api/products', 
                    {...product, 
                        // category: `/api/categories/${ product.category }`, 
                        // suppliers: suppliers.map(supplier => `/api/suppliers/${ supplier.id }`),
                        // unit: `/api/units/${ product.unit }`,
                        // userCategories: product.userCategories.map(userCategory => userCategory.value),
                        // picture: null
                    });
}

function updateFromMercure(products, product) {
    const filteredProducts = products.filter(item => item.id !== product.id);
    return [...filteredProducts, product].sort((a, b) => (a.name > b.name) ? 1 : -1);

}

function deleteFromMercure(products, id) {
    return products.filter(item => parseInt(item.id) !== parseInt(id));
}

export default { 
    findAll,
    findPerCategory,
    findTopProducts,
    findSearchedProducts,
    delete: deleteProduct,
    find, 
    update, 
    create,
    updateFromMercure,
    deleteFromMercure,
}