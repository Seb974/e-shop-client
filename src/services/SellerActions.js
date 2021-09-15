import api from '../config/api';

function findAll() {
    return api
        .get('/api/sellers')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.name > b.name) ? 1 : -1));
}

function deleteSeller(id) {
    return api.delete('/api/sellers/' + id);
}

function find(id) {
    return api
        .get('/api/sellers/' + id)
        .then(response => response.data);
}

function update(id, seller) {
    return api.put('/api/sellers/' + id, {...seller});
}

function create(seller) {
    return api.post('/api/sellers', {...seller});
}

export default {
    findAll,
    delete: deleteSeller,
    find,
    update,
    create
}