import api from '../config/api';

function findAll() {
    return api
        .get('/api/order_entities')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.id > b.id) ? -1 : 1));
}

function find(id) {
    return api
        .get('/api/order_entities/' + id)
        .then(response => response.data);
}

function create(order) {
    return api.post('/api/order_entities', order)
              .then(response => response.data);
}

function update(id, owner, order) {
    return api.put( '/api/order_entities/' + id + '?id=' + owner, order);
}

function deleteOrder(order, owner) {
    return api.delete( '/api/order_entities/' + order.id + '?id=' + owner);
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteOrder
}