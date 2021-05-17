import api from '../config/api';

function create(order) {
    return api.post('/api/order_entities', order);
}

function update(id, order) {
    return api.put('/api/order_entities/' + id,order);
}

export default { 
    create,
    update, 
}