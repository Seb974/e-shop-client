import api from '../config/api';

function create(order) {
    return api.post('/api/order_entities', order)
              .then(response => response.data);
}

function update(id, owner, order) {
    return api.put( '/api/order_entities/' + id + '?id=' + owner, order);
}

function deleteOrder(order, owner) {
    console.log('delete with new content-type');
    return api.delete( '/api/order_entities/' + order.id + '?id=' + owner);
}

export default { 
    create,
    update,
    delete: deleteOrder
}