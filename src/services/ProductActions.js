import api from '../config/api';
import { getStringDate } from '../helpers/days';

function findAll() {
    return api
        .get('/api/products?order[name]=asc')
        .then(response => response.data['hydra:member']);
}

function findPerCategory(catalog, category, page, items) {
    const request = parseInt(category) !== -1 ? `categories=api/categories/${ category }&order[name]=asc` : `order[saleCount]=desc`;
    return api.get(`/api/products?catalogs=api/catalogs/${ catalog }&${ request }&pagination=true&itemsPerPage=${ items }&page=${ page }`)
              .then(response => response.data);
}

function findTopProducts(catalog, type, limit = 4) {
    if (type === "newArrival") {
        return api
            .get(`/api/products?catalogs=api/catalogs/${ catalog }&new=true&pagination=true&itemsPerPage=${ limit }`)
            .then(response => response.data['hydra:member'].sort(() => Math.random() - 0.5));

    } else if (type === "bestSeller") {
        return api
            .get(`/api/products?catalogs=api/catalogs/${ catalog }&order[saleCount]=desc&pagination=true&itemsPerPage=${ limit }`)
            .then(response =>response.data['hydra:member'].sort(() => Math.random() - 0.5));

    } else {
        const today = new Date();
        const formattedDay = new Date(today.toUTCString());
        return api
            .get(`/api/products?catalogs=api/catalogs/${ catalog }&discount[gt]=0&offerEnd[after]=${ getStringDate(formattedDay) }&pagination=true&itemsPerPage=${ limit }`)
            .then(response =>response.data['hydra:member'].sort(() => Math.random() - 0.5));
    }
}

function findSearchedProducts(catalog, word) {
    return api
            .get(`/api/products?catalogs=api/catalogs/${ catalog }&name[]=${ word }&order[name]=asc`)
            .then(response =>response.data);
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
    return api.put('/api/products/' + id, product);
}

function create(product) {
    return api.post('/api/products', product);
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