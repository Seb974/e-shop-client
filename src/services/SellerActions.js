import api from '../config/api';

function findAll() {
    return api
        .get('/api/sellers?order[name]=asc')
        .then(response => response.data['hydra:member']);
}

function findSellersWithLogo() {
    return api
    .get('/api/sellers?existingImage=1&order[name]=asc')
    .then(response => response.data['hydra:member']);
}

function findActiveSellers() {
    return api
        .get('/api/sellers?isActive=true&order[name]=asc')
        .then(response => response.data['hydra:member']);
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
    findSellersWithLogo,
    findActiveSellers,
    delete: deleteSeller,
    find,
    update,
    create
}